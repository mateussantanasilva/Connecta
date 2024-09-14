'use client';

import * as Popover from '@radix-ui/react-popover';
import { ChevronDown } from 'lucide-react';

export default function StatusPopoverAdmin() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
          <span>Todos os status</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content
          className="z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          sideOffset={5}
        >
          <div className="p-2">
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Não iniciada</button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Iniciada há 20 dias</button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Encerrada há 20 dias</button>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
