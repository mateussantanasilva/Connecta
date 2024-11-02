/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.SESSION_SECRET!

export const donationStatus = z.enum(['pendente', 'confirmada', 'cancelada'])

export const donationSchema = z.object({
  item_name: z.string().min(1),
  quantity: z.number().min(1),
  measure: z.string().min(1),
  campaign_id: z.string().min(1),
})

export async function createDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/donations',
    {
      schema: {
        body: fromZodSchema(donationSchema),
      },
    },
    async (request, reply) => {
      const { item_name, quantity, measure, campaign_id } =
        request.body as z.infer<typeof donationSchema>
      const user = request.cookies.user
      const userDecoded = jwt.verify(user, JWT_SECRET) as { userId: string }
      const userSnapshot = await db.collection('users').doc(userDecoded.userId).get()
      const userData = userSnapshot.data()
      try {
        const campaignRef = await db
          .collection('campaigns')
          .doc(campaign_id)
          .get()

        if (!campaignRef.exists) {
          throw new ClientError('Campanha não encontrada')
        }
        
        if (userData?.role != 'doador') {
          return reply.status(403).send({ error: 'Ação não autorizada para este usuário' });
        }

        const campaignData = campaignRef.data()

        if (!campaignData) {
          throw new ClientError('Dados da campanha não encontrados')
        }

        const itemExists = campaignData.items.find(
          (item: { name: string; measure: string }) =>
            item.name === item_name && item.measure === measure,
        )

        const itemStatus = campaignData.items.find(
          (item: { status: string }) => item.status === 'disponível',
        )

        if (!itemExists) {
          throw new ClientError(
            'Item não encontrado ou medida não corresponde.',
          )
        }

        if (!itemStatus) {
          throw new ClientError('Item não disponível para doação.')
        }

        const currentAmountDonated = itemExists.amount_donated || 0
        const updatedAmountDonated = currentAmountDonated + quantity
        const remainingGoal = itemExists.goal - updatedAmountDonated

        if (remainingGoal < 0) {
          throw new ClientError(
            `A doação excede o objetivo para o item ${item_name}`,
          )
        }

        const donationData = {
          item_name,
          quantity,
          campaign_id,
          status: 'pendente',
          measure,
          donation_date: new Date().toISOString(),
        }

        const donationRef = await db.collection('donations').add(donationData)
        const donationId = donationRef.id

        const updatedDonationData = {
          ...donationData,
          id_donation: donationId,
        }

        const updatedItems = campaignData.items.map(
          (item: {
            name: string
            measure: string
            amount_donated?: number
            goal: number
            status?: string
          }) =>
            item.name === item_name && item.measure === measure
              ? {
                  ...item,
                  amount_donated: updatedAmountDonated,
                  status:
                    updatedAmountDonated === item.goal
                      ? 'concluida'
                      : item.status,
                }
              : item,
        )

        await db
          .collection('campaigns')
          .doc(campaign_id)
          .update({
            items: updatedItems,
            donations: FieldValue.arrayUnion(updatedDonationData),
          })

        return reply.status(201).send({ donationId })
      } catch (error) {
        if (error instanceof ClientError) {
          return reply.status(400).send({ error: error.message })
        }
        console.error(error)
        return reply.status(500).send({ error: 'Erro no servidor' })
      }
    },
  )
}
