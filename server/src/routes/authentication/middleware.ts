import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { db } from '../../lib/firebase'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ClientError } from "../../errors/client-error"

dotenv.config()
const JWT_SECRET = process.env.SESSION_SECRET!
const redirectURL = process.env.PRODUCTION ? 'https://connecta-1azy.onrender.com' : 'http://localhost:3000'

export async function authenticationMiddleware(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().addHook('onRequest', async (req, res) => {
        const authRoutes = ['/login/google', '/login/google/callback', '/logout', '/']
        // verifica se a rota não é nula e se é uma rota de autenticação ou uma rota pública
        if (req.routeOptions.url && (authRoutes.includes(req.routeOptions.url) || req.routeOptions.url.includes('/public/'))) {
          return
        }
        const user = req.headers['user']
        if (!user) {
          return res.status(401).send(new ClientError('Usuário não autenticado'))
        }

        const decoded = jwt.decode(user.toString())
        if (!decoded || typeof decoded === 'string' || !decoded.exp) {
          return res.status(401).send(new ClientError('Token inválido'))
        }
        const now = Math.floor(Date.now() / 1000)
        if (decoded.exp < now) {
          res.clearCookie('user', { path: '/', secure: true, sameSite: 'none' })
          return res.redirect(`${redirectURL}/login/google`)
        }

        const userDecoded = jwt.verify(user.toString(), JWT_SECRET) as { userID: string }
        const userSnapshot = await db.collection('users').doc(userDecoded.userID).get()
        if (!userSnapshot.exists) {
          return res.status(401).send(new ClientError('Usuário não encontrado'))
        }
        const userData = userSnapshot.data()
        if (req.routeOptions.url && (req.routeOptions.url.includes('/admin/') && userData?.role !== 'administrador')) {
          return res.status(403).send(new ClientError('Acesso negado. Rota para administradores'))
      }
    }
  )
}