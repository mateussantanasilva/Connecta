import fastify from 'fastify'
import cors from '@fastify/cors'
import { getCampaigns } from './routes/get-campaigns'
import { getByIdCampaigns } from './routes/get-campaign'
import { createCampaign } from './routes/create-campaign'
import { deleteCampaign } from './routes/delete-campaign'
import { updateCampaign } from './routes/update-campaign'

const app = fastify()

app.register(cors, {
  origin: '#',
})

app.get('/', async (request, reply) => {
  return 'Hello World!'
})

app.register(getCampaigns)
app.register(getByIdCampaigns)
app.register(createCampaign)
app.register(deleteCampaign)
app.register(updateCampaign)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})
