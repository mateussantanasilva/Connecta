import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'
import fromZodSchema from "zod-to-json-schema";

const campaignSchema = z.object({
    name: z.string().min(1),
    collection_point: z.string().min(1),
    description: z.string().min(1),
    observation: z.string().optional(),
    categories: z.string().min(1),
    progress: z.number().min(0).max(100),
    status: z.string().min(1),
    participants: z.number().nonnegative(),
    started_at: z.coerce.date(),
    grantee_name: z.string(),
    grantee_email: z.string().email(),
    grantee_user_type: z.string().optional().default('grantee'),
});

const ParamsSchema = z.object({
  campaignId: z.string().uuid(),
});

export async function updateCampaign(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/campaigns/:campaignId',
    {
     schema: {
            body: fromZodSchema(campaignSchema), 
        },
    }, async (request, reply) => {
        const { campaignId } = request.params as z.infer<typeof ParamsSchema>;

        try {
            const campaign = await prisma.campaign.update({
                where: { id: campaignId },
                data: request.body as z.infer<typeof campaignSchema>,
            });
            
            if (campaignId !== campaign.id) {
                throw new Error('Erro ao atualizar campanha');
            }

            return { campaignId: campaign.id };
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Server error' });
        }
    });
}