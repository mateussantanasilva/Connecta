'use client'

import { api } from '@/utils/api'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { LogOut, Menu, Settings } from 'lucide-react'
import Link from 'next/link'

export function SettingsMenuAdmin() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item className="relative flex">
          <NavigationMenu.Trigger aria-label="menu">
            <Settings className="hidden size-6 transition-colors hover:text-green-600 md:flex" />

            <Menu className="flex size-6 transition-colors hover:text-green-600 md:hidden" />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute right-0 top-10 z-10 flex w-max flex-col gap-5 rounded-2xl bg-white p-5 font-medium shadow transition-colors md:left-1/2 md:-translate-x-1/2">
            <NavigationMenu.Link
              href="/administrador"
              className="flex hover:text-green-600 md:hidden"
            >
              Início
            </NavigationMenu.Link>

            <NavigationMenu.Link
              href="/administrador/campanhas"
              className="flex hover:text-green-600 md:hidden"
            >
              Campanhas
            </NavigationMenu.Link>

            <NavigationMenu.Link
              href="/administrador/donatarios"
              className="flex hover:text-green-600 md:hidden"
            >
              Donatários
            </NavigationMenu.Link>

            <Link
              href={`${api}/logout`}
              className="flex items-center gap-1.5 text-red-600 hover:text-red-700"
            >
              Encerrar sessão
              <LogOut className="size-5 shrink-0" />
            </Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
