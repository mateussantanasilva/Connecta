import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { db } from '../../lib/firebase'

export async function authenticationMiddleware(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().addHook('onRequest', async (req, res) => {
        const authRoutes = ['/login/google', '/login/google/callback', '/logout']
        // verifica se a rota não é nula e se é uma rota de autenticação ou uma rota pública
        if (req.routeOptions.url && (authRoutes.includes(req.routeOptions.url) || req.routeOptions.url.includes('/public/'))) {
          return
        }
        const token = req.cookies.token;
        const userId = req.cookies.user
        if (!token || !userId) {
          return res.status(401).send({ error: 'Usuário não autenticado' })
        }
        const userSnapshot = await db.collection('users').doc(userId).get()
        if (!userSnapshot.exists) {
          return res.status(401).send({ error: 'Usuário não encontrado' })
        }
        const userData = userSnapshot.data()
        if (req.routeOptions.url && (req.routeOptions.url.includes('/admin/') && userData?.role !== 'administrador')) {
          return res.status(403).send({ message: 'Acesso negado. Rota para administradores' })
      }
    }
  )
}