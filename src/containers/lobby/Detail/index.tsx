import useLobbyDetail from '../hooks/useLobbyDetail'
import LobbyDetailHeader from '@components/LobbyDetailHeader'
import DetailInfo from '@containers/lobby/Detail/Partials/DetailInfo'
import ESLoader from '@components/FullScreenLoader'
// import BattleRoyaleInfo from './Partials/BattleRoyaleInfo'
import useLobbyHelper from '../hooks/useLobbyHelper'
import BlankLayout from '@layouts/BlankLayout'
import ESModal from '@components/Modal'
import { UpsertForm } from '..'
import { useRouter } from 'next/router'
import MainDatePeriod from '../MainDatePeriod'
import SubStatusInfo from '../SubStatusInfo'
import SubActionButtons from '@containers/lobby/SubActionButtons'
import MainActionButtons from '@containers/lobby/MainActionButtons'
import useLobbyActions from '../hooks/useLobbyActions'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'

const LobbyDetailBody: React.FC = () => {
  // const { tournament, meta, userProfile, handleBack } = useLobbyDetail()
  const { unjoin, entry, unjoinMeta } = useLobbyActions()

  const { handleBack, lobby, meta } = useLobbyDetail()

  const hashKey = _.get(lobby, 'attributes.hash_key', null)

  const { toEdit } = useLobbyHelper(lobby)
  const router = useRouter()

  const openChat = () => {
    const chatRoomId = _.get(lobby, 'attributes.chatroom', null)
    if (chatRoomId) router.push(ESRoutes.GROUP_CHAT.replace(/:id/gi, chatRoomId))
  }
  const openMemberList = () => {
    alert('')
  }

  const onEntry = () => {
    hashKey && entry(hashKey)
  }

  const onDecline = () => {
    hashKey && unjoin(hashKey)
  }

  const onMemberConfirm = () => {
    alert('member confirm modal')
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
          <MainDatePeriod lobby={lobby} />
          <SubStatusInfo lobby={lobby} />
          <SubActionButtons lobby={lobby} openChat={openChat} openMemberList={openMemberList} />
          <MainActionButtons memberConfirm={onMemberConfirm} unjoinMeta={unjoinMeta} lobby={lobby} entry={onEntry} decline={onDecline} />
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
