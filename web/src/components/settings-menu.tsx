'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { LogOut, Menu, Settings } from 'lucide-react'
import { Button } from './button'

interface SettingsMenuProps {
  isAuthenticated?: boolean
}

export function SettingsMenu({ isAuthenticated }: SettingsMenuProps) {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item className="relative flex">
          <NavigationMenu.Trigger>
            {isAuthenticated ? (
              <>
                <Settings className="hidden size-6 transition-colors hover:text-green-600 md:flex" />

                <Menu className="flex size-6 transition-colors hover:text-green-600 md:hidden" />
              </>
            ) : (
              <Menu className="flex size-6 transition-colors hover:text-green-600 md:hidden" />
            )}
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute right-0 top-10 z-10 flex w-max flex-col gap-5 rounded-2xl bg-white p-5 font-medium shadow transition-colors md:left-1/2 md:-translate-x-1/2">
            <NavigationMenu.Link
              href="/"
              className="flex hover:text-green-600 md:hidden"
            >
              Página inicial
            </NavigationMenu.Link>

            <NavigationMenu.Link
              href="/campanhas"
              className="flex hover:text-green-600 md:hidden"
            >
              Campanhas
            </NavigationMenu.Link>

            {isAuthenticated ? (
              <button className="flex items-center gap-1.5 text-red-600 hover:text-red-700">
                Encerrar sessão
                <LogOut className="size-5 shrink-0" />
              </button>
            ) : (
              <Button variant="secondary">
                <span>Faça sua doação</span>
              </Button>
            )}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
