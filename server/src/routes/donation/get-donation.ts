import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
  donationId: z.string(),
})

export async function getDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/donation/:donationId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            donationId: { type: 'string' },
          },
          required: ['donationId'],
        },
      },
    },
    async (request) => {
      const { donationId } = request.params as z.infer<typeof ParamsSchema>

      const donationDoc = await db.collection('donations').doc(donationId).get()

      if (!donationDoc.exists) {
        throw new ClientError('Doação não encontrada')
      }

      const donation = { id: donationDoc.id, ...donationDoc.data() }

      return { donation }
    },
  )
}
