import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createDonation } from './create-donation'
import { getDonations } from './get-donations'
import { getDonationByCampaign } from './get-donation-campaign'
import { updateDonation } from './update-donation'
import { getDonationByUser } from './get-donation-user'

export async function donationRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(createDonation)
    .register(getDonations)
    .register(getDonationByCampaign)
    .register(updateDonation)
    .register(getDonationByUser)
}
