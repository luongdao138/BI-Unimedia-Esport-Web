import { ReactNode, useState } from 'react'
import useTournamentDetail from './useTournamentDetail'

import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { useRouter } from 'next/router'
import { TournamentStatus } from '@services/tournament.service'
import DetailInfo from '@containers/TournamentDetail/Partials/DetailInfo'
import MatchModal from '@containers/TournamentDetail/Partials/SelectParticipantModal'
import ButtonPrimary from '@components/ButtonPrimary'
import RecruitingAction from './Partials/RecruitingAction'

const TournamentDetail: React.FC = () => {
  const router = useRouter()
  const { tournament, meta } = useTournamentDetail()
  const handleBack = () => router.back()
  const [open, setOpen] = useState(false)

  const actionComponent: Record<TournamentStatus, ReactNode> = {
    in_progress: <></>,
    cancelled: <></>,
    completed: <></>,
    ready: <></>,
    ready_to_start: <></>,
    recruiting: <RecruitingAction tournament={tournament} />,
    recruitment_closed: <></>,
  }
  return (
    <div>
      {meta.pending && '...loading'}
      {meta.loaded && tournament && (
        <>
          <TournamentDetailHeader
            status={tournament?.attributes?.status || 'ready'}
            cover={tournament?.attributes?.cover_image}
            onHandleBack={handleBack}
          >
            {actionComponent[tournament.attributes.status]}
          </TournamentDetailHeader>
          <MatchModal tournament={tournament} open={open} handleClose={() => setOpen(false)} />
          <ButtonPrimary round onClick={() => setOpen(true)}>
            Select PArt
          </ButtonPrimary>
          <DetailInfo detail={tournament} extended />
        </>
      )}
    </div>
  )
}

export default TournamentDetail
