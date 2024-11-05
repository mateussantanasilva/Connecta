import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { ClientError } from '../errors/client-error'

dotenv.config()
const FIREBASE_KEY = process.env.FIREBASE_KEY

if(!FIREBASE_KEY) {
  throw new ClientError('Credencial do Firebase não encontrada')
}

const firebaseKey = JSON.parse(FIREBASE_KEY)

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
})

export const db = admin.firestore()
