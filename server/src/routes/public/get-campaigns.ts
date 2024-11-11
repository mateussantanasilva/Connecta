import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'


export async function getCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/public/campaigns',
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
        page: number
        limit: number
        filterBy: string
        filterValue: string
      }

      try {
        const campaignsSnapshot = await db.collection('campaigns').get()

        let campaigns = await Promise.all(
          campaignsSnapshot.docs.map(async (doc) => {
            const data = doc.data()

            return {
              id: doc.id,
              name: data.name,
              collection_point: data.collection_point || [],
              description: data.description,
              observation: data.observation || null,
              categories: data.categories || [],
              progress: data.progress,
              status: data.status,
              participants: data.participants,
              started_at: data.started_at,
              goal: data.goal,
            }
          }),
        )

        const filterIsValid = (key: string): key is keyof typeof campaigns[0] => {
          return key in campaigns[0]
        }
        if (filterBy && filterValue && filterIsValid(filterBy)) {
          campaigns = campaigns.filter(campaign =>
            campaign[filterBy]?.toLowerCase().includes(filterValue.toLowerCase())
          )
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedCampaigns = campaigns.slice(startIndex, endIndex)

        return reply.status(200).send(paginatedCampaigns)
      } catch (error) {
        console.error(error)
        return reply.status(500).send(new ClientError("Erro ao buscar campanhas"))
      }
    },
  )
}
