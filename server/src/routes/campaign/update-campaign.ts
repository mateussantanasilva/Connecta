/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'

const CampaignStatus = z.enum(['aberta', 'em breve', 'fechada'])

const itemCampaignSchema = z.object({
  name: z.string().min(1),
  measure: z.string().min(1),
  status: z.enum(['disponível', 'reservado', 'concluído'])
})

const campaignSchema = z.object({
  name: z.string().min(1),
  collection_point: z.array(z.string()).min(1),
  description: z.string().min(1),
  observation: z.string().optional(),
  categories: z.array(z.string()).min(1),
  progress: z.number().min(0).max(100),
  status: CampaignStatus,
  participants: z.number().nonnegative(),
  started_at: z.string().min(1),
  goal: z.string().min(1),
  items: z.array(itemCampaignSchema).min(1),
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
        started_at,
        goal,
        items,
      } = request.body as z.infer<typeof campaignSchema>

      try {
        const campaignRef = db.collection('campaigns').doc(campaignId)
        const campaignDoc = await campaignRef.get()

        if (!campaignDoc.exists) {
          throw new ClientError('Campanha não encontrada')
        }

        const updatedCampaignData = {
          name,
          collection_point,
          description,
          observation,
          categories,
          progress,
          status,
          participants,
          started_at,
          goal,
          items,
        }

        await campaignRef.update(updatedCampaignData)

        const totalItems = items.length
        const completedItems = items.filter((item) => item.status === 'concluído').length

        const progressPercentage = (completedItems / totalItems) * 100

        await campaignRef.update({ progress: progressPercentage })

        if (completedItems === totalItems) {
          await campaignRef.update({ status: 'fechada' })
        }

        return reply.send({ campaignId })
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao atualizar campanha'))
      }
    },
  )
}
