import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function authenticationMiddleware(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().addHook('onRequest', async (req, res) => {
        const authRoutes = ['/login/google', '/login/google/callback', '/logout']
        // verifica se a rota não é nula e se é uma rota de autenticação ou uma rota pública
        if (req.routeOptions.url && (authRoutes.includes(req.routeOptions.url) || req.routeOptions.url.includes('/public/'))) {
          return
        }
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).send({ error: 'Usuário não autenticado' })
        }
    })
}