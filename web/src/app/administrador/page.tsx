import { CheckSquare, Search, Link, Trophy, X, Check } from 'lucide-react';
import StatusCard from '@/components/status-card';
import { HeaderAdmin } from '@/components/sections/header-admin'
import { Button } from '@/components/button'
import { Pagination } from '@/components/pagination'
import { Avatar } from '@/components/avatar'




export default function Administrador() {
    return (

        <>
            <HeaderAdmin />
            <main className="mx-auto mb-20 mt-16 flex max-w-7xl flex-col gap-14 px-4">
                <header className="flex w-full items-center justify-between">
                    <h1 className="text-4xl font-bold text-zinc-800">Início</h1>
                </header>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatusCard
                        title="Campanhas Abertas"
                        count={4}
                        description="2 nova(s) para analisar"
                        icon={<CheckSquare className="w-5 h-5 text-orange-500" />}
                    />
                    <StatusCard
                        title="Donatários Ativos"
                        count={17}
                        description="1 solicitação(ões) para revisar"
                        icon={<Search className="w-5 h-5 text-orange-500" />}
                    />
                    <StatusCard
                        title="Doações Anuais"
                        count={140}
                        description="1 pendente(s) de confirmação"
                        icon={<Link className="w-5 h-5 text-orange-500" />}
                    />
                    <StatusCard
                        title="Campanhas 100%"
                        count={5}
                        description="7 finalizadas(s) ao total"
                        icon={<Trophy className="w-5 h-5 text-orange-500" />}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-zinc-800">Filtros</h3>
                    <input
                        className="appearance-none block text-gray-700 border border-gray-500 rounded-md py-2 px-3 leading-tight focus:outline-none focus:bg-white w-80"
                        id="grid-first-name"
                        type="text"
                        placeholder="Nome do Doador"
                    ></input>

                    <Button className="flex items-center gap-2">
                        <span>Filtrar resultados</span>
                        <Search className="size-5 shrink-0" />
                    </Button>

                    <Button variant="outline" className="flex items-center gap-2 border border-gray-300 bg-transparent text-black-500 hover:bg-gray-100 ">
                        <span>Remover filtros</span>
                        <X className="size-5 shrink-0" />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-fixed border-collapse border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Doador</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Campanha</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Pendente há</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">

                                        <Avatar className="flex items-center gap-2 border border-gray-300 bg-transparent p-2 rounded-md hover:bg-gray-100"
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Foto de perfil da Molly Jensen"
                                        />
                                        <td className="flex-grow">Maria Oliveira Rocha<br />
                                            mariaoliveirarochar@gmail.com
                                        </td>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Multirão de Natal</td>
                                <td className="border border-gray-300 px-4 py-2">Pacote de arroz<br />
                                    3kg
                                </td>
                                <td className="border border-gray-300 px-4 py-2">há cerca de 2 meses</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="flex items-center gap-2 border border-gray-300 text-red-500 hover:bg-gray-200 bg-transparent p-2 rounded">
                                            <X className="w-5 h-5" />
                                        </Button>

                                        <Button className="flex items-center gap-2 hover:bg-green-500 text-white p-2 rounded">
                                            <Check className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="border-b">
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">

                                        <Avatar className="flex items-center gap-2 border border-gray-300 bg-transparent p-2 rounded-md hover:bg-gray-100"
                                            src="https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Foto de perfil da Molly Jensen"
                                        />
                                        <td className="flex-grow">Luciana Cardoso Arlinda<br />
                                            lucianacarali@gmail.com
                                        </td>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">Multirão de ano novo</td>
                                <td className="border border-gray-300 px-4 py-2">Pacote de feijão<br />
                                    2kg
                                </td>
                                <td className="border border-gray-300 px-4 py-2">há cerca de 9 meses</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="flex items-center gap-2 border border-gray-300 text-red-500 hover:bg-gray-200 bg-transparent p-2 rounded">
                                            <X className="w-5 h-5" />
                                        </Button>

                                        <Button className="flex items-center gap-2 hover:bg-green-500 text-white p-2 rounded">
                                            <Check className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pagination />

            </main >
        </>
    );

}
