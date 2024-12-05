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
      const { userId } = request.params as z.infer<typeof ParamsSchema>
      const { page, limit, filterBy, filterValue } = request.query as {
        page: number;
        limit: number;
        filterBy: string;
        filterValue: string
      }

      try {
        const campaignsSnapshot = await db.collection('campaigns').get()

        if (campaignsSnapshot.empty) {
          return reply
            .status(404)
            .send(new ClientError('Nenhuma campanha encontrada'))
        }

        let userCampaigns = campaignsSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...(doc.data() as { participants_ids?: string[]; created_at?: any })
          }))
          .filter(campaign => campaign.participants_ids?.includes(userId))

        if (userCampaigns.length === 0) {
          return reply
            .status(404)
            .send(new ClientError('Usuário não está participando de nenhuma campanha'))
        }

        userCampaigns = userCampaigns.sort((a, b) => {
          if (a.created_at && b.created_at) {
            return b.created_at.seconds - a.created_at.seconds 
          }
          return 0
        })

        const filterIsValid = (key: string | number | symbol ): key is keyof typeof userCampaigns[0] => {
          return key in userCampaigns[0]
        }

        if (filterBy && filterValue && filterIsValid(filterBy)) {
          userCampaigns = userCampaigns.filter(donee =>
            String(donee[filterBy])?.toLowerCase().includes(filterValue.toLowerCase())
          )
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const campaigns = userCampaigns.slice(startIndex, endIndex)

        const totalResponses = userCampaigns.length
        const responseSchema = {
          page,
          limit,
          totalResponses,
          campaigns
        }

        return reply.status(200).send(responseSchema)
      } catch (error) {
        console.error(error)
        return reply
          .status(500)
          .send(new ClientError('Erro ao buscar campanhas do usuário'))
      }
    },
  )
}
