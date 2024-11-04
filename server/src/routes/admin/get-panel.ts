import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getAdminPanel(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/panel',
        async (req, res) => {
            return res.status(200).send()
        }
    )
}