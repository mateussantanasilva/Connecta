import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getUserProfile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/users/profile',
        async (req, res) => {
            return res.status(200).send()
        }
    )
}