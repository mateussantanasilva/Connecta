import { Search, ArrowUpRight, X } from 'lucide-react';
import { HeaderAdmin } from '@/components/sections/header-admin'
import { Button } from '@/components/button'
import { Pagination } from '@/components/pagination'
import StatusPopoverAdmin from "@/components/status-popover-admin"
import { CreateCampaignModal } from '@/components/modals/create-campaign-modal'
import { OpenCampaignModal } from '@/components/modals/open-campaign-modal'
import { CloseCampaignModal } from '@/components/modals/close-campaign-modal'
import { ClosedCampaignModal } from '@/components/modals/closed-campaign-modal';
import { CampaignFilter } from '@/components/campaign-filter'


export default function Campanha() {
    return (

        <>
            <HeaderAdmin />
            <main className="mx-auto mb-20 mt-16 max-w-7xl space-y-5 px-4 2xl:px-0">
                <header className="flex w-full items-center justify-between">
                    <h1 className="text-4xl font-bold text-zinc-800">Campanhas</h1>

                    <CreateCampaignModal />
                </header>

                <CampaignFilter/>

                

                <div className="overflow-x-auto">
                    <table className="min-w-full table-fixed border-collapse border border-zinc-300 rounded-lg">
                        <thead>
                            <tr className="bg-zinc-100">
                                <th className="border border-zinc-300 px-4 py-2 text-left">Identificador</th>
                                <th className="border border-zinc-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-zinc-300 px-4 py-2 text-left">Nome</th>
                                <th className="border border-zinc-300 px-4 py-2 text-left">Categorias</th>
                                <th className="border border-zinc-300 px-4 py-2 text-left">Progresso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="border border-zinc-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <CloseCampaignModal />
                                        <span className="flex-grow">398dfg39-9def-42340</span>
                                    </div>
                                </td>
                                <td className="border border-zinc-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                                        <span className="text-[#0369A1]">Iniciada há 20 dias</span>
                                    </div>
                                </td>
                                <td className="border border-zinc-300 px-4 py-2">Mutirão de Natal</td>
                                <td className="border border-zinc-300 px-4 py-2">Vestuário, Alimentação</td>

                                <div className="flex items-center gap-2">
                                    <td className=" px-4 py-2">
                                        72%<br />
                                        13 doação(s)
                                    </td>
                                    <a
                                        href="http://localhost:3000/campanhas/1"
                                        target="_blank"
                                        rel="noopener"
                                        className="inline-flex items-center text-[#DD720F] font-semibold py-2 px-4 rounded hover:underline transition duration-300"
                                    >
                                        Detalhes
                                        <ArrowUpRight className="size-5 shrink-0" />

                                    </a>
                                </div>
                            </tr>
                            <tr className="border-b">
                                <td className="border border-zinc-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <ClosedCampaignModal />
                                        <span className="flex-grow">39uyie39-9wrf-4wg30</span>
                                    </div>
                                </td>
                                <td className="border border-zinc-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-zinc-500 mr-2"></span>
                                        <span className="text-zinc-500">Encerrada há 20 dias</span>
                                    </div>
                                </td>
                                <td className="border border-zinc-300 px-4 py-2">Mutirão de Aniversário</td>
                                <td className="border border-zinc-300 px-4 py-2">Brinquedos, Alimentação</td>

                                <div className="flex items-center gap-2">
                                    <td className=" px-4 py-2">
                                        22%<br />
                                        10 doação(s)
                                    </td>
                                    <a
                                        href="http://localhost:3000/campanhas/2"
                                        target="_blank"
                                        rel="noopener"
                                        className="inline-flex items-center text-[#DD720F] font-semibold py-2 px-4 rounded hover:underline transition duration-300"
                                    >
                                        Detalhes
                                        <ArrowUpRight className="size-5 shrink-0" />

                                    </a>

                                </div>
                            </tr>
                            <tr className="border-b">
                                <td className="border border-zinc-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <OpenCampaignModal />
                                        <span className="flex-grow">39u04329-93r5-4fg30</span>
                                    </div>
                                </td>
                                <td className="border border-zinc-300 px-4 py-2">
                                    <div className="flex items-center">
                                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                                        <span className="text-blue-500">Não iniciada</span>
                                    </div>
                                </td>
                                <td className="border border-zinc-300 px-4 py-2">Mutirão de Ano novo</td>
                                <td className="border border-zinc-300 px-4 py-2">Limpeza, Alimentação</td>

                                <div className="flex items-center gap-2">
                                    <td className=" px-4 py-2">
                                        62%<br />
                                        17 doação(s)
                                    </td>
                                    <a
                                        href="http://localhost:3000/campanhas/3"
                                        target="_blank"
                                        rel="noopener"
                                        className="inline-flex items-center text-[#DD720F] font-semibold py-2 px-4 rounded hover:underline transition duration-300"
                                    >
                                        Detalhes
                                        <ArrowUpRight className="size-5 shrink-0" />

                                    </a>


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
