/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'
import { campaignSection } from './create-campaign'

const CampaignStatus = z.enum(['aberta', 'em breve', 'fechada'])

const campaignSchema = z.object({
  name: z.string().min(1),
  collection_point: z.array(z.string()).min(1),
  description: z.string().min(1),
  observation: z.string().optional(),
  categories: z.array(z.string()).min(1),
  progress: z.number().min(0).max(100),
  status: CampaignStatus,
  participants: z.number().nonnegative(),
  section: z.array(campaignSection).min(1),
})

const ParamsSchema = z.object({
  campaignId: z.string(),
})

export async function updateCampaign(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/campaigns/:campaignId',
    {
      schema: {
        params: fromZodSchema(ParamsSchema),
        body: fromZodSchema(campaignSchema),
      },
    },
    async (request, reply) => {
      const { campaignId } = request.params as z.infer<typeof ParamsSchema>
      const {
        name,
        collection_point,
        description,
        observation,
        categories,
        progress,
        status,
        participants,
        section,
      } = request.body as z.infer<typeof campaignSchema>

      try {
        const campaignRef = db.collection('campaigns').doc(campaignId)
        const campaignDoc = await campaignRef.get()

        if (!campaignDoc.exists) {
          return reply.status(404).send(new ClientError('Campanha não encontrada'))
        }

        const campaignData = campaignDoc.data()
        if (campaignData && campaignData.status === 'fechada') {
          return reply.status(400).send(new ClientError('Não é possível editar campanha fechada'))
        }

        const updatedCampaignData: any = {
          name,
          collection_point,
          description,
          observation,
          categories,
          progress,
          status,
          participants,
          section,
        }

        if (campaignData && status === 'aberta' && !campaignData.started_at) {
          updatedCampaignData.started_at = new Date().toISOString()
        }

        if (campaignData && status === 'fechada' && !campaignData.closed_at) {
          updatedCampaignData.closed_at = new Date().toISOString()
        }

        await campaignRef.update(updatedCampaignData)

        const totalItems = section.flatMap(sec => sec.items).length
        const completedItems = section.flatMap(sec => sec.items).filter(
          item => item.status === 'concluído').length

        const progressPercentage = (completedItems / totalItems) * 100

        await campaignRef.update({ progress: progressPercentage })

        if (completedItems === totalItems) {
          const currentDate = new Date().toISOString()
          await campaignRef.update({
            status: 'fechada',
            closed_at: currentDate,
          })
        }

        return reply.status(200).send()
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao atualizar campanha'))
      }
    },
  )
}
