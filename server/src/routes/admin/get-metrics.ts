import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getMetrics(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/metrics',
        async (req, res) => {
            const donationSnapshot = await (await db.collection('donations').where('status', '==', 'confirmada').get())
            var totalDonatedItems = 0
            const donationSnapshotData = donationSnapshot.docs
            donationSnapshotData.forEach(donation => {
                totalDonatedItems = totalDonatedItems + donation.data().quantity
            });
            const totalCampaigns = await (await db.collection('campaigns').get()).size
            const totalFamilies = await (await db.collection('users').where('role', '==', 'donatário').get()).size
            const MetricsSchema = {
                totalDonatedItems,
                totalCampaigns,
                totalFamilies
            }
            res.status(200).send(MetricsSchema)
        }
    )
}