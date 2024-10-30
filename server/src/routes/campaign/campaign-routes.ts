import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getCampaigns } from './get-campaigns'
import { getByIdCampaigns } from './get-campaign'
import { createCampaign } from './create-campaign'
import { deleteCampaign } from './delete-campaign'
import { updateCampaign } from './update-campaign'

export async function campaignRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(getCampaigns)
    .register(getByIdCampaigns)
    .register(createCampaign)
    .register(deleteCampaign)
    .register(updateCampaign)
}
