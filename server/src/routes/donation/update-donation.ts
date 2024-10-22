/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'
import { donationStatus } from './create-donation'

const donationSchema = z.object({
  status: donationStatus,
})

const ParamsSchema = z.object({
  donation_id: z.string(),
})

export async function updateDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/donations/:donation_id',
    {
      schema: {
        params: fromZodSchema(ParamsSchema),
        body: fromZodSchema(donationSchema),
      },
    },
    async (request, reply) => {
      const { donation_id } = request.params as z.infer<typeof ParamsSchema>
      const { status } = request.body as z.infer<typeof donationSchema>

      try {
        const donationRef = db.collection('donations').doc(donation_id)
        const donationDoc = await donationRef.get()

        if (!donationDoc.exists) {
          throw new ClientError('Doação não encontrada')
        }

        const donationData = donationDoc.data()
        if (!donationData) {
          throw new ClientError('Dados da doação não encontrados')
        }

        const item_name = donationData.item_name
        const campaign_id = donationData.campaign_id

        await donationRef.update({ status })

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

        const updatedDonations = campaignData.donations.map(
          (donation: { id_donation: string; status: string }) => {
            if (donation.id_donation === donation_id) {
              return { ...donation, status }
            }
            return donation
          },
        )

        await db.collection('campaigns').doc(campaign_id).update({
          donations: updatedDonations,
        })

        const pendingDonations = updatedDonations.filter(
          (donation: { item_name: string; status: string }) =>
            donation.item_name === item_name && donation.status === 'pendente',
        )

        if (pendingDonations.length === 0) {
          const updatedItems = campaignData.items.map(
            (item: { name: string; status: string }) => {
              return item.name === item_name
                ? { ...item, status: 'concluida' }
                : item
            },
          )

          await db.collection('campaigns').doc(campaign_id).update({
            items: updatedItems,
          })

          const allItemsCompleted = updatedItems.every(
            (item: { status: string }) => item.status === 'concluida',
          )

          if (allItemsCompleted) {
            await db.collection('campaigns').doc(campaign_id).update({
              status: 'fechada',
            })
          }

          // Calcular porcentagem de progresso com base nos itens concluídos
          const totalItems = updatedItems.length
          const completedItems = updatedItems.filter(
            (item: { status: string }) => item.status === 'concluida',
          ).length
          const progressPercentage = (completedItems / totalItems) * 100

          await db.collection('campaigns').doc(campaign_id).update({
            progress: progressPercentage,
          })
        }

        return reply.send({ donation_id })
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao atualizar doação'))
      }
    },
  )
}
