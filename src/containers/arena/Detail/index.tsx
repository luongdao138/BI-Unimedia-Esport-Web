import { ReactNode } from 'react'
import useTournamentDetail from '../hooks/useTournamentDetail'
import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { TournamentStatus } from '@services/arena.service'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import RecruitmentClosed from './Partials/RecruitmentClosed'
import Recruiting from './Partials/Recruiting'
import InProgress from './Partials/InProgress'
import Completed from './Partials/Completed'

const TournamentDetail: React.FC = () => {
  const { tournament, meta, userProfile, handleBack } = useTournamentDetail()

  const actionComponent: Record<TournamentStatus, ReactNode> = {
    in_progress: <InProgress tournament={tournament} userProfile={userProfile} />, //headset
    cancelled: <></>,
    completed: <Completed tournament={tournament} userProfile={userProfile} />, //trophy
    ready: <></>,
    ready_to_start: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, //hourglass
    recruiting: <Recruiting tournament={tournament} userProfile={userProfile} />,
    recruitment_closed: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, //hourglass
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
          <DetailInfo detail={tournament} extended />
        </>
      )}
    </div>
  )
}

export default TournamentDetail
