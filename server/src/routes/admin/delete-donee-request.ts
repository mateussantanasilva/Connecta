import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FieldValue } from 'firebase-admin/firestore'

const ParamsSchema = z.object({
    id: z.string(),
})

export async function deleteDoneeRequest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/admin/donee-requests/:id',
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
                const doneeRequestRef = db.collection('donee-request').doc(id)
                const doneeRequestDoc = await doneeRequestRef.get()
                if(!doneeRequestDoc.exists) {
                    return res.status(404).send(new ClientError('Solicitação não encontrada'))
                }
                const userRef = db.collection('users').doc(doneeRequestDoc.data()?.userID)
                if(!(await userRef.get()).exists) {
                    return res.status(404).send(new ClientError(`Solicitação ${doneeRequestDoc.id} com usuário inexistente`))
                }
                await userRef.update({doneeRequested: FieldValue.delete()})
                await doneeRequestRef.delete()
                return res.status(200).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao deletar solicitação'))
            }
        }
    )
}