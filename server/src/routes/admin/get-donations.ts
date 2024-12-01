import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'
import { donationStatus } from '../donation/create-donation'

export async function getDonations(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/admin/donations',
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
      },
    },
    async (request, reply) => {
      const { page, limit, filterBy, filterValue } = request.query as {
        page: number;
        limit: number;
        filterBy: string;
        filterValue: string
      }
   
      try {
        const donationsSnapshot = await db.collection('donations')
          .orderBy('donation_date', 'desc')  
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
        return reply.status(500).send(new ClientError('Erro ao buscar doações'))
      }
    },
  )
}
