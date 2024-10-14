/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'
import { donationStatus } from '../donation/create-donation'

const CampaignStatus = z.enum(['aberta', 'em breve', 'fechada'])

const itemCampaignSchema = z.object({
  name: z.string().min(1),
  measure: z.string().min(1),
  goal: z.number().min(1),
  amount_donated: z.number().optional().default(0),
  status: z
    .enum(['disponível', 'reservado', 'concluído'])
    .default('disponível'),
})

const donationSchema = z.object({
  id_donation: z.string().min(1),
  item_name: z.string().min(1),
  quantity: z.number().min(1),
  measure: z.string().min(1),
  status: donationStatus,
})

const campaignSchema = z.object({
  name: z.string().min(1),
  collection_point: z.array(z.string()).min(1),
  description: z.string().min(1),
  observation: z.string().optional(),
  categories: z.array(z.string()).min(1),
  progress: z.number().min(0).max(100),
  status: CampaignStatus,
  participants: z.number().nonnegative(),
  started_at: z.string().min(1),
  goal: z.number().min(1),
  items: z.array(itemCampaignSchema).min(1),
  donations: z.array(donationSchema).optional().default([]),
  grantee_name: z.string(),
  grantee_email: z.string().email(),
  grantee_user_type: z.string().optional().default('grantee'),
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
        started_at,
        goal,
        items,
        donations,
        grantee_name,
        grantee_email,
        grantee_user_type,
      } = request.body as z.infer<typeof campaignSchema>

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
          started_at: new Date(started_at),
          goal,
          items,
          donations,
          grantee: {
            full_name: grantee_name,
            email: grantee_email,
            user_type: grantee_user_type,
          },
        }

        const campaignRef = await db.collection('campaigns').add(campaignData)

        if (!campaignRef) {
          throw new ClientError('Erro ao criar campanha!')
        }

        return reply.status(201).send({ campaignId: campaignRef.id })
      } catch (error) {
        console.error(error)
        return reply.status(500).send({ error: 'Server error' })
      }
    },
  )
}
