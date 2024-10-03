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

        const itemExists = campaignData.items.some(
          (item: { name: string; measure: string }) =>
            item.name === item_name && item.measure === measure,
        )

        if (!itemExists) {
          throw new ClientError(
            'Item não existe na campanha ou medida não corresponde',
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

        await db
          .collection('campaigns')
          .doc(campaign_id)
          .update({
            donations: FieldValue.arrayUnion(donationData),
            // progress: FieldValue.increment(quantity),
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
