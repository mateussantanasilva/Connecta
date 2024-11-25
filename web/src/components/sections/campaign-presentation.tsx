'use client'

import { Campaign } from '@/@types/Campaign'
import { api } from '@/utils/api'
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { ReserveDonationModal } from '@/components/modals/reserve-donation-modal'
import { SquareCheck, Hourglass } from 'lucide-react'
import { DonationItem } from '@/components/sections/donation-item'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/contexts/UserProvider'

interface CampaignPresentationProps {
  campaign: Campaign
}

export function CampaignPresentation({ campaign }: CampaignPresentationProps) {
  const { user, userCookie } = useContextSelector(UserContext, (context) => {
    return {
      user: context.user,
      userCookie: context.userCookie,
    }
  })

  const isParticipant = user && campaign.participants_ids.includes(user?.userId)

  async function participateInCampaign() {
    const data = await fetch(`${api}/campaigns/${campaign.id}/participate`, {
      method: 'POST',
      headers: {
        User: userCookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user?.userId }),
    })
    const response = await data.json()
    console.log(response)
  }

  return (
    <section className="flex-1 space-y-5">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-zinc-800 lg:text-4xl">
          {campaign.name}
        </h1>

        {!isParticipant && campaign.status !== 'fechada' && (
          <Button disabled={!user} onClick={participateInCampaign}>
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
        )}

        {/* {campaign.status !== 'fechada' && <ReserveDonationModal />} */}
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
              <DonationItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
