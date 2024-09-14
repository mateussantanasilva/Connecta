import { Search, ArrowUpRight, X, Plus } from 'lucide-react';
import { HeaderAdmin } from '@/components/sections/header-admin'
import { Button } from '@/components/button'
import { Pagination } from '@/components/pagination'
import StatusPopoverAdmin from "@/components/status-popover-admin"

export default function Campanha() {
    return (

        <>
            <HeaderAdmin />
            <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4">
                <header className="flex w-full items-center justify-between">
                    <h1 className="text-4xl font-bold text-zinc-800">Campanhas</h1>

                    <Button className="flex items-center gap-2">
                        <span>Criar Campanhas</span>
                        <Plus className="size-5 shrink-0" />
                    </Button>
                </header>

                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-zinc-800">Filtros</h3>
                    <input
                        className="appearance-none block text-gray-700 border border-gray-500 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white w-80"
                        id="grid-first-name"
                        type="text"
                        placeholder="Nome da campanha"
                    ></input>

                    <StatusPopoverAdmin />

                    <Button className="flex items-center gap-2">
                        <span>Filtrar resultados</span>
                        <Search className="size-5 shrink-0" />
                    </Button>

                    <Button className="flex items-center gap-2 border border-gray-300 bg-transparent text-black-500 hover:bg-gray-100 ">
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
                                <th className="border border-gray-300 px-4 py-2 text-left">Categorias</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Progresso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Button className="flex items-center gap-2 border border-gray-300 bg-transparent p-2 rounded-md hover:bg-gray-100">
                                            <Search className="w-5 h-5 text-black hover:text-black" />
                                        </Button>
                                        <span className="flex-grow">398dfg39-9def-42340</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                                        <span className="text-[#0369A1]">Iniciada há 20 dias</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Multirão de Natal</td>
                                <td className="border border-gray-300 px-4 py-2">Vestuário, Alimentação</td>

                                <div className="flex items-center gap-2">
                                    <td className=" px-4 py-2">
                                        72%<br />
                                        23 doação(s)
                                    </td>
                                    <Button className="flex items-center gap-2 bg-transparent text-[#DD720F] hover:bg-transparent">
                                        <span>Detalhes</span>
                                        <ArrowUpRight className="w-5 h-5 shrink-0" />
                                    </Button>

                                </div>
                            </tr>
                            <tr className="border-b">
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Button className="flex items-center gap-2 border border-gray-300 bg-transparent p-2 rounded-md hover:bg-gray-100">
                                            <Search className="w-5 h-5 text-black hover:text-black" />
                                        </Button>
                                        <span className="flex-grow">39uyie39-9wrf-4wg30</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                                        <span className="text-blue-500">Não iniciada</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Multirão de Ano novo</td>
                                <td className="border border-gray-300 px-4 py-2">Limpeza, Alimentação</td>

                                <div className="flex items-center gap-2">
                                    <td className=" px-4 py-2">
                                        62%<br />
                                        17 doação(s)
                                    </td>
                                    <Button className="flex items-center gap-2 bg-transparent text-[#DD720F] hover:bg-transparent ">
                                        <span>Detalhes</span>
                                        <ArrowUpRight className="w-5 h-5 shrink-0" />
                                    </Button>

                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </main >
        </>
    );

}
