/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FieldValue } from 'firebase-admin/firestore'

const ParamsSchema = z.object({
  donation_id: z.string(),
})

export async function deleteDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/admin/donations/:donation_id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            donation_id: { type: 'string' },
          },
          required: ['donation_id'],
        },
      },
    },

    async (request, reply) => {
      const { donation_id } = request.params as z.infer<typeof ParamsSchema>

      try {
        const donation_ref = db.collection('donations').doc(donation_id)
        const donation_doc = await donation_ref.get()

        if (!donation_doc.exists) {
          return reply
            .status(404)
            .send(new ClientError('Doação não encontrada'))
        }

        const donationData = donation_doc.data()

        if (!donationData) {
          return reply
            .status(404)
            .send(new ClientError('Dados da doação não encontrados'))
        }

        const { item_name, quantity, measure, campaign_id, userID } = donationData

        // Recuperar a campanha
        const campaign_ref = db.collection('campaigns').doc(campaign_id)
        const campaign_doc = await campaign_ref.get()

        if (!campaign_doc.exists) {
          return reply.status(404).send(new ClientError('Campanha não encontrada'))
        }

        const campaignData = campaign_doc.data()

        if (!campaignData) {
          return reply.status(404).send(new ClientError('Dados da campanha não encontrados'))
        }

        const updatedSections = campaignData.section?.map(
          (section: {
            items: {
              name: string
              measure: string
              amount_donated?: number
              goal: number
              status?: string
            }[]
          }) => ({
            ...section,
            items: section.items.map((item: { name: string; measure: string; amount_donated?: number; goal: number; status?: string }) =>
              item.name === item_name && item.measure === measure
                ? {
                    ...item,
                    amount_donated: (item.amount_donated || 0) - quantity, 
                    goal: item.goal + quantity, 
                    status: (item.amount_donated || 0) - quantity === 0 ? 'pendente' : item.status, // Atualiza o status
                  }
                : item
            ),
          })
        )

        await campaign_ref.update({
          section: updatedSections,
          donations: FieldValue.arrayRemove(donationData), 
          participants_ids: FieldValue.arrayRemove(userID),
        })

        await donation_ref.delete()

        return {
          message: 'Doação deletada com sucesso',
          donation_id,
        }
      } catch (error) {
        console.error(error)
        return reply.status(500).send(new ClientError('Erro ao deletar doação'))
      }
    }
  )
}
