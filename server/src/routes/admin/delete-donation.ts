/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

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

        await donation_ref.delete()

        return {
          message: 'Doação deletada com sucesso',
          donation_id,
        }
      } catch (error) {
        console.error(error)
        return reply.status(500).send(new ClientError('Erro ao deletar doação'))
      }
    },
  )
}
