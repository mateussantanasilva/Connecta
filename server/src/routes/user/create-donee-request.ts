import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from "../../errors/client-error"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.SESSION_SECRET!

const doneeBodySchema = z.object({
    telephone: z.string(),
    address: z.string(),
    request: z.string()
})

const ParamsSchema = z.object({
    userID: z.string()
})

export async function createDoneeRequest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/users/donee-request',
        {
            schema: {
                body: fromZodSchema(doneeBodySchema),
            }
        },
        async (req, res) => {
            const user = req.headers['user']
            if (!user) {
                return res.status(401).send(new ClientError('Erro de autenticação'))
            }
            const userDecoded = jwt.verify(user.toString(), JWT_SECRET) as { userId: string }
            const userID = userDecoded.userId
            const {
                telephone,
                address,
                request
            } = req.body as z.infer<typeof doneeBodySchema>
            try {
                const userDoc = await db.collection('users').doc(userID).get()
                if(!userDoc.exists) {
                    res.status(404).send(new ClientError("Usuário não encontrado"))
                }
                const createdAt = new Date().toISOString()
                const doneeData = {
                    userID,
                    telephone,
                    address,
                    request,
                    createdAt
                }
                const doneeRef = await db.collection('donee-request').add(doneeData)
                if(!doneeRef) {
                    res.status(400).send(new ClientError("Erro ao solicitar função donatário"))
                }
                return res.status(201).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError("Erro ao solicitar função donatário"))
            }
        }
    )
}