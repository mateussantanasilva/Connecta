import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { db } from "../../lib/firebase"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ClientError } from "../../errors/client-error"

dotenv.config()
const JWT_SECRET = process.env.SESSION_SECRET!
const redirectURL = process.env.PRODUCTION ? 'https://connecta-test.vercel.app' : 'http://localhost:3000'

export async function login(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/login/google/callback', async (req, res) => {
            try {
                const token = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)
                const accessToken = token.token.access_token
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                })
                const userInfo = await userInfoResponse.json()
                const { name, email } = userInfo
                const avatar = userInfo.picture
                const userRef = await db.collection('users').where('email', '==', email).get()
                var userId = ""
                var userRole = "doador"
                if (userRef.empty) {
                    const newUser = {
                    name,
                    email,
                    avatar,
                    role: 'doador'
                    }
                    const newUserRef = await db.collection('users').add(newUser);
                    userId = newUserRef.id
                } else {
                    const userDoc = userRef.docs[0]
                    const userData = userDoc.data()
                    userId = userDoc.id
                    userRole = userData.role
                    if (userData.avatar !== avatar) {
                    // Atualiza a foto de perfil se for diferente
                    await db.collection('users').doc(userId).update({
                        avatar
                    });
                    }
                }
                const userData = (await db.collection('users').doc(userId).get()).data()
                const jwtUser = await jwt.sign({ userId, ...userData }, JWT_SECRET, { expiresIn: '1h' })
                res.setCookie('user', jwtUser, { path: '/', httpOnly: true, secure: true, sameSite: 'none' })
                if(userRole == 'administrador') {
                    return res.redirect(`${redirectURL}/administrador`)
                }
                return res.redirect(`${redirectURL}/perfil`)
            } catch (error) {
                console.error('Erro ao fazer login:', error)
                res.status(500).send(new ClientError('Não foi possível fazer login'))
            }
        }
    )
}