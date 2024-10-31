import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { db } from '../../lib/firebase'
import fromZodSchema from 'zod-to-json-schema'
import { ClientError } from "../../errors/client-error"

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
        '/users/:userID/donee-request',
        {
            schema: {
                body: fromZodSchema(doneeBodySchema),
                params: {
                    type: 'object',
                    properties: {
                        userID: {type:'string'}
                    },
                    required: ['userID']
                }
            }
        },
        async (req, res) => {
            const { userID } = req.params as z.infer<typeof ParamsSchema>
            const {
                telephone,
                address,
                request
            } = req.body as z.infer<typeof doneeBodySchema>
            try {
                const doneeData = {
                    userID,
                    telephone,
                    address,
                    request
                }
                const doneeRef = await db.collection('donee-request').add(doneeData)
                if(!doneeRef) {
                    throw new ClientError("Erro ao solicitar função donatário")
                }
                return res.status(201).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send({error:'Server error'})
            }
        }
    )
}