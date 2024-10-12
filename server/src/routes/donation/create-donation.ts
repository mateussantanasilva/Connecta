/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'

export const donationStatus = z.enum(['pendente', 'confirmada'])

export const donationSchema = z.object({
  item_name: z.string().min(1),
  quantity: z.number().min(1),
  measure: z.string().min(1),
  campaign_id: z.string().min(1),
  user_id: z.string().min(1),
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
      const { item_name, quantity, measure, campaign_id, user_id } =
        request.body as z.infer<typeof donationSchema>

      try {
        const campaignRef = await db
          .collection('campaigns')
          .doc(campaign_id)
          .get()

        if (!campaignRef.exists) {
          throw new ClientError('Campanha não encontrada')
        }

        const campaignData = campaignRef.data()

        if (!campaignData) {
          throw new ClientError('Dados da campanha não encontrados')
        }

        const itemExists = campaignData.items.find(
          (item: { name: string; measure: string; status: string }) =>
            item.name === item_name &&
            item.measure === measure &&
            item.status === 'disponível',
        )
        // Separar validações depois
        if (!itemExists) {
          throw new ClientError(
            'Item não encontrado, medida não corresponde ou item não disponível',
          )
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
          user_id,
          campaign_id,
          status: 'pendente',
          measure,
          donation_date: new Date().toISOString(),
        }

        const donationRef = await db.collection('donations').add(donationData)

        console.log(
          `Item: ${item_name} - Quantidade: ${quantity} - Restante: ${remainingGoal}`,
        )

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
                      ? campaignData.donations.some(
                          (donation: {
                            item_name: string
                            measure: string
                            status: string
                          }) =>
                            donation.item_name === item_name &&
                            donation.measure === measure &&
                            donation.status === 'pendente',
                        )
                        ? 'reservada'
                        : 'concluida'
                      : item.status,
                }
              : item,
        )

        await db
          .collection('campaigns')
          .doc(campaign_id)
          .update({
            items: updatedItems,
            donations: FieldValue.arrayUnion(donationData),
          })

        return reply.status(201).send({ donationId: donationRef.id })
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
