import { DonationItem } from '@/@types/DonationItem'
import { CAMPAIGNS } from './campaigns'

export const DONATION_ITEMS: DonationItem[] = [
  {
    id: '1',
    name: 'Pacote de arroz',
    quantity: 3,
    measure: 'kg',
    status: 'pendente',
    campaign: CAMPAIGNS[0],
  },
  {
    id: '2',
    name: 'Blusa de frio',
    quantity: 1,
    measure: 'unidade',
    status: 'pendente',
    campaign: CAMPAIGNS[1],
  },
  {
    id: '3',
    name: 'Pacote de macarrão',
    quantity: 5,
    measure: 'pacotes',
    status: 'pendente',
    campaign: CAMPAIGNS[2],
  },
  {
    id: '4',
    name: 'Pacote de feijão',
    quantity: 2,
    measure: 'kg',
    status: 'confirmada',
    campaign: CAMPAIGNS[0],
  },
  {
    id: '5',
    name: 'Cobertor',
    quantity: 2,
    measure: 'unidades',
    status: 'confirmada',
    campaign: CAMPAIGNS[1],
  },
  {
    id: '6',
    name: 'Cesta básica',
    quantity: 1,
    measure: 'unidade',
    status: 'confirmada',
    campaign: CAMPAIGNS[2],
  },
]
