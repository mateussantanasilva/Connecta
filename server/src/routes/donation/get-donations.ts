import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'
import { donationStatus } from '../donation/create-donation'

export async function getDonations(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/donations',
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
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              item_name: z.string(),
              quantity: z.number(),
              measure: z.string(),
              campaign_id: z.string(),
              status: donationStatus,
              user_id: z.string(),
            }),
          ),
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
        const donationsSnapshot = await db.collection('donations').get()

        let donations = donationsSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            item_name: data.item_name,
            quantity: data.quantity,
            measure: data.measure,
            campaign_id: data.campaign_id,
            status: data.status,
            user_id: data.user_id,
            date: data.donation_date,
          }
        })

        if (donations.length === 0) {
          throw new ClientError('Sem doações no momento!')
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
        const paginatedCampaigns = donations.slice(startIndex, endIndex)

        return reply.status(200).send(paginatedCampaigns)
      } catch (error) {
        console.error(error)
        return reply.status(500).send()
      }
    },
  )
}
