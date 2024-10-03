import fastify from 'fastify'
import cors from '@fastify/cors'
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
// import { getDonationByUser } from './routes/donation/get-donation-user'

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
app.register(createDonation)
app.register(getDonations)
app.register(getDonationByCampaign)
// app.register(getDonationByUser)
app.register(updateDonation)
app.register(deleteDonation)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})
