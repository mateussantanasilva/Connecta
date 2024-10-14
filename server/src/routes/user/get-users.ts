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
                            surname: z.string(),
                            email: z.string(),
                            role: UserRole,
                            telephone: z.string(),
                            cpf: z.string(),
                            cep: z.string()
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
                        surname: data.surname,
                        email: data.email,
                        role: data.role,
                        telephone: data.telephone,
                        cpf: data.cpf,
                        cep: data.cep
                    }
                })
                if(users.length === 0) {
                    throw new ClientError("Não há usuários cadastrados!")
                }
                return res.status(200).send(users)
            } catch(e) {
                console.error(e)
                return res.status(500).send()
            }
        }
    )
}