import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createDonation } from './create-donation'
import { getDonationByCampaign } from './get-donation-campaign'
import { updateDonation } from './update-donation'
import { getDonationByUser } from './get-donation-user'
import { getDonation } from './get-donation'

export async function donationRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(createDonation)
    .register(getDonationByCampaign)
    .register(updateDonation)
    .register(getDonationByUser)
    .register(getDonation)
}
