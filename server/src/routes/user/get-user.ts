import { FastifyInstance } from 'fastify'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
    id: z.string()
})

export async function getUserById(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/users/:id',
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
            const { id } = req.params as z.infer<typeof ParamsSchema>
            try {
                const userDoc = await db.collection('users').doc(id).get()
                if(!userDoc.exists) {
                    return res.status(404).send(new ClientError("Usuário não encontrado"))
                }
                const user = {userID: userDoc.id, ...userDoc.data()}
                return res.status(200).send(user)
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError("Erro ao buscar usuário"))
            }
        }
    )
}