import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../lib/firebase';
import fromZodSchema from 'zod-to-json-schema';
import { ClientError } from '../../errors/client-error';
import { FieldValue } from 'firebase-admin/firestore';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.SESSION_SECRET!

const ParamsSchema = z.object({
  campaignId: z.string(),
});

export async function campaignParticipate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/campaigns/:campaignId/participate',
    {
      schema: {
        params: fromZodSchema(ParamsSchema)
      },
    },
    async (request, reply) => {
      const { campaignId } = request.params as z.infer<typeof ParamsSchema>;
      const user = request.headers['user'];

      if (!user) {
        return reply.status(401).send(new ClientError('Erro de autenticação'));
      }

      const userDecoded = jwt.verify(user.toString(), JWT_SECRET) as { userID: string };

      try {
        if (!userDecoded.userID) {
          return reply.status(400).send(new ClientError('ID do usuário está ausente ou inválido'));
        }

        const userRef = db.collection('users').doc(userDecoded.userID);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          return reply.status(404).send(new ClientError('Usuário não encontrado'));
        }

        const userData = userDoc.data();
        if (!userData || userData.role !== 'doador') {
          return reply.status(404).send(new ClientError('Usuário não é um doador'));
        }

        const campaignRef = db.collection('campaigns').doc(campaignId);
        const campaignDoc = await campaignRef.get();

        if (!campaignDoc.exists) {
          return reply.status(404).send(new ClientError('Campanha não encontrada'));
        }

        const campaignData = campaignDoc.data();

        const currentParticipants = Array.isArray(campaignData?.participants_ids)
          ? campaignData.participants_ids
          : [];
        if (currentParticipants.includes(userDecoded.userID)) {
          return reply
            .status(400)
            .send(new ClientError('Usuário já está participando desta campanha'));
        }

        await campaignRef.update({
          participants_ids: FieldValue.arrayUnion(userDecoded.userID), 
          participants: FieldValue.increment(1),
        });

        return reply.status(200).send({ message: 'Usuário adicionado com sucesso à campanha' });
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send(new ClientError('Erro ao adicionar participante à campanha'));
      }
    },
  );
}
