import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsCampaignIdSchema = z.object({
  campaignId: z.string(),
})

export async function deleteCampaign(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/campaigns/:campaignId',
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

    async (request, reply) => {
      const { campaignId } = request.params as z.infer<
        typeof ParamsCampaignIdSchema
      >

      try {
        const campaignRef = db.collection('campaigns').doc(campaignId)
        const campaignDoc = await campaignRef.get()

        if (!campaignDoc.exists) {
          return reply
            .status(404)
            .send(new ClientError('Campanha não encontrada'))
        }

        await campaignRef.delete()

        return {
          message: 'Campanha deletada com sucesso',
          campaignId,
        }
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao deletar campanha'))
      }
    },
  )
}
