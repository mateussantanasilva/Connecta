import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../../lib/firebase';
import { ClientError } from '../../errors/client-error';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { FieldValue } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const ParamsSchema = z.object({
  donation_id: z.string(),
});

dotenv.config();
const JWT_SECRET = process.env.SESSION_SECRET!;

export async function deleteDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/donations/:donation_id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            donation_id: { type: 'string' },
          },
          required: ['donation_id'],
        },
      },
    },
    async (request, reply) => {
      const { donation_id } = request.params as z.infer<typeof ParamsSchema>;
      const user = request.headers['user'];

      if (!user) {
        return reply.status(401).send(new ClientError('Erro de autenticação'));
      }

      const donation_ref = db.collection('donations').doc(donation_id);
      const donation_doc = await donation_ref.get();

      if (!donation_doc.exists) {
        return reply.status(404).send(new ClientError('Doação não encontrada'));
      }

      const donationData = donation_doc.data();
      if (!donationData) {
        return reply.status(404).send(new ClientError('Dados da doação não encontrados'));
      }

      const { item_name, quantity, measure, campaign_id } = donationData;

      const campaign_ref = db.collection('campaigns').doc(campaign_id);
      const campaign_doc = await campaign_ref.get();

      if (!campaign_doc.exists) {
        return reply.status(404).send(new ClientError('Campanha não encontrada'));
      }

      const campaignData = campaign_doc.data();
      if (!campaignData || !Array.isArray(campaignData.section)) {
        return reply.status(400).send(new ClientError('Dados da campanha estão inválidos'));
      }

      const donationIndex = campaignData.section
        .flatMap((section: { items: any[] }) => section.items)
        .findIndex((item: {
          name: string;
          measure: string;
          amount_donated: number;
          goal: number
        }) =>
          item.name === item_name && item.measure === measure
        );

      if (donationIndex === -1) {
        return reply.status(404).send(new ClientError('Doação não encontrada na campanha'));
      }

      const updatedSections = campaignData.section.map(section => ({
        ...section,
        items: section.items.map((item: {
          name: string;
          measure: string;
          amount_donated: number;
          goal: number;
          status: string
        }) =>
          item.name === item_name && item.measure === measure
            ? {
                ...item,
                amount_donated: Math.max(0, item.amount_donated - quantity), 
                status: item.amount_donated - quantity === 0 ? 'disponível' : item.status, 
              }
            : item
        ),
      }));

      const updatedDonations = campaignData.donations.filter((donation: any) => donation.id_donation !== donation_id);

      await db.collection('campaigns').doc(campaign_id).update({
        section: updatedSections,
        donations: updatedDonations,
      });

      await donation_ref.delete();

      return reply.status(200).send({
        success: true,
        message: 'Doação deletada com sucesso',
        data: { donation_id },
      });
    }
  );
}

