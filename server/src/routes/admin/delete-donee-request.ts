import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const ParamsSchema = z.object({
    id: z.string(),
})

export async function deleteDoneeRequest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/users/donee-request/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        idid: {type:'string'}
                    },
                    required: ['id']
                }
            }
        },
        async (req, res) => {
            const { id } = req.params as z.infer<typeof ParamsSchema>
            try {
                const doneeRequestRef = db.collection('donee-request').doc(id)
                const doneeRequestDoc = await doneeRequestRef.get()
                if(!doneeRequestDoc.exists) {
                    return res.status(404).send(new ClientError('Solicitação não encontrada'))
                }
                await doneeRequestRef.delete()
                return res.status(200).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao deletar solicitação'))
            }
        }
    )
}