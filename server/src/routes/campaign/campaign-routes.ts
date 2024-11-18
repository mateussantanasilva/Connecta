import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createCampaign } from './create-campaign'
import { updateCampaign } from './update-campaign'
import { campaignParticipate } from './campaign-participate'
import { getUserCampaigns } from './get-campaigns-user'

export async function campaignRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(createCampaign)
    .register(updateCampaign)
    .register(getUserCampaigns)
    .register(campaignParticipate)
}
