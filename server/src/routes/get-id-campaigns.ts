/* eslint-disable prettier/prettier */
/* import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function getByIdCampaigns(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/campanhas/:campaignId', 
    {
      schema: {
        params: z.object({
          campaignId: z.string().uuid(), 
        }),
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (request, reply) => {
      const { campaignId } = request.params 

      const campaign = await prisma.campaign.findUnique({
        select: {
          id: true,
          name: true,
          collection_point: true,
          description: true,
          observation: true,
          categories: true,
          progress: true,
          status: true,
          participants: true,
          started_at: true,
          grantee: true,
          id_grantee: true,
        },
        where: { id: campaignId }, 
      })

      if (!campaign) {
        throw new ClientError('Campanha não encontrada') 
      }

      return { campaign } 
    }
  )
}
*/