import { ReactNode } from 'react'
import useTournamentDetail from '../hooks/useTournamentDetail'
import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { TournamentStatus } from '@services/arena.service'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import RecruitmentClosed from './Partials/RecruitmentClosed'
import Recruiting from './Partials/Recruiting'
import InProgress from './Partials/InProgress'
import Cancelled from './Partials/Cancelled'
import Completed from './Partials/Completed'
import ESLoader from '@components/FullScreenLoader'
import useArenaHelper from '../hooks/useArenaHelper'
import BlankLayout from '@layouts/BlankLayout'
import { UpsertForm } from '..'
import { useRouter } from 'next/router'
import RegularModal from '@components/RegularModal'
import ESModal from '@components/Modal'
import Participants from './Participants'
import BRStatusReady from './Partials/BRStatusReady'
import BRStatusRecruiting from './Partials/BRStatusRecruiting'
import BRStatusRecruitmentClosed from './Partials/BRStatusRecruitmentClosed'

const TournamentDetail: React.FC = () => {
  const { tournament, meta, userProfile, handleBack } = useTournamentDetail()
  const { toEdit, isBattleRoyale } = useArenaHelper(tournament)
  const router = useRouter()

  const actionComponent: Record<TournamentStatus, ReactNode> = {
    in_progress: <InProgress tournament={tournament} userProfile={userProfile} />, //headset
    cancelled: <Cancelled tournament={tournament} userProfile={userProfile} />,
    completed: <Completed tournament={tournament} userProfile={userProfile} />, //trophy
    ready: <Recruiting tournament={tournament} userProfile={userProfile} />,
    ready_to_start: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, //hourglass
    recruiting: <Recruiting tournament={tournament} userProfile={userProfile} />,
    recruitment_closed: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, //hourglass
  }

  const brActionComponent: Record<TournamentStatus, ReactNode> = {
    ready: <BRStatusReady arena={tournament} />,
    recruiting: <BRStatusRecruiting arena={tournament} userProfile={userProfile} />,
    recruitment_closed: <BRStatusRecruitmentClosed arena={tournament} userProfile={userProfile} />,
    ready_to_start: <BRStatusRecruitmentClosed arena={tournament} userProfile={userProfile} />,
    cancelled: <BRStatusReady arena={tournament} />,
    completed: <BRStatusReady arena={tournament} />,
    in_progress: <BRStatusReady arena={tournament} />,
  }

  return (
    <div>
      <ESLoader open={meta.pending} />
      {tournament && meta.loaded && (
        <>
          <TournamentDetailHeader
            title={tournament?.attributes?.title}
            status={tournament?.attributes?.status || 'ready'}
            cover={tournament?.attributes?.cover_image || '/images/default_card.png'}
            onHandleBack={handleBack}
          >
            {isBattleRoyale ? brActionComponent[tournament.attributes.status] : actionComponent[tournament.attributes.status]}
          </TournamentDetailHeader>
          <DetailInfo toEdit={toEdit} detail={tournament} extended />
          <ESModal open={router.query.modalName === 'participants'}>
            <Participants detail={tournament} />
          </ESModal>
        </>
      )}
      <RegularModal open={router.asPath.endsWith('/edit')}>
        <BlankLayout>
          <UpsertForm />
        </BlankLayout>
      </RegularModal>
    </div>
  )
}

export default TournamentDetail
