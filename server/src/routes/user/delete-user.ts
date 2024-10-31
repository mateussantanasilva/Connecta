import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
    id: z.string(),
})

export async function deleteUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
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
                const userRef = db.collection('users').doc(id)
                const userDoc = await userRef.get()
                if(!userDoc.exists) {
                    return res.status(404).send(new ClientError('Usuário não encontrado'))
                }
                await userRef.delete()
                return res.status(200).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao deletar usuário'))
            }
        }
    )
}