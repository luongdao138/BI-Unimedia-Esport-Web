import { ReactNode } from 'react'
import useLobbyDetail from '../hooks/useLobbyDetail'
import LobbyDetailHeader from '@components/LobbyDetailHeader'
import DetailInfo from '@containers/lobby/Detail/Partials/DetailInfo'
import RecruitmentClosed from './Partials/RecruitmentClosed'
import Recruiting from './Partials/Recruiting'
import Ready from './Partials/Ready'
import InProgress from './Partials/InProgress'
import Cancelled from './Partials/Cancelled'
import Completed from './Partials/Completed'
import ESLoader from '@components/FullScreenLoader'
// import BattleRoyaleInfo from './Partials/BattleRoyaleInfo'
import useLobbyHelper from '../hooks/useLobbyHelper'
import BlankLayout from '@layouts/BlankLayout'
import ESModal from '@components/Modal'
import { UpsertForm } from '..'
import { useRouter } from 'next/router'
import MainDatePeriod from '../MainDatePeriod'
import SubStatusInfo from './Partials/StatusInfoComponent'
// import useLobbyActions from '../hooks/useLobbyActions'
// import CloseRecruitmentModal from './Partials/ActionComponent/CloseRecruitmentModal'

const LobbyDetailBody: React.FC = () => {
  const { userProfile, handleBack, lobby, meta } = useLobbyDetail()
  // const {
  //   participants, participantsMeta,
  //   recommendedParticipants, recommendedParticipantsMeta,
  //   getRecommendedParticipants,
  //   getParticipants, confirmParticipants
  // } = useLobbyActions();

  // useEffect(() => {
  //   // get participants
  //   if (lobby?.attributes?.hash_key) getParticipants(lobby?.attributes?.hash_key)
  // }, [lobby])

  // const randomizeParticipants = () : void => {
  //   getRecommendedParticipants(lobby?.attributes?.hash_key)
  // }

  // const onConfirmParticipants = (participants_ids: Array<number>) : void => {
  //   confirmParticipants(lobby?.attributes?.hash_key, participants_ids)
  // }

  const { toEdit } = useLobbyHelper(lobby)
  const router = useRouter()

  type LobbyStatus = 'open' | 'ready' | 'recruiting' | 'recruitment_closed' | 'ready_to_start' | 'in_progress' | 'completed' | 'cancelled' // TODO

  const actionComponent: Record<LobbyStatus, ReactNode> = {
    open: <Recruiting lobby={lobby} userProfile={userProfile} />, // before entry accepting
    in_progress: <InProgress lobby={lobby} userProfile={userProfile} />, //headset
    cancelled: <Cancelled lobby={lobby} userProfile={userProfile} />,
    completed: <Completed lobby={lobby} userProfile={userProfile} />, //trophy
    ready: <Ready lobby={lobby} userProfile={userProfile} />,
    ready_to_start: <RecruitmentClosed lobby={lobby} userProfile={userProfile} />, //hourglass
    recruiting: <Recruiting lobby={lobby} userProfile={userProfile} />,
    recruitment_closed: <RecruitmentClosed lobby={lobby} userProfile={userProfile} />, //hourglass
  }

  const renderBody = () => {
    return (
      <>
        <LobbyDetailHeader
          title={lobby?.attributes?.title}
          status={/*lobby?.attributes?.status || */ 'ready'}
          cover={lobby?.attributes?.cover_image_url || '/images/default_card.png'}
          onHandleBack={handleBack}
        >
          <>
            <MainDatePeriod lobby={lobby} />
            <SubStatusInfo lobby={lobby} />
            {/* <CloseRecruitmentModal 
              open={true} 
              isRecruiting={true} 
              participants={participants}
              max_participants={lobby?.attributes?.max_participants}
              recommended_participants={recommendedParticipants}
              randomizeParticipants={randomizeParticipants}
              participantsMeta={participantsMeta}
              recommendedParticipantsMeta={recommendedParticipantsMeta}
              onConfirmParticipants={onConfirmParticipants}
              onConfirm={() => {}} 
              handleClose={() => {}} 
            /> */}
            {actionComponent[lobby.attributes.status]}
          </>
        </LobbyDetailHeader>
        <DetailInfo toEdit={toEdit} detail={lobby} extended />
      </>
    )
  }

  return (
    <div>
      <ESLoader open={meta.pending} />
      {lobby && meta.loaded && renderBody()}
      <ESModal open={router.asPath.endsWith('/edit')}>
        <BlankLayout>
          <UpsertForm />
        </BlankLayout>
      </ESModal>
    </div>
  )
}

export default LobbyDetailBody
