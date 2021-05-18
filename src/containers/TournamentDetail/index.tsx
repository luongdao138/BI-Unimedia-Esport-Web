import { ReactNode } from 'react'
import useTournamentDetail from './useTournamentDetail'

import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { useRouter } from 'next/router'
import { TournamentStatus } from '@services/tournament.service'

import RecruitingAction from './RecruitingAction'
import DetailInfo from '@containers/TournamentDetail/Partials/DetailInfo'
import Participants from './Participants'

const TournamentDetail: React.FC = () => {
  const router = useRouter()
  const { tournament, meta } = useTournamentDetail()
  const handleBack = () => router.back()

  const actionComponent: Record<TournamentStatus, ReactNode> = {
    in_progress: <RecruitingAction tournament={tournament} />,
    cancelled: <></>,
    completed: <></>,
    ready: <></>,
    ready_to_start: <></>,
    recruiting: <></>,
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
          <Participants hash_key={tournament.attributes.hash_key} isTeam={tournament.attributes.participant_type > 1} />
          <DetailInfo detail={tournament} extended />
        </>
      )}
    </div>
  )
}

export default TournamentDetail
