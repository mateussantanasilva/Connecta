import { Campaign } from '@/@types/Campaign'

export const CAMPAIGNS: Campaign[] = [
  {
    id: '2',
    name: 'Campanha do Agasalho',
    description:
      'Arrecadação de agasalhos e cobertores para enfrentar o inverno. Doe calor a quem precisa!',
    observation:
      'Aceitamos apenas itens em bom estado, limpos e prontos para uso.',
    categories: ['Vestuário'],
    collection_points: ['Praça da Sé, 123 - Centro', 'R. São Bento, 200 - Sé'],
    progress: 60,
    status: 'em breve',
    participants: 0,
  },
  {
    id: '6',
    name: 'Material Escolar para Todos',
    description:
      'Arrecadação de materiais escolares para crianças carentes. Ajude a equipar um estudante para o sucesso!',
    observation:
      'Aceitamos materiais novos ou em bom estado, como mochilas, cadernos, lápis e canetas.',
    categories: ['Educação'],
    collection_points: [
      'Av. Faria Lima, 4321 - Itaim Bibi',
      'R. Brigadeiro Faria Lima, 600 - Pinheiros',
    ],
    progress: 30,
    status: 'em breve',
    participants: 20,
  },
  {
    id: '5',
    name: 'Sopão Solidário',
    description:
      'Distribuição de sopas para pessoas em situação de rua. Venha ajudar a aquecer corações e estômagos!',
    observation:
      'As sopas serão preparadas em locais credenciados e seguindo normas de higiene.',
    categories: ['Alimentação'],
    collection_points: [
      'R. Augusta, 987 - Jardim Paulista',
      'R. Oscar Freire, 567 - Pinheiros',
    ],
    progress: 90,
    status: 'aberta',
    participants: 200,
    started_at: '2024-09-05T17:00:00.000Z',
  },
  {
    id: '3',
    name: 'Cesta Solidária',
    description:
      'Arrecadação de cestas básicas para famílias em situação de vulnerabilidade. Juntos, podemos ajudar!',
    observation:
      'Itens da cesta básica devem estar dentro do prazo de validade.',
    categories: ['Alimentação'],
    collection_points: [
      'R. Vergueiro, 456 - Liberdade',
      'Av. Paulista, 1578 - Bela Vista',
    ],
    progress: 45,
    status: 'aberta',
    participants: 50,
    started_at: '2024-09-03T17:00:00.000Z',
  },
  {
    id: '1',
    name: 'Mutirão de Natal',
    description:
      'Ajude-nos a arrecadar alimentos e roupas de inverno para famílias carentes neste Natal. Sua contribuição será bem-vinda!',
    categories: ['Alimentação', 'Vestuário'],
    collection_points: [
      'Av. Águia de Haia, 2983 - Cidade Antônio Estêvão de Carvalho',
      'R. Prof. Alves Pedroso, 600 - Cangaiba',
    ],
    progress: 75,
    status: 'aberta',
    participants: 100,
    started_at: '2024-09-01T17:00:00.000Z',
  },
  {
    id: '4',
    name: 'Doe Brinquedos',
    description:
      'Arrecadação de brinquedos para crianças carentes neste Dia das Crianças. Vamos levar alegria para os pequenos!',
    observation:
      'Os brinquedos devem estar em boas condições e sem peças quebradas.',
    categories: ['Brinquedos'],
    collection_points: [
      'R. da Consolação, 1234 - Consolação',
      'Av. Ipiranga, 1500 - República',
    ],
    progress: 80,
    status: 'fechada',
    participants: 150,
    started_at: '2024-08-01T14:30:00.000Z',
  },
]
