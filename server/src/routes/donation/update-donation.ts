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

      try {
        const donationRef = db.collection('donations').doc(donation_id)
        const donationDoc = await donationRef.get()

        if (!donationDoc.exists) {
          return reply.status(404).send(new ClientError('Doação não encontrada'))
        }

        const donationData = donationDoc.data()
        if (!donationData) {
          return reply.status(404).send(new ClientError('Dados da doação não encontrados'))
        }

        const item_name = donationData.item_name
        const section_id = donationData.section_id
        const campaign_id = donationData.campaign_id

        const status = 'confirmada'
        await donationRef.update({ status })

        const campaignRef = await db
          .collection('campaigns')
          .doc(campaign_id)
          .get()

        if (!campaignRef.exists) {
          return reply.status(404).send(new ClientError('Campanha não encontrada'))
        }

        const campaignData = campaignRef.data()

        if (!campaignData) {
          return reply.status(404).send(new ClientError('Dados da campanha não encontrados'))
        }

        const section = campaignData.sections.find((section: { id: string }) => section.id === section_id)

        if (!section) {
          return reply.status(404).send(new ClientError('Seção não encontrada'))
        }

        const updatedDonations = section.donations.map((donation: { id_donation: string; status: string }) => {
          if (donation.id_donation === donation_id) {
            return { ...donation, status }
          }
          return donation
        })

        section.donations = updatedDonations

        await db.collection('campaigns').doc(campaign_id).update({
          sections: campaignData.sections,
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

          const totalItems = updatedItems.length
          const completedItems = updatedItems.filter(
            (item: { status: string }) => item.status === 'concluida',
          ).length
          const progressPercentage = (completedItems / totalItems) * 100

          await db.collection('campaigns').doc(campaign_id).update({
            progress: progressPercentage,
          })
        }

        return reply.status(200).send()
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao atualizar doação'))
      }
    },
  )
}