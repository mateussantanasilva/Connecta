import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

/* export async function getCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/campanhas')
} */
