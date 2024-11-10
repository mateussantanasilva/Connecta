import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
  campaignId: z.string(),
})

export async function getByIdCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/public/campaigns/:campaignId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            campaignId: { type: 'string' },
          },
          required: ['campaignId'],
        },
      },
    },
    async (request, response) => {
      try {
        const { campaignId } = request.params as z.infer<typeof ParamsSchema>
        
        const campaignDoc = await db.collection('campaigns').doc(campaignId).get()
        
        if (!campaignDoc.exists) {
          return response.status(404).send(new ClientError('Campanha não encontrada'))
        }
        
        const campaign = { id: campaignDoc.id, ...campaignDoc.data() }
        
        return response.status(200).send(campaign)
      } catch (error) {
        console.error(error)
        return response.status(500).send(new ClientError('Erro ao buscar campanha por id'))
      }
    },
  )
}
