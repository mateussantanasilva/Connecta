'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Search, X, Phone, MapPin, Info, UserRound, Calendar, UserRoundCheck } from 'lucide-react'
import { Button } from '../button'

export function InactiveDoneeModal() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border border-zinc-300 bg-transparent p-2 rounded-md hover:bg-zinc-200">
                    <Search className="w-5 h-5 text-black hover:text-black" />
                </Button>

            </Dialog.Trigger>


            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60" />

                <Dialog.Content className="fixed inset-0 left-4 right-4 z-30 mx-auto my-4 flex max-w-2xl flex-col gap-5 overflow-y-scroll rounded-2xl bg-white p-5 md:ml-auto md:mr-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:bg-transparent">
                    <Dialog.Close asChild>
                        <Button size="xs" variant="outline" className="ml-auto">
                            <X className="size-5 shrink-0" />
                        </Button>
                    </Dialog.Close>

                    <header className="max-w-lg space-y-2">
                        <Dialog.Title className="text-lg font-bold text-zinc-800 sm:text-2xl">
                            Detalhes do Donatário
                        </Dialog.Title>

                        <Dialog.Description className="text-sm sm:text-base">
                            Visualize as informações do donatário e altere o status quando necessário.
                        </Dialog.Description>
                    </header>

                    <div className="flex items-center justify-between w-[632px] gap-0 px-4 pt-3">
                        <div className="flex items-center gap-[12px]">
                            <div className="w-[46px] h-[46px] rounded-full bg-orange-600/20 p-3">
                                <UserRound className="size-6 shrink-0 text-orange-600" />
                            </div>

                            <div className="flex flex-col justify-between w-[235px]">
                                <span className="font-semibold">Antônio Carlos Braga</span>
                                <span className="text-sm text-zinc-600">antoniocarlos@gmail.com</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end w-[300.5px] gap-1">
                            <span className="h-2 w-2 rounded-full bg-zinc-600"></span>
                            <span className="text-[#71717A]">Inativo</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-4">
                        <Calendar className="size-5 shrink-0 text-zinc-700" />
                        <span>Cadastrado há cerca de 1 ano</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-4">
                        <Phone className="size-5 shrink-0 text-zinc-700" />
                        <span>(11) 98765-4321</span>
                    </div>

                    <div className="flex items-start gap-1.5 px-4">
                        <MapPin className="size-5 shrink-0 text-zinc-700" />
                        <span>
                            Rua Árvore da Cera, 20c - Jardim Santo Antonio, São Paulo - SP, 08032-270
                        </span>
                    </div>

                    <div className="flex items-start gap-1.5 px-4">
                        <Info className="size-5 shrink-0 text-zinc-700" />
                        <span>
                            Após enfrentar a perda repentina do meu emprego, minha família e eu estamos
                            passando por um período desafiador. A falta de renda afetou nossa capacidade de
                            suprir as necessidades básicas, como alimentação e outros itens essenciais.
                        </span>
                    </div>

                    <div className="mt-auto h-px w-full bg-zinc-400" />

                    <div className="flex justify-end">
                        <Button className="flex items-center gap-2">
                            <span>Reativar donatário</span>
                            <UserRoundCheck className="size-5 shrink-0" />
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
