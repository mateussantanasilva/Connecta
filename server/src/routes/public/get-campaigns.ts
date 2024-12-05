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

        let campaignsData = await Promise.all(
          campaignsSnapshot.docs.map(async (doc) => {
            const data = doc.data()

            const numberDonations = (data.donations?.length || 0)

            let displayDate: string | null = null;
            if (data.status === 'aberta' && data.started_at) {
              displayDate = data.started_at;
            } else if (data.status === 'fechada' && data.closed_at) {
              displayDate = data.closed_at;
            }

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
              section: data.section,
              goal: data.goal,
              numberDonations: numberDonations,
              created_at: data.created_at,  
              displayDate, 
            }
          })
        )

        campaignsData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
          return dateB.getTime() - dateA.getTime() 
        })

        const filterIsValid = (key: string): key is keyof typeof campaignsData[0] => {
          return key in campaignsData[0]
        }
        if (filterBy && filterValue && filterIsValid(filterBy)) {
          campaignsData = campaignsData.filter(campaign =>
            campaign[filterBy]?.toLowerCase().includes(filterValue.toLowerCase())
          )
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const campaigns = campaignsData.slice(startIndex, endIndex)

        const totalResponses = campaignsSnapshot.size
        const responseSchema = {
          page,
          limit,
          totalResponses,
          campaigns
        }

        return reply.status(200).send(responseSchema)
      } catch (error) {
        console.error(error)
        return reply.status(500).send(new ClientError("Erro ao buscar campanhas"))
      }
    },
  )
}
