
import { TextSearch, X } from 'lucide-react';
import { Search } from 'lucide-react';
import { Button } from '@/components/button'
import { Pagination } from '@/components/pagination'
import StatusPopover from "@/components/status-popover"
import { HeaderAdmin } from '@/components/sections/header-admin'


export default function Adiministrador() {
    return (
        <>
            <HeaderAdmin />
            <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4">
                <header className="flex w-full items-center justify-between">
                    <h1 className="text-4xl font-bold text-zinc-800">Donatários</h1>

                    <Button className="flex items-center gap-2">
                        <span>Ver solicitações</span>
                        <TextSearch className="size-5 shrink-0" />
                    </Button>
                </header>


                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-zinc-800">Filtros</h3>
                    <input
                        className="appearance-none block text-gray-700 border border-gray-500 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="Nome do Donatário"
                    ></input>


                    <StatusPopover />

                    <Button className="flex items-center gap-2">
                        <span>Remover filtros</span>
                        <X className="size-5 shrink-0" />
                    </Button>

                </div>


                <div className="overflow-x-auto">
                    <table className="min-w-full table-fixed border-collapse border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Identificador</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Contato</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Cadastrado há</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Button className="flex items-center gap-2 border border-gray-300 bg-transparent p-2 rounded-md hover:bg-gray-100">
                                            <Search className="w-5 h-5 text-black hover:text-black" />
                                        </Button>

                                        <span className="flex-grow">4f3846b5-9def-48db90</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                        <span className="text-green-500">Apto</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Maria Oliveira Rocha</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    (11) 98765-4321<br />mariaoliveirarochar@gmail.com
                                </td>
                                <td className="border border-gray-300 px-4 py-2">há cerca de 2 meses</td>
                            </tr>
                            <tr className="border-b">
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Button className="flex items-center gap-2 border border-gray-300 bg-transparent p-2 rounded-md hover:bg-gray-100">
                                            <Search className="w-5 h-5 text-black hover:text-black" />
                                        </Button>

                                        <span className="flex-grow">982guji3-9def-90829</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                                        <span className="text-gray-500">Inativo</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Ian Rocha</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    (82) 98875-2921<br />ianrocha@gmail.com
                                </td>
                                <td className="border border-gray-300 px-4 py-2">há cerca de 9 meses</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </main >






        </>
    )
}