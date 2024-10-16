import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { db } from "../../lib/firebase"
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from "../../errors/client-error"

const UserRole = z.enum(['doador', 'donatário', 'administrador'])

const userSchema = z.object({
    name: z.string(),
    telephone: z.string().min(11).max(11),
    address: z.string()
})

const ParamsSchema = z.object({
    id: z.string(),
})

export async function updateUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put(
        '/users/:id',
        {
            schema: {
                params: fromZodSchema(ParamsSchema),
                body: fromZodSchema(userSchema)
            }
        },
        async (req, res) => {
            const {id} = req.params as z.infer<typeof ParamsSchema>
            const {
                name,
                telephone,
                address
            } = req.body as z.infer<typeof userSchema>
            try {
                const userRef = db.collection('users').doc(id)
                const userDoc = await userRef.get()
                if(!userDoc.exists) {
                    throw new ClientError("Usuário não encontrao")
                }
                const updatedUser = {
                    name,
                    telephone,
                    address
                }
                await userRef.update(updatedUser)
                return res.status(200).send({id})
            } catch(e) {
                console.error(e)
                return res.status(500).send()
            }
        }
    )
}