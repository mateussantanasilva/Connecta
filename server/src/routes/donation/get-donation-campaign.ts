/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
  campaignId: z.string().min(1),
})

export async function getDonationByCampaign(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/donations/:campaignId',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        campaignId: { type: 'string' },
                    },
                    required: ['campaignId'],
                },
            },
        },
        async (request, reply) => {
            try {
                const { campaignId } = request.params as z.infer<typeof ParamsSchema>

                const campaignDoc = await db.collection('campaigns').doc(campaignId).get()

                if (!campaignDoc.exists) {
                    throw new ClientError('Campanha não encontrada')
                }

                const donationsSnapshot = await db
                    .collection('donations')
                    .where('campaign_id', '==', campaignId)
                    .get();

                const donations = donationsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (donations.length === 0) {
                    throw new ClientError('Campanha sem doações no momento!')
                }

                return reply.status(200).send(donations)
            } catch (error) {
                console.error(error)
                return reply.status(500).send()
            }
        })
}
