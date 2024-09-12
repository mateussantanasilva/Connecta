/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify'
import cors from '@fastify/cors'
import { getCampaigns } from './routes/get-campaigns'
// import { getCampaignsById } from './routes/get-id-campaigns'

const app = fastify()

app.register(cors, {
  origin: '#',
})

app.get('/', async (request, reply) => {
  return 'Hello World!'
})

app.register(getCampaigns)
// app.register(getCampaignsById)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})
