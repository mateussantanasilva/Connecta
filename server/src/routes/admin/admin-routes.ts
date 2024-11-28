import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getMetrics } from "./get-metrics"
import { deleteDoneeRequest } from "./delete-donee-request"
import { getAcceptDoneeRequest } from "./get-accept-donee-request"
import { getDoneeRequest } from "./get-donee-request"
import { getDoneeRequests } from "./get-donee-requests"
import { getDonees } from "./get-donees"
import { deleteDonation } from "./delete-donation"
import { deleteCampaign } from "./delete-campaign"
import { getAdminPanel } from "./get-panel"
import { getDonations } from "./get-donations"

export async function adminRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(deleteDoneeRequest)
        .register(getAcceptDoneeRequest)
        .register(getDoneeRequest)
        .register(getDoneeRequests)
        .register(getMetrics)
        .register(getDonees)
        .register(deleteDonation)
        .register(deleteCampaign)
        .register(getAdminPanel)
        .register(getDonations)
}