import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function authenticationMiddleware(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().addHook('onRequest', async (req, res) => {
        const publicRoutes = ['/login/google', '/login/google/callback', '/logout']
        if (req.routeOptions.url && publicRoutes.includes(req.routeOptions.url)) {
          return
        }
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).send({ error: 'Usuário não autenticado' })
        }
    })
}