import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'

export async function getDoneeRequests(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/donee-requests',
        {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', minimum: 1, default: 1 },
                        limit: { type: 'number', minimum: 1, default: 8 },
                        filterBy: { type: 'string', default: '' },
                        filterValue: { type: 'string', default: '' }
                    },
                },
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
            const { page, limit, filterBy, filterValue } = req.query as { page: number; limit: number; filterBy: string; filterValue: string }
            try {
                const doneeRequestsSnapshot = await db.collection('donee-request').get()
                let requests = await Promise.all(doneeRequestsSnapshot.docs.map(async (doc) => {
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

                const filterIsValid = (key: string): key is keyof typeof requests[0] => {
                    return key in requests[0]
                }
                if (filterBy && filterValue && filterIsValid(filterBy)) {
                    requests = requests.filter(request =>
                        request[filterBy]?.toLowerCase().includes(filterValue.toLowerCase())
                    )
                }

                const startIndex = (page - 1) * limit
                const endIndex = startIndex + limit
                const paginatedRequests = requests.slice(startIndex, endIndex)

                return res.status(200).send(paginatedRequests)
            } catch(e) {
                console.error(e)
                return res.status(500).send()
            }
        }
    )
}