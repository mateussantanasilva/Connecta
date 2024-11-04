import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getRootRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/',
        async (req, res) => {
            return res.status(200).send()
        }
    )
}