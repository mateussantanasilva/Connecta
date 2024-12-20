/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../../lib/firebase';
import fromZodSchema from 'zod-to-json-schema';
import { ClientError } from '../../errors/client-error';

const ParamsSchema = z.object({
  donation_id: z.string(),
});

export async function updateAcceptDonation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/admin/donations/:donation_id',
    {
      schema: {
        params: fromZodSchema(ParamsSchema),
      },
    },
    async (request, reply) => {
      const { donation_id } = request.params as z.infer<typeof ParamsSchema>;

      try {
        const donationRef = db.collection('donations').doc(donation_id);
        const donationDoc = await donationRef.get();

        if (!donationDoc.exists) {
          return reply.status(404).send(new ClientError('Doação não encontrada'));
        }

        const donationData = donationDoc.data();
        if (!donationData) {
          return reply.status(404).send(new ClientError('Dados da doação não encontrados'));
        }

        const { campaign_id, item_name } = donationData;
        const status = 'confirmada';

        await donationRef.update({ status });

        const campaignRef = db.collection('campaigns').doc(campaign_id);
        const campaignDoc = await campaignRef.get();

        if (!campaignDoc.exists) {
          return reply.status(404).send(new ClientError('Campanha não encontrada'));
        }

        const campaignData = campaignDoc.data();
        if (!campaignData) {
          return reply.status(404).send(new ClientError('Dados da campanha não encontrados'));
        }

        const updatedDonations = Array.isArray(campaignData.donations)
          ? campaignData.donations.map((donation: any) => {
              if (donation.id_donation === donation_id) {
                return { ...donation, status };
              }
              return donation;
            })
          : [];

        await campaignRef.update({ donations: updatedDonations });

        const itemDonations = updatedDonations.filter(
          (donation: any) => donation.item_name === item_name
        );

        const allConfirmed = itemDonations.every(
          (donation: any) => donation.status === 'confirmada'
        );

        if (allConfirmed) {
          const updatedSections = Array.isArray(campaignData.section)
            ? campaignData.section.map((section: any) => {
                const updatedItems = Array.isArray(section.items)
                  ? section.items.map((item: any) => {
                      if (item.name === item_name) {
                        return { ...item, status: 'concluido' };
                      }
                      return item;
                    })
                  : [];

                return { ...section, items: updatedItems };
              })
            : [];

          await campaignRef.update({ section: updatedSections });

          const allItems = updatedSections.flatMap((section: any) => section.items);
          const totalItems = allItems.length;
          const completedItems = allItems.filter(
            (item: any) => item.status === 'concluido'
          ).length;

          const progressPercentage = (completedItems / totalItems) * 100;
          await campaignRef.update({ progress: progressPercentage });

          const allItemsCompleted = allItems.every(
            (item: any) => item.status === 'concluido'
          );
          if (allItemsCompleted) {
            await campaignRef.update({ status: 'fechada' });
          }
        }

        return reply.status(200).send({ message: 'Doação confirmada com sucesso!' });
      } catch (error) {
        console.error(error);
        return reply.status(500).send(new ClientError('Erro ao atualizar a doação'));
      }
    }
  );
}
