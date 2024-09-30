import { Pagination } from '@/components/pagination'
import { HeaderAdmin } from '@/components/sections/header-admin'
import { DoneeRequestsModal } from '@/components/modals/donee-requests-modal'
import { ActiveDoneeModal } from '@/components/modals/active-donee-modal'
import { InactiveDoneeModal } from '@/components/modals/inactive-donee-modal'
import { DoneeFilter } from '@/components/donee-filter'

export default function Donatario() {
  return (
    <>
      <HeaderAdmin />

      <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-800">Donatários</h1>

          <DoneeRequestsModal />
        </header>

        <DoneeFilter />

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse rounded-lg border border-zinc-300">
            <thead>
              <tr className="bg-zinc-100">
                <th className="border border-zinc-300 px-4 py-2 text-left">
                  Identificador
                </th>
                <th className="border border-zinc-300 px-4 py-2 text-left">
                  Status
                </th>
                <th className="border border-zinc-300 px-4 py-2 text-left">
                  Nome
                </th>
                <th className="border border-zinc-300 px-4 py-2 text-left">
                  Contato
                </th>
                <th className="border border-zinc-300 px-4 py-2 text-left">
                  Cadastrado há
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="border border-zinc-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <ActiveDoneeModal />
                    <span className="flex-grow">4f3846b5-9def-48db90</span>
                  </div>
                </td>
                <td className="border border-zinc-300 px-4 py-2">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-600"></span>
                    <span className="text-[#0369A1]">Apto</span>
                  </div>
                </td>
                <td className="border border-zinc-300 px-4 py-2">
                  Maria Oliveira Rocha
                </td>
                <td className="border border-zinc-300 px-4 py-2">
                  (11) 98765-4321
                  <br />
                  mariaoliveirarochar@gmail.com
                </td>
                <td className="border border-zinc-300 px-4 py-2">
                  há cerca de 2 meses
                </td>
              </tr>
              <tr className="border-b">
                <td className="border border-zinc-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <InactiveDoneeModal />
                    <span className="flex-grow">982guji3-9def-90829</span>
                  </div>
                </td>
                <td className="border border-zinc-300 px-4 py-2">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-zinc-500"></span>
                    <span className="text-zinc-500">Inativo</span>
                  </div>
                </td>
                <td className="border border-zinc-300 px-4 py-2">Ian Rocha</td>
                <td className="border border-zinc-300 px-4 py-2">
                  (82) 98875-2921
                  <br />
                  ianrocha@gmail.com
                </td>
                <td className="border border-zinc-300 px-4 py-2">
                  há cerca de 9 meses
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination />
      </main>
    </>
  )
}
