import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ClientError } from '../../errors/client-error'

export async function getPublicMetrics(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/public/metrics',
        async (req, res) => {
            try {
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

                const MetricsSchema = {
                    totalDonatedItems,
                    totalCampaigns,
                    totalFamilies
                }
                res.status(200).send(MetricsSchema)
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError("Erro ao buscar métricas públicas"))
            }
        }
    )
}