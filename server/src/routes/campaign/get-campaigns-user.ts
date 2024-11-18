/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'

const ParamsSchema = z.object({
  userId: z.string(),
})

export async function getUserCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/campaigns',
    {
      schema: {
        params: fromZodSchema(ParamsSchema),
      },
    },
    async (request, reply) => {
      const { userId } = request.params as z.infer<typeof ParamsSchema>

      try {
        const campaignsSnapshot = await db.collection('campaigns').get()

        if (campaignsSnapshot.empty) {
          return reply
            .status(404)
            .send(new ClientError('Nenhuma campanha encontrada'))
        }

        const userCampaigns = campaignsSnapshot.docs
          .map(doc => ({ id: doc.id, ...(doc.data() as { participants_ids?: string[] }) }))
          .filter(campaign => campaign.participants_ids?.includes(userId))

        if (userCampaigns.length === 0) {
          return reply
            .status(404)
            .send(new ClientError('Usuário não está participando de nenhuma campanha'))
        }

        return reply.status(200).send(userCampaigns)
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao buscar campanhas do usuário'))
      }
    },
  )
}
