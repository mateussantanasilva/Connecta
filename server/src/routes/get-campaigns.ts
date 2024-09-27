import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../errors/client-error'
import { db } from '../lib/firebase'

const CampaignStatus = z.enum(['ABERTA', 'EM_BREVE', 'FECHADA'])

const itemCampaignSchema = z.object({
  name: z.string().min(1),
  measure: z.string().min(1),
})

export async function getCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/campaigns',
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              collection_point: z.array(z.string()),
              description: z.string(),
              observation: z.string().nullable(),
              categories: z.array(z.string()),
              progress: z.number(),
              status: CampaignStatus,
              participants: z.number(),
              started_at: z.string(),
              goal: z.string(),
              items: z.array(itemCampaignSchema).min(1),
              grantee: z
                .object({
                  full_name: z.string(),
                })
                .nullable(),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      try {
        const campaignsSnapshot = await db.collection('campaigns').get()

        const campaigns = campaignsSnapshot.docs.map((doc) => {
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
            items: data.items || [],
            grantee: data.grantee
              ? { full_name: data.grantee.full_name }
              : null,
          }
        })

        if (campaigns.length === 0) {
          throw new ClientError('Sem campanhas no momento!')
        }

        return reply.status(200).send(campaigns)
      } catch (error) {
        console.error(error)
        return reply.status(500).send()
      }
    },
  )
}
