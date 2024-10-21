import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getMetrics(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/metrics',
        async (req, res) => {
            const donationsSnapshot = db.collection('donations')
            const campaignsSnapshot = db.collection('campaigns')
            const usersSnapshot = db.collection('users')

            const donationsData = (await donationsSnapshot.where('status', '==', 'confirmada').get()).docs
            var totalDonatedItems = 0

            donationsData.forEach(donation => {
                totalDonatedItems = totalDonatedItems + donation.data().quantity
            });

            const totalCampaigns = (await campaignsSnapshot.get()).size
            const totalFamilies = (await usersSnapshot.where('role', '==', 'donatário').get()).size
            const totalCompletedCampaigns = (await campaignsSnapshot.where('progress', '==', 100).get()).size
            const openCampaigns = (await campaignsSnapshot.where('status', '==', 'aberta').get()).size

            const MetricsSchema = {
                totalDonatedItems,
                totalCampaigns,
                totalFamilies,
                totalCompletedCampaigns,
                openCampaigns
            }
            res.status(200).send(MetricsSchema)
        }
    )
}