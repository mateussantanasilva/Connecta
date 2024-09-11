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

      <div className="space-y-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        <header className="flex w-full gap-5 px-5 text-center text-sm uppercase text-zinc-800">
          <strong className="min-w-48 max-w-56 flex-1 text-start font-medium">
            Item
          </strong>
          <strong className="min-w-48 flex-1 font-medium">Campanha</strong>
          <strong className="min-w-48 flex-1 font-medium">Status</strong>
          <strong className="min-w-20 flex-1 font-medium sm:max-w-20">
            Ação
          </strong>
        </header>

        <div
          className={`max-h-96 space-y-2 pb-1 [&::-webkit-scrollbar]:hidden ${donations.length > 4 && 'overflow-y-scroll'}`}
        >
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="flex min-w-fit items-center gap-5 rounded-2xl p-5 text-center text-sm shadow"
            >
              <div className="flex min-w-48 max-w-56 flex-1 flex-col text-start">
                <span>{donation.item}</span>
                <span>{donation.amount}</span>
              </div>

              <span className="min-w-48 flex-1">{donation.campaign}</span>

              <div className="flex min-w-48 flex-1 justify-center">
                <span
                  className={`w-24 rounded-lg border px-2 py-1 text-xs font-medium ${donation.status === 'Confirmada' ? 'border-green-600 text-green-600' : 'border-orange-600 text-orange-600'}`}
                >
                  {donation.status}
                </span>
              </div>

              <div className="flex min-w-20 flex-1 justify-center sm:max-w-20">
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
      </div>
    </section>
  )
}
