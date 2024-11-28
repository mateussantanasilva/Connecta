/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
  userID: z.string().min(1),
})

export async function getDonationByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/donations/user/:userID',
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
            userID: { type: 'string' },
          },
          required: ['userID'],
        },
      },
    },
    async (request, reply) => {
      const { page, limit, filterBy, filterValue } = request.query as { page: number; limit: number; filterBy: string; filterValue: string }

      try {
        const { userID } = request.params as z.infer<typeof ParamsSchema>

        const user_doc = await db.collection('users').doc(userID).get()

        if (!user_doc.exists) {
          return reply.status(404).send(new ClientError('Usuário não encontrado'))
        }

        const donationsSnapshot = await db
          .collection('donations')
          .where('userID', '==', userID)
          .get()

        let donationsData = await Promise.all(donationsSnapshot.docs.map(async (doc) => {
          const data = doc.data()
          const userDoc = await db.collection('users').doc(data?.userID).get()
          if(!userDoc.exists) {
            return reply.status(404).send(new ClientError(`Doação ${data.id} com usuário inexistente`))
          }
          return {
            id: doc.id,
            item_name: data.item_name,
            quantity: data.quantity,
            measure: data.measure,
            campaign_id: data.campaign_id,
            status: data.status,
            userID: data.userID,
            ...userDoc.data(),
            date: data.donation_date,
          }
        }))

        const filterIsValid = (key: string): key is keyof typeof donationsData[0] => {
          return key in donationsData[0]
        }
                if (filterBy && filterValue && filterIsValid(filterBy)) {
                  donationsData = donationsData.filter(donee =>
                        donee[filterBy]?.toLowerCase().includes(filterValue.toLowerCase())
                    )
                }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const donations = donationsData.slice(startIndex, endIndex)

        const totalResponses = donationsSnapshot.size
        const responseSchema = {
          page,
          limit,
          totalResponses,
          donations
        }
        
        return reply.status(200).send(responseSchema)
      } catch (error) {
        console.error(error)
        return reply.status(500).send(new ClientError('Erro ao buscar doações por usuário'))
      }
    },
  )
}
