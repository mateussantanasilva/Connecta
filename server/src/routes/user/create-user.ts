import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from "../../errors/client-error"

const UserRole = z.enum(['doador', 'donatário', 'administrador'])

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: UserRole.default('doador')
})

export async function createUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/users',
        {
            schema: {
                body: fromZodSchema(userSchema)
            }
        },
        async (req, res) => {
            const {
                name,
                email,
                role
            } = req.body as z.infer<typeof userSchema>
            try {
                const userData = {
                    name,
                    email,
                    role
                }
                const userRef = await db.collection('users').add(userData)
                if(!userRef) {
                    throw new ClientError("Erro ao cadastrar novo usuário")
                }
                return res.status(201).send({userId: userRef.id})
            } catch(e) {
                console.error(e)
                return res.status(500).send({error:'Server error'})
            }
        }
    )
}