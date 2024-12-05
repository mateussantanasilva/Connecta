import { z } from 'zod'

export const CATEGORIES = [
  'Alimentação',
  'Vestuário',
  'Higiene',
  'Limpeza',
  'Brinquedos',
  'Educação',
  'Utilidades',
] as const

export const campaignSchema = z.object({
  name: z.string().min(8, {
    message: 'O nome da campanha deve ter pelo menos 8 caracteres.',
  }),
  collection_point: z
    .array(
      z.string().min(10, {
        message: 'O endereço deve ter pelo menos 10 caracteres.',
      }),
    )
    .min(1),
  description: z.string().min(80, {
    message:
      'A descrição deve ter pelo menos 80 caracteres para detalhar a campanha.',
  }),
  observation: z.string().optional(),
})
export type CampaignSchema = z.infer<typeof campaignSchema>
