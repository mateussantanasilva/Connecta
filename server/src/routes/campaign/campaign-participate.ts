/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'

const ParamsSchema = z.object({
  campaignId: z.string(),
})

const BodySchema = z.object({
  userId: z.string(),
})

export async function campaignParticipate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/campaigns/:campaignId/participate',
    {
      schema: {
        params: fromZodSchema(ParamsSchema),
        body: fromZodSchema(BodySchema),
      },
    },
    async (request, reply) => {
      const { campaignId } = request.params as z.infer<typeof ParamsSchema>
      const { userId } = request.body as z.infer<typeof BodySchema>

      try {
        const campaignRef = db.collection('campaigns').doc(campaignId)
        const campaignDoc = await campaignRef.get()

        if (!campaignDoc.exists) {
          return reply.status(404).send(new ClientError('Campanha não encontrada'))
        }

        const campaignData = campaignDoc.data()

        const currentParticipants = campaignData?.participants_ids || []
        if (currentParticipants.includes(userId)) {
          return reply
            .status(400)
            .send(new ClientError('Usuário já está participando desta campanha'))
        }

        await campaignRef.update({
          participants_ids: [...currentParticipants, userId],
          participants: (campaignData?.participants || 0) + 1,
        })

        return reply.status(200).send({ message: 'Usuário adicionado com sucesso à campanha' })
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao adicionar participante à campanha'))
      }
    },
  )
}
