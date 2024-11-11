import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export async function logout(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/logout', async (req, res) => {
            res.clearCookie('token', { path: '/', httpOnly: true, secure: true, sameSite: 'none' })
            res.clearCookie('user', { path: '/', httpOnly: true, secure: true, sameSite: 'none' })
            return res.redirect('https://connecta-test.vercel.app/')
        }
    )
}
