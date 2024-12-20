import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ClientError } from '../../errors/client-error'

export async function getMetrics(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/metrics',
        async (req, res) => {
            try {
                const donationsSnapshot = db.collection('donations')
                const campaignsSnapshot = db.collection('campaigns')
                const usersSnapshot = db.collection('users')
                const requestsSnapshot = db.collection('donee-request')

                const donationsData = (await donationsSnapshot.where('status', '==', 'confirmada').get()).docs
                var annualDonations = 0

                donationsData.forEach(donation => {
                    let donationYear = new Date(donation.data().donation_date).getFullYear()
                    let year = new Date().getFullYear()
                    if (donationYear == year) {
                        annualDonations = annualDonations + donation.data().quantity
                    }
                });

                const activeDonors = (await usersSnapshot.where('role', '==', 'donatário').get()).size
                const totalCompletedCampaigns = (await campaignsSnapshot.where('progress', '==', 100).get()).size
                const openCampaigns = (await campaignsSnapshot.where('status', '==', 'aberta').get()).size
                const soonCampaigns = (await campaignsSnapshot.where('status', '==', 'em breve').get()).size
                const doneeRequests = (await requestsSnapshot.get()).size
                const unconfirmedDonations = (await donationsSnapshot.where('status', '==', 'pendente').get()).size
                const totalEndedCampaigns = (await campaignsSnapshot.where('status', '==', 'fechada').get()).size


                const MetricsSchema = {
                    activeDonors,
                    doneeRequests,
                    totalCompletedCampaigns,
                    openCampaigns,
                    totalEndedCampaigns,
                    soonCampaigns,
                    unconfirmedDonations,
                    annualDonations
                }
                res.status(200).send(MetricsSchema)
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao buscar métricas administrativas'))
            }
        }
    )
}