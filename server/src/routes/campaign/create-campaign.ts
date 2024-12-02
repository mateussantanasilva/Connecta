/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'
import { donationStatus } from '../donation/create-donation'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.SESSION_SECRET!

export const CampaignStatus = z.enum(['aberta', 'em breve', 'fechada'])

const itemCampaignSchema = z.object({
  name: z.string().min(1),
  measure: z.string().min(1),
  goal: z.number().min(1),
  amount_donated: z.number().optional().default(0),
  status: z
    .enum(['disponível', 'reservado', 'concluído'])
    .default('disponível'),
})

export const campaignSection = z.object({
  category: z.string().min(1),
  items: z.array(itemCampaignSchema).min(1),
})

export const donationSchema = z.object({
  id_donation: z.string().min(1),
  item_name: z.string().min(1),
  quantity: z.number().min(1),
  measure: z.string().min(1),
  status: donationStatus,
  userID: z.string().min(1),
})

export const campaignSchema = z.object({
  name: z.string().min(1),
  collection_point: z.array(z.string()).min(1),
  description: z.string().min(1),
  observation: z.string().optional(),
  categories: z.array(z.string()).min(1),
  progress: z.number().min(0).max(100),
  status: CampaignStatus,
  participants: z.number().nonnegative(),
  section: z.array(campaignSection).min(1),
  donations: z.array(donationSchema).optional().default([]),
   participants_ids: z.array(z.string()).default([])
})

export async function createCampaign(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/campaigns',
    {
      schema: {
        body: fromZodSchema(campaignSchema),
      },
    },
    async (request, reply) => {
      const {
        name,
        collection_point,
        description,
        observation,
        categories,
        progress,
        status,
        participants,
        section,
        donations,
        participants_ids,
      } = request.body as z.infer<typeof campaignSchema>
      const user = request.headers['user']

      if (!user) {
        return reply.status(401).send(new ClientError('Erro de autenticação'))
      }

      const userDecoded = jwt.verify(user.toString(), JWT_SECRET) as { userId: string }
      const userSnapshot = await db.collection('users').doc(userDecoded.userId).get()
      const userData = userSnapshot.data()
      try {
        const campaignData = {
          name,
          collection_point,
          description,
          observation,
          categories,
          progress,
          status,
          participants,
          started_at: new Date().toISOString(),
          section,
          donations,
          participants_ids,
        }

     //  if (userData?.role == 'doador') {
       //  return reply.status(403).send(new ClientError('Ação não autorizada para este usuário'))
       // }
        
        const campaignRef = await db.collection('campaigns').add(campaignData)

        if (!campaignRef) {
          return reply.status(503).send(new ClientError('Erro ao criar campanha'))
        }

        return reply.status(201).send(campaignData)
      } catch (error) {
        console.error(error)
        return reply.status(500).send(new ClientError('Erro ao criar campanha'))
      }
    },
  )
}
