import Fastify from 'fastify'
import fastifyOAuth2 from '@fastify/oauth2'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { authenticationMiddleware } from './routes/authentication/middleware'
import { login } from './routes/authentication/login'
import { logout } from './routes/authentication/logout'
import { userRoutes } from './routes/user/user-routes'
import { donationRoutes } from './routes/donation/donation-routes'
import { campaignRoutes } from './routes/campaign/campaign-routes'
import { adminRoutes } from './routes/admin/admin-routes'
import { getPublicMetrics } from './routes/public/get-public-metrics'

const fastify = Fastify()

dotenv.config()
const googleClientId = process.env.GOOGLE_CLIENT_ID!
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!
const sessionSecret = process.env.SESSION_SECRET

fastify.register(cors, {
  origin: '#',
})

fastify.register(fastifyCookie, {
  secret: sessionSecret
})

fastify.register(fastifyOAuth2, {
  name: 'googleOAuth2',
  scope: ['email', 'profile'],
  credentials: {
    client: {
      id: googleClientId,
      secret: googleClientSecret,
    },
    auth: fastifyOAuth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: '/login/google',
  callbackUri: 'http://localhost:3333/login/google/callback'
})

fastify.get('/', async (req, res) => {
  return 'Hello World!'
})

authenticationMiddleware(fastify)
fastify.register(login)
fastify.register(logout)
fastify.register(campaignRoutes)
fastify.register(donationRoutes)
fastify.register(userRoutes)
fastify.register(adminRoutes)
fastify.register(getPublicMetrics)

fastify.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})