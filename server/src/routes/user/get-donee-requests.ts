import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'

export async function getDoneeRequests(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/users/donee-requests',
        {
            schema: {
                response: {
                    200: z.array(
                        z.object({
                            id: z.string(),
                            name: z.string(),
                            email: z.string(),
                            avatar: z.string(),
                            telephone: z.string(),
                            address: z.string(),
                            request: z.string()
                        })
                    )
                }
            }
        },
        async (req, res) => {
            try {
                const doneeRequestsSnapshot = await db.collection('donee-request').get()
                const requests = await Promise.all(doneeRequestsSnapshot.docs.map(async (doc) => {
                    const data = doc.data()
                    const userSnapshot = await db.collection('users').doc(data.userID).get()

                    if(!userSnapshot.exists) {
                        throw new ClientError(`Solicitação ${doc.id} com usuário inexistente`)
                    }
                    const userData = userSnapshot.data()
                    return {
                        id: doc.id,
                        name: userData?.name,
                        email: userData?.email,
                        avatar: userData?.avatar,
                        telephone: data.telephone,
                        address: data.address,
                        request: data.request
                    }
                }))
                if(requests.length === 0) {
                    throw new ClientError("Não há solicitações no momento!")
                }
                return res.status(200).send(requests)
            } catch(e) {
                console.error(e)
                return res.status(500).send()
            }
        }
    )
}