import { SquareCheck, X } from 'lucide-react'
import { Button } from '../button'

export function MyDonations() {
  const donations = [
    {
      id: '1',
      item: 'Pacote de arroz',
      amount: '3kg',
      campaign: 'Multirão de Natal',
      status: 'Pendente',
    },
    {
      id: '2',
      item: 'Pacote de arroz',
      amount: '3kg',
      campaign: 'Multirão de Natal',
      status: 'Confirmada',
    },
  ]

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold text-zinc-800">Minhas Doações</h2>

      <header className="flex w-full gap-5 px-5 text-center text-sm uppercase text-zinc-800">
        <strong className="max-w-56 flex-1 text-start font-medium">Item</strong>
        <strong className="flex-1 font-medium">Campanha</strong>
        <strong className="max-w-48 flex-1 font-medium">Status</strong>
        <strong className="max-w-20 flex-1 font-medium">Ação</strong>
      </header>

      <div
        className={`max-h-96 space-y-2 pb-1 ${donations.length > 4 && 'overflow-y-scroll'}`}
      >
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="flex items-center gap-5 rounded-2xl p-5 text-center text-sm shadow"
          >
            <div className="flex max-w-56 flex-1 flex-col text-start">
              <span>{donation.item}</span>
              <span>{donation.amount}</span>
            </div>

            <span className="flex-1">{donation.campaign}</span>

            <div className="flex max-w-48 flex-1 justify-center">
              <span
                className={`w-24 rounded-lg border px-2 py-1 text-xs font-medium ${donation.status === 'Confirmada' ? 'border-green-600 text-green-600' : 'border-orange-600 text-orange-600'}`}
              >
                {donation.status}
              </span>
            </div>

            <div className="flex max-w-20 flex-1 justify-center">
              {donation.status === 'Confirmada' ? (
                <SquareCheck className="size-5 shrink-0 text-green-600" />
              ) : (
                <Button size="xs" variant="danger">
                  <X className="size-5 shrink-0" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
