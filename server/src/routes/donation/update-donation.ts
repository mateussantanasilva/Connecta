/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from '../../errors/client-error'
import { donationStatus  } from './create-donation'

const donationSchema = z.object({
  item_name: z.string().min(1),
  quantity: z.number().min(1),
  measure: z.string().min(1),
  status: donationStatus,
//  user_id: z.string().min(1),
})

const ParamsSchema = z.object({
  donation_id: z.string(),
})

export async function updateDonation(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put(
        '/donations/:donation_id',
        {
            schema: {
                params: fromZodSchema(ParamsSchema),
                body: fromZodSchema(donationSchema),
            },
        },
        async (request, reply) => {
            const { donation_id } = request.params as z.infer<typeof ParamsSchema>
            const {
                item_name,
                quantity,
                measure,
                status,
                // user_id,
            } = request.body as z.infer<typeof donationSchema>

            try {
                const donation_ref = db.collection('donations').doc(donation_id)
                const donation_doc = await donation_ref.get()

                if (!donation_doc.exists) {
                    throw new ClientError('Doação não encontrada')
                }

                const updatedDonationData = {
                    item_name,
                    quantity,
                    measure,
                    status,
                    // user_id,
          
                }

                await donation_ref.update(updatedDonationData)

                return reply.send({ donation_id })
            } catch (error) {
                console.error(error)
                return reply
                    .status(500)
                    .send(new ClientError('Erro ao atualizar doação'))
            }
        }
    )
}
