import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../lib/firebase'
import { ClientError } from '../../errors/client-error'

const UserRole = z.enum(['doador', 'donatário', 'administrador'])

export async function getDonees(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/admin/donees',
        {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', minimum: 1, default: 1 },
                        limit: { type: 'number', minimum: 1, default: 8 },
                        filterBy: { type: 'string', default: '' },
                        filterValue: { type: 'string', default: '' }
                    },
                }
            }
        },
        async (req, res) => {
            const { page, limit, filterBy, filterValue } = req.query as { page: number; limit: number; filterBy: string; filterValue: string }
            try {
                const doneesSnapshot = await db.collection('users').where('role', '==', 'donatário').get()
                let doneesData = doneesSnapshot.docs.map((doc) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        avatar: data.avatar,
                        role: data.role,
                        telephone: data.telephone,
                        address: data.address
                    }
                })

                const filterIsValid = (key: string): key is keyof typeof doneesData[0] => {
                    return key in doneesData[0]
                }
                if (filterBy && filterValue && filterIsValid(filterBy)) {
                    doneesData = doneesData.filter(donee =>
                        donee[filterBy]?.toLowerCase().includes(filterValue.toLowerCase())
                    )
                }

                const startIndex = (page - 1) * limit
                const endIndex = startIndex + limit
                const donees = doneesData.slice(startIndex, endIndex)

                const totalResponses = doneesSnapshot.size
                const responseSchema = {
                    page,
                    limit,
                    totalResponses,
                    donees
                }

                return res.status(200).send(responseSchema)
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao buscar todos os donatários'))
            }
        }
    )
}