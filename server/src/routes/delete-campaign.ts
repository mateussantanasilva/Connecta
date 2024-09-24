import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import fromZodSchema from "zod-to-json-schema";

const ParamsScampaignIdchema = z.object({
  campaignId: z.string().uuid(),
});
export async function deleteCampaign(app: FastifyInstance) {
    app.delete('/campaign/campaignId', {
        schema: {
            params: fromZodSchema(ParamsScampaignIdchema), 
        },
    }, async (request, reply) => {
        const { campaignId } = request.params as z.infer<typeof ParamsScampaignIdchema>;

        try {
            const campaign = await prisma.campaign.delete({
                where: {
                    id: campaignId,
                },
            });

            if (!campaign) {
                return reply.status(404).send({ error: 'Campanha não encontrada' });
            }

            return { message: 'Campanha deletada com sucesso', campaignId: campaign.id };
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao deletar campanha' });
        }
    });
}
