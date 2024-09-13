'use client';

import { Popover } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

export default function StatusPopover() {
    return (
        <Popover className="relative">
            <Popover.Button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
                <span>Todos os status</span>
                <ChevronDown className="w-5 h-5" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-2">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Apto</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Inativo</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Em análise</button>
                </div>
            </Popover.Panel>
        </Popover>
    )
}
