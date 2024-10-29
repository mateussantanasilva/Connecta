import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getMetrics } from "./get-metrics"
import { deleteDoneeRequest } from "./delete-donee-request"
import { getAcceptDoneeRequest } from "./get-accept-donee-request"
import { getDoneeRequest } from "./get-donee-request"
import { getDoneeRequests } from "./get-donee-requests"

export async function adminRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(deleteDoneeRequest)
        .register(getAcceptDoneeRequest)
        .register(getDoneeRequest)
        .register(getDoneeRequests)
        .register(getMetrics)
}