import { ReactNode } from 'react'
import useTournamentDetail from './useTournamentDetail'

import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { useRouter } from 'next/router'
import { TournamentStatus } from '@services/tournament.service'

import RecruitingAction from './RecruitingAction'

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
      {meta.pending && !tournament ? (
        '...loading'
      ) : (
        <>
          <TournamentDetailHeader
            status={tournament?.attributes?.status || 'ready'}
            cover={tournament?.attributes?.cover_image}
            onHandleBack={handleBack}
          >
            {actionComponent[tournament.attributes.status]}
            <pre>{JSON.stringify(tournament, null, 2)}</pre>
          </TournamentDetailHeader>
          <pre>{JSON.stringify(tournament, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export default TournamentDetail
