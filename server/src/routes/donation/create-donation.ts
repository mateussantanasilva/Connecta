/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../lib/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import fromZodSchema from 'zod-to-json-schema';
import { ClientError } from '../../errors/client-error';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.SESSION_SECRET!;

export const donationStatus = z.enum(['pendente', 'confirmada', 'cancelada']);

export const donationSchema = z.array(
  z.object({
    item_name: z.string().min(1),
    quantity: z.number().min(1),
    measure: z.string().min(1),
    campaign_id: z.string().min(1),
  }),
);

export async function createDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/donations',
    {
      schema: {
        body: fromZodSchema(donationSchema),
      },
    },
    async (request, reply) => {
      const donations = request.body as z.infer<typeof donationSchema>;
      const user = request.headers['user'];

      if (!user) {
        return reply.status(401).send(new ClientError('Erro de autenticação'));
      }

      const userDecoded = jwt.verify(user.toString(), JWT_SECRET) as { userId: string };

      const userSnapshot = await db.collection('users').doc(userDecoded.userId).get();
      const userData = userSnapshot.data();

      if (!userData) {
        return reply.status(401).send(new ClientError('Usuário não encontrado'));
      }

      if (userData.role !== 'doador') {
        return reply.status(403).send(new ClientError('Ação não autorizada para este usuário'));
      }

      const userId = userDecoded.userId;

      try {
        const donationResponses: any[] = [];

        for (const donation of donations) {
          const { item_name, quantity, measure, campaign_id } = donation;

          const campaignRef = await db.collection('campaigns').doc(campaign_id).get();

          if (!campaignRef.exists) {
            return reply.status(404).send(new ClientError(`Campanha ${campaign_id} não encontrada`));
          }

          const campaignData = campaignRef.data();
          if (!campaignData) {
            return reply
              .status(404)
              .send(new ClientError(`Dados da campanha ${campaign_id} não encontrados`));
          }

          const itemExists = campaignData.section?.flatMap(
            (section: { items: { name: string; measure: string }[] }) => section.items,
          ).find(
            (item: { name: string; measure: string }) =>
              item.name === item_name && item.measure === measure,
          );

          const itemStatus = campaignData.section?.flatMap(
            (section: { items: { status: string }[] }) => section.items,
          ).find((item: { status: string }) => item.status === 'disponível');

          if (!itemExists) {
            return reply
              .status(400)
              .send(
                new ClientError(
                  `Item ${item_name} com medida ${measure} não encontrado na campanha ${campaign_id}`,
                ),
              );
          }

          if (!itemStatus) {
            return reply
              .status(400)
              .send(
                new ClientError(
                  `Item ${item_name} com medida ${measure} não está disponível para doação`,
                ),
              );
          }

          const currentAmountDonated = itemExists.amount_donated || 0;
          const updatedAmountDonated = currentAmountDonated + quantity;
          const remainingGoal = itemExists.goal - updatedAmountDonated;

          if (remainingGoal < 0) {
            return reply.status(400).send(
              new ClientError(
                `A doação para o item ${item_name} excede o objetivo da campanha ${campaign_id}`,
              ),
            );
          }

          const donationData = {
            item_name,
            quantity,
            campaign_id,
            status: 'pendente',
            measure,
            donation_date: new Date().toISOString(),
          };

          const donationRef = await db.collection('donations').add(donationData);
          const donationId = donationRef.id;

          const updatedDonationData = {
            ...donationData,
            id_donation: donationId,
          };

          const updatedSections = campaignData.section?.map(
            (section: {
              items: {
                name: string;
                measure: string;
                amount_donated?: number;
                goal: number;
                status?: string;
              }[];
            }) => ({
              ...section,
              items: section.items.map(
                (item: {
                  name: string;
                  measure: string;
                  amount_donated?: number;
                  goal: number;
                  status?: string;
                }) =>
                  item.name === item_name && item.measure === measure
                    ? {
                        ...item,
                        amount_donated: updatedAmountDonated,
                        status: updatedAmountDonated === item.goal ? 'concluida' : item.status,
                      }
                    : item,
              ),
            }),
          );

          await db.collection('campaigns').doc(campaign_id).update({
            section: updatedSections,
            donations: FieldValue.arrayUnion(updatedDonationData),
            participants_ids: FieldValue.arrayUnion(userId),
          });

          donationResponses.push(updatedDonationData);
        }

        return reply.status(201).send(donationResponses);
      } catch (error) {
        console.error(error);
        return reply.status(500).send(new ClientError('Erro ao processar doações'));
      }
    },
  );
}
