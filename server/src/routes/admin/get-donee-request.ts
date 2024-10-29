import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'

const ParamsSchema = z.object({
    id: z.string()
})

export async function getDoneeRequest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/users/donee-requests/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: {type:'string'}
                    },
                    required: ['id']
                }
            }
        },
        async (req, res) => {
            try {
                const { id } = req.params as z.infer<typeof ParamsSchema>
                const doneeRequestSnapshot = await db.collection('donee-request').doc(id).get()

                if(!doneeRequestSnapshot.exists) {
                    throw new ClientError(`Solicitação ${doneeRequestSnapshot.id} inexistente`)
                }

                const data = doneeRequestSnapshot.data()
                const userSnapshot = await db.collection('users').doc(data?.userID).get()

                if(!userSnapshot.exists) {
                    throw new ClientError(`Solicitação ${doneeRequestSnapshot.id} com usuário inexistente`)
                }
                    
                const userData = userSnapshot.data()
                const request = {
                    id: doneeRequestSnapshot.id,
                    name: userData?.name,
                    email: userData?.email,
                    avatar: userData?.avatar,
                    telephone: data?.telephone,
                    address: data?.address,
                    request: data?.request
                }
                return res.status(200).send(request)
            } catch(e) {
                console.error(e)
                return res.status(500).send()
            }
        }
    )
}