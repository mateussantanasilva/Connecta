import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'

const UserRole = z.enum(['doador', 'donatário', 'administrador'])

export async function getUsers(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/users',
        {
            schema: {
                response: {
                    200: z.array(
                        z.object({
                            id: z.string(),
                            name: z.string(),
                            email: z.string(),
                            avatar: z.string(),
                            role: UserRole,
                            telephone: z.string(),
                            address: z.string()
                        })
                    )
                }
            }
        },
        async (req, res) => {
            try {
                const usersSnapshot = await db.collection('users').get()
                const users = usersSnapshot.docs.map((doc) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        avatar: data.avatar,
                        role: data.role,
                        telephone: data.telephone,
                        address: data.address
                    }
                })
                return res.status(200).send(users)
            } catch(e) {
                console.error(e)
                return res.status(500).send()
            }
        }
    )
}