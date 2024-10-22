import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'
import { donationStatus } from '../donation/create-donation'
import { CampaignStatus } from './create-campaign'


const itemCampaignSchema = z.object({
  name: z.string().min(1),
  measure: z.string().min(1),
})

const donationSchema = z.object({
  id_donation: z.string().min(1),
  item_name: z.string().min(1),
  quantity: z.number().min(1),
  measure: z.string().min(1),
  status: donationStatus,
})
export async function getCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/campaigns',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: { 
            page: { type: 'number', minimum: 1, default: 1 },
            limit: { type: 'number', minimum: 1, default: 8 },
          },
        },
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
              donations: z.array(donationSchema).optional().default([]),
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
      const { page, limit } = request.query as { page: number; limit: number };

      try {
        const campaignsSnapshot = await db.collection('campaigns').get();

        const campaigns = campaignsSnapshot.docs.map((doc) => {
          const data = doc.data();
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
            donations: data.donations || [],
            grantee: data.grantee
              ? { full_name: data.grantee.full_name }
              : null,
          };
        });

        if (campaigns.length === 0) {
          throw new ClientError('Sem campanhas no momento!');
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCampaigns = campaigns.slice(startIndex, endIndex);

        return reply.status(200).send(paginatedCampaigns);
      } catch (error) {
        console.error(error);
        return reply.status(500).send();
      }
    },
  );
}
