import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { db } from "../../lib/firebase"
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from "../../errors/client-error"
import { FieldValue } from "firebase-admin/firestore"

const ParamsSchema = z.object({
    id: z.string(),
})

export async function getDonorRole(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/users/:id/donor-role',
        {
            schema: {
                params: fromZodSchema(ParamsSchema)
            }
        },
        async (req, res) => {
            const {id} = req.params as z.infer<typeof ParamsSchema>
            try {
                const userRef = db.collection('users').doc(id)
                const userDoc = await userRef.get()
                const userData = userDoc.data()
                if(!userDoc.exists) {
                    return res.status(404).send(new ClientError("Usuário não encontrado"))
                }
                
                const updatedUser = {
                    name: userData?.name,
                    email: userData?.email,
                    avatar: userData?.avatar,
                    address: FieldValue.delete(),
                    telephone: FieldValue.delete(),
                    doneeAccepted: FieldValue.delete(),
                    doneeStatus: 'inativo',
                    role: 'doador'
                }

                await userRef.update(updatedUser)
                return res.status(200).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError("Erro ao solicitar função doador"))
            }
        }
    )
}