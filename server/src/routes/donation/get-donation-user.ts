/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
  user_id: z.string().min(1),
})

export async function getDonationByUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/donations/:user_id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        user_id: { type: 'string' },
                    },
                    required: ['user_id'],
                },
            },
        },
        async (request, reply) => {
            try {
                const { user_id } = request.params as z.infer<typeof ParamsSchema>

                const user_doc = await db.collection('users').doc(user_id).get()

                if (!user_doc.exists) {
                    throw new ClientError('Usuário não encontrada')
                }

                const donationsSnapshot = await db
                    .collection('donations')
                    .where('user_id', '==', user_id)
                    .get();

                const donations = donationsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (donations.length === 0) {
                    throw new ClientError('Usuário sem doações no momento!')
                }

                return reply.status(200).send(donations)
            } catch (error) {
                console.error(error)
                return reply.status(500).send()
            }
        })
}
