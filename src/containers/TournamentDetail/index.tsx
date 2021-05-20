import { ReactNode } from 'react'
import useTournamentDetail from './useTournamentDetail'

import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { useRouter } from 'next/router'
import { TournamentStatus } from '@services/tournament.service'
import DetailInfo from '@containers/TournamentDetail/Partials/DetailInfo'
// import RecruitingAction from './Partials/RecruitingAction'
import RecruitmentClosed from './Partials/RecruitmentClosed'
import useGetProfile from '@utils/hooks/useGetProfile'

const TournamentDetail: React.FC = () => {
  const router = useRouter()
  const { tournament, meta } = useTournamentDetail()
  const handleBack = () => router.back()
  const { userProfile } = useGetProfile()

  const actionComponent: Record<TournamentStatus, ReactNode> = {
    in_progress: <></>, //headset
    cancelled: <></>,
    completed: <></>, //trophy
    ready: <></>,
    ready_to_start: <></>, //hourglass
    recruiting: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, // <RecruitingAction tournament={tournament} />,
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
