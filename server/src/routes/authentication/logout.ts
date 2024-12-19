import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import dotenv from 'dotenv'

dotenv.config()
const redirectURL = process.env.PRODUCTION ? 'https://connectaapp.vercel.app' : 'http://localhost:3000'

export async function logout(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/logout', async (req, res) => {
            res.clearCookie('user', { path: '/', httpOnly: true, secure: true, sameSite: 'none' })
            return res.redirect(`${redirectURL}/`)
        }
    )
}
