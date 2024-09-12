/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function getCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/campanhas',
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              collection_point: z.string(),
              //              collection_point: z.array(z.string()),
              description: z.string(),
              observation: z.string(),
              categories: z.string(),
              // categories: z.array(z.string()),
              progress: z.number(),
              status: z.string(),
              // status: z.enum(['Aberta', 'Em_breve', 'Fechada']),
              participants: z.number(),
              started_at: z.date(),
              id_grantee: z.string(),
              grantee: z.object({
                full_name: z.string(),
              }),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      try {
        const campaigns = await prisma.campaign.findMany({
          include: {
            grantee: {
              select: {
                full_name: true,
              },
            },
          },
        })

        if (campaigns.length === 0) {
          throw new ClientError('Sem campanhas no momento!')
        }

        return reply.status(200).send(campaigns)
      } catch (error) {
        return reply.status(500).send()
      }
    },
  )
}