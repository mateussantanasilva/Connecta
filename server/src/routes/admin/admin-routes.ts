import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getMetrics } from "./get-metrics"
import { getPublicMetrics } from "./get-public-metrics"

export async function adminRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(getMetrics)
        .register(getPublicMetrics)
}