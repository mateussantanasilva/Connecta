import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getPublicMetrics } from './get-public-metrics'
import { login } from '../authentication/login'
import { logout } from '../authentication/logout'
import { getCampaigns } from './get-campaigns'
import { getByIdCampaigns } from './get-campaign'
import { getRootRoute } from './get-root-route'

export async function publicRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(getPublicMetrics)
    .register(login)
    .register(logout)
    .register(getCampaigns)
    .register(getByIdCampaigns)
    .register(getRootRoute)
}
