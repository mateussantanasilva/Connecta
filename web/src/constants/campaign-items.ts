import { CampaignSection } from '@/@types/CampaignItem'
import { CAMPAIGNS } from './campaigns'

export const CAMPAIGN_ITEMS: CampaignSection[] = [
  {
    category: 'Alimentação',
    items: [
      {
        id: '1',
        name: 'Arroz',
        goal: 50,
        measure: 'kg',
        status: 'disponível',
        campaign: CAMPAIGNS[0],
      },
      {
        id: '2',
        name: 'Feijão',
        goal: 30,
        measure: 'kg',
        status: 'reservado',
        campaign: CAMPAIGNS[0],
      },
      {
        id: '3',
        name: 'Macarrão',
        goal: 20,
        measure: 'pacotes',
        status: 'concluído',
        campaign: CAMPAIGNS[0],
      },
    ],
  },
  {
    category: 'Vestuário',
    items: [
      {
        id: '5',
        name: 'Cobertores',
        goal: 80,
        measure: 'unidades',
        status: 'concluído',
        campaign: CAMPAIGNS[0],
      },
      {
        id: '6',
        name: 'Casacos',
        goal: 60,
        measure: 'unidades',
        status: 'concluído',
        campaign: CAMPAIGNS[0],
      },
    ],
  },
  {
    category: 'Brinquedos',
    items: [
      {
        id: '10',
        name: 'Bonecas',
        goal: 30,
        measure: 'unidades',
        status: 'disponível',
        campaign: CAMPAIGNS[0],
      },
      {
        id: '11',
        name: 'Carrinhos',
        goal: 40,
        measure: 'unidades',
        status: 'reservado',
        campaign: CAMPAIGNS[0],
      },
    ],
  },
]
