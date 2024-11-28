import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'

const ParamsSchema = z.object({
    id: z.string()
})

export async function getAcceptDoneeRequest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/donee-requests/:id/accept',
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
            // Ao aceitar uma solicitação para se tornar donatário, o usuário é atualizado para a role donatário e a solicitação é excluída
            try {
                const { id } = req.params as z.infer<typeof ParamsSchema>
                const doneeRequestRef = await db.collection('donee-request').doc(id)
                const doneeRequestSnapshot = await doneeRequestRef.get()
                if(!doneeRequestSnapshot.exists) {
                    return res.status(404).send(new ClientError(`Solicitação ${doneeRequestSnapshot.id} inexistente`))
                }
                const data = doneeRequestSnapshot.data()
                const userRef = await db.collection('users').doc(data?.userID)
                if(!(await userRef.get()).exists) {
                    return res.status(404).send(new ClientError(`Solicitação ${doneeRequestSnapshot.id} com usuário inexistente`))
                }
                const updatedDoneeUser = {
                    role: 'donatário',
                    telephone: data?.telephone,
                    address: data?.address,
                    doneeRequested: FieldValue.delete(),
                    doneeAccepted: new Date().toISOString(),
                    doneeStatus: 'ativo'
                }
                await userRef.update(updatedDoneeUser)
                await doneeRequestRef.delete()
                return res.status(200).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao aceitar solicitação'))
            }
        }
    )
}