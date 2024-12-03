'use client'

import { Campaign, CampaignItem } from '@/@types/Campaign'
import { api } from '@/utils/api'
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { ReserveDonationModal } from '@/components/modals/reserve-donation-modal'
import { SquareCheck, Hourglass } from 'lucide-react'
import { DonationItem } from '@/components/sections/donation-item'
import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getAuthentication } from '@/utils/get-authentication'
import { User } from '@/@types/User'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../modals/confirmation-modal'

interface CampaignPresentationProps {
  campaign: Campaign
}

export function CampaignPresentation({ campaign }: CampaignPresentationProps) {
  const [markedItems, setMarkedItems] = useState<CampaignItem[]>([])
  const [currentRole, setCurrentRole] = useState('')

  const router = useRouter()

  const userCookie = Cookies.get('user')
  const { user } = getAuthentication(userCookie)

  const isDonor = currentRole === 'doador'
  const isParticipant = user && campaign.participants_ids.includes(user?.userID)

  async function handleParticipateInCampaign() {
    toast.promise(
      async () =>
        await fetch(`${api}/campaigns/${campaign.id}/participate`, {
          method: 'POST',
          headers: {
            User: String(userCookie),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.userID }),
        }),
      {
        success: () => {
          router.refresh()

          return 'Você agora é um participante da campanha! Comece a doar e fazer a diferença.'
        },
        error: 'Erro ao participar da campanha. Tente novamente mais tarde.',
      },
    )
  }

  function onItemToList(item: CampaignItem) {
    if (markedItems.includes(item)) {
      const updatedList = markedItems.filter(
        (markedItem) => markedItem !== item,
      )

      return setMarkedItems(updatedList)
    }

    setMarkedItems([...markedItems, item])
  }

  const fetchUpdatedRole = useCallback(async () => {
    if (!user || !userCookie) return

    const profileResponse = await fetch(`${api}/users/${user.userID}`, {
      headers: {
        User: userCookie,
      },
    })
    const { role }: User = await profileResponse.json()

    setCurrentRole(role)
  }, [user, userCookie])

  useEffect(() => {
    fetchUpdatedRole()
  }, [fetchUpdatedRole])

  return (
    <section className="flex-1 space-y-5">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
          {campaign.name}
        </h1>

        {isParticipant && isDonor && campaign.status === 'aberta' && (
          <ReserveDonationModal items={markedItems} campaignId={campaign.id} />
        )}

        {!isParticipant && isDonor && campaign.status !== 'fechada' && (
          <ConfirmationModal
            title="Confirmar Participação"
            description="Deseja começar a participar desta campanha? Isso permitirá que você realize doações para ela."
            disabled={!user}
            onConfirm={handleParticipateInCampaign}
          >
            <Button>
              {campaign.status === 'aberta' && (
                <>
                  <span>Participar agora</span>
                  <SquareCheck className="size-5 shrink-0" />
                </>
              )}

              {campaign.status === 'em breve' && (
                <>
                  <span>Reservar vaga</span>
                  <Hourglass className="size-5 shrink-0" />
                </>
              )}
            </Button>
          </ConfirmationModal>
        )}
      </header>

      {campaign.section.map((section) => (
        <div
          key={section.category}
          className="space-y-5 overflow-x-scroll sm:overflow-x-visible [&::-webkit-scrollbar]:h-1.5"
        >
          <h3 className="text-lg font-bold text-zinc-800">
            {section.category}
          </h3>

          <div className="flex items-center gap-14 px-5 text-sm font-medium uppercase text-zinc-800">
            <div className="flex min-w-48 flex-1 items-center gap-5">
              <Checkbox
                checked={
                  !section.items.some((item) => item.status !== 'concluído')
                }
                disabled
              />
              <strong className="font-medium">Nome do item</strong>
            </div>

            <strong className="min-w-24 text-center font-medium">
              Quantidade
            </strong>

            <strong className="min-w-24 text-center font-medium">Status</strong>
          </div>

          <div className="space-y-2">
            {section.items.map((item) => (
              <DonationItem
                key={item.name}
                item={item}
                onItemToList={onItemToList}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
