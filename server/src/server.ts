import Fastify from 'fastify'
import fastifyOAuth2 from '@fastify/oauth2'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { db } from './lib/firebase'
import { getCampaigns } from './routes/campaign/get-campaigns'
import { getByIdCampaigns } from './routes/campaign/get-campaign'
import { createCampaign } from './routes/campaign/create-campaign'
import { deleteCampaign } from './routes/campaign/delete-campaign'
import { updateCampaign } from './routes/campaign/update-campaign'
import { createDonation } from './routes/donation/create-donation'
import { getDonations } from './routes/donation/get-donations'
import { getDonationByCampaign } from './routes/donation/get-donation-campaign'
import { updateDonation } from './routes/donation/update-donation'
import { deleteDonation } from './routes/donation/delete-donation'
import { createUser } from './routes/user/create-user'
import { getUsers } from './routes/user/get-users'
import { getUserById } from './routes/user/get-user'
import { updateUser } from './routes/user/update-user'
import { deleteUser } from './routes/user/delete-user'
import { getMetrics } from './routes/admin/get-metrics'
// import { getDonationByUser } from './routes/donation/get-donation-user'

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

fastify.get('/login/google/callback', async (req, res) => {
  try {
    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)
    const accessToken = token.token.access_token

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const userInfo = await userInfoResponse.json()
    const { name, email } = userInfo
    const avatar = userInfo.picture
    const userRef = await db.collection('users').where('email', '==', email).get()
    if (userRef.empty) {
      const newUser = {
        name,
        email,
        avatar,
        role: 'doador'
      }
      await db.collection('users').add(newUser);
    } else {
      const userDoc = userRef.docs[0]
      const userData = userDoc.data()
      if (userData.avatar !== avatar) {
        // Atualiza a foto de perfil se for diferente
        await db.collection('users').doc(userDoc.id).update({
          avatar
        });
      }
    }
    res.setCookie('token', accessToken, { httpOnly: true, path: '/' })
    res.redirect('/')
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    res.status(500).send({ error: 'Não foi possível fazer login' })
  }
})

// Middleware
fastify.addHook('onRequest', async (req, res) => {
  const publicRoutes = ['/login/google', '/login/google/callback', '/logout'] // Rotas públicas
  if (req.routeOptions.url && publicRoutes.includes(req.routeOptions.url)) {
    return
  }
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: 'Usuário não autenticado' })
  }
})

fastify.get('/logout', async (req, res) => {
  res.clearCookie('token', { path: '/' })
  res.redirect('/')
})

fastify.get('/', async (req, res) => {
  return 'Hello World!'
})

fastify.register(getCampaigns)
fastify.register(getByIdCampaigns)
fastify.register(createCampaign)
fastify.register(deleteCampaign)
fastify.register(updateCampaign)
fastify.register(createDonation)
fastify.register(getDonations)
fastify.register(getDonationByCampaign)
// app.register(getDonationByUser)
fastify.register(updateDonation)
fastify.register(deleteDonation)

fastify.register(createUser)
fastify.register(getUsers)
fastify.register(getUserById)
fastify.register(updateUser)
fastify.register(deleteUser)

fastify.register(getMetrics)

fastify.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})