import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../errors/client-error'

export async function getCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/campaigns',
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              collection_point: z.string(),
              // collection_point: z.array(z.string()),
              description: z.string(),
              observation: z.string().nullable(),
              categories: z.string(),
              // categories: z.array(z.string()),
              progress: z.number(),
              status: z.string(),
              // status: z.enum(['Aberta', 'Em_breve', 'Fechada']),
              participants: z.number(),
              started_at: z.date(),
              grantee: z.object({
                full_name: z.string(),
              }).nullable(),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      try {
        const campaigns = await prisma.campaign.findMany({
          include: {
            users: { 
              select: {
                id: true,
                full_name: true,
                email: true,
              },
            },
          },
        })

        if (campaigns.length === 0) {
          throw new ClientError('Sem campanhas no momento!')
        }

       /* const formattedCampaigns = campaigns.map(campaign => ({
          ...campaign,
          grantee: campaign.users.length > 0 ? campaign.users[0] : null,
        }));*/

        return reply.status(200).send(campaigns)
      } catch (error) {
        console.error(error)
        return reply.status(500).send()
      }
    },
  )
}
