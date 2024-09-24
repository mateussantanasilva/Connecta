import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
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

export async function createCampaign(app: FastifyInstance) {
    app.post('/campaign', {
        schema: {
            body: fromZodSchema(campaignSchema), // Converte Zod para JSON Schema
        },
    }, async (request, reply) => {
        const {
            name, collection_point, description, observation, categories, 
            progress, status, participants, started_at, grantee_name, grantee_email, grantee_user_type
        } = request.body as z.infer<typeof campaignSchema>;

        try {
            const campaign = await prisma.campaign.create({
                data: {
                    name,
                    collection_point,
                    description,
                    observation,
                    categories,
                    progress,
                    status,
                    participants,
                    started_at,
                    users: {
                        createMany: {
                            data: [
                                {
                                    full_name: grantee_name,
                                    email: grantee_email,
                                    user_type: grantee_user_type
                                }
                            ]
                        }
                    }
                }
            });
            
            if (!campaign) {
                throw new Error('Erro ao criar campanha');
            }

            return { campaignId: campaign.id };
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Server error' });
        }
    });
}
