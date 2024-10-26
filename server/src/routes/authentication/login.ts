import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { db } from "../../lib/firebase"

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
                    if (userData.avatar !== avatar) {
                    // Atualiza a foto de perfil se for diferente
                    await db.collection('users').doc(userId).update({
                        avatar
                    });
                    }
                }
                res.setCookie('token', accessToken, { httpOnly: true, path: '/' })
                res.status(201).send({userId: userId})
            } catch (error) {
                console.error('Erro ao fazer login:', error)
                res.status(500).send({ error: 'Não foi possível fazer login' })
            }
        }
    )
}
