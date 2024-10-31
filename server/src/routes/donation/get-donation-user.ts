/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
  user_id: z.string().min(1),
})

export async function getDonationByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/donations/user/:user_id',
    {
      schema: {
          querystring: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', minimum: 1, default: 1 },
                        limit: { type: 'number', minimum: 1, default: 8 },
                        filterBy: { type: 'string', default: '' },
                        filterValue: { type: 'string', default: '' }
                    },
                },
        params: {
          type: 'object',
          properties: {
            user_id: { type: 'string' },
          },
          required: ['user_id'],
        },
      },
    },
    async (request, reply) => {
      const { page, limit, filterBy, filterValue } = request.query as { page: number; limit: number; filterBy: string; filterValue: string }

      try {
        const { user_id } = request.params as z.infer<typeof ParamsSchema>

        const user_doc = await db.collection('users').doc(user_id).get()

        if (!user_doc.exists) {
          throw new ClientError('Usuário não encontrada')
        }

        const donationsSnapshot = await db
          .collection('donations')
          .where('user_id', '==', user_id)
          .get()

        let donations = donationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (donations.length === 0) {
          throw new ClientError('Usuário sem doações no momento!')
        }

        const filterIsValid = (key: string): key is keyof typeof donations[0] => {
          return key in donations[0]
        }
                if (filterBy && filterValue && filterIsValid(filterBy)) {
                    donations = donations.filter(donee =>
                        donee[filterBy]?.toLowerCase().includes(filterValue.toLowerCase())
                    )
                }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedDonationsByUser = donations.slice(startIndex, endIndex)
        
        return reply.status(200).send(paginatedDonationsByUser)
      } catch (error) {
        console.error(error)
        return reply.status(500).send()
      }
    },
  )
}
