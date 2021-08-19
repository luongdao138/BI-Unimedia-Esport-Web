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
  // const lobby: LobbyDetail = {
  //   id: 'uniqueid123',
  //   type: 'tournament_details',
  //   attributes: {
  //     title: 'testLobby',
  //     overview: 'overview',
  //     notes: 'note',
  //     rule: 'single', //double, battle_royale
  //     max_participants: 15,
  //     status: 'completed', //'ready' | 'recruiting' | 'recruitment_closed' | 'ready_to_start' | 'in_progress' | 'completed' | 'cancelled' | 'before_recruitment'
  //     is_freezed: true,
  //     start_date: '2021-08-05 13:00',
  //     end_date: '2021-08-06 13:00',
  //     chat_room_id: '123',
  //     acceptance_start_date: '2021-08-04 13:00',
  //     acceptance_end_date: '2021-08-05 12:00',
  //     participant_type: 1,
  //     is_organizer_join: false,
  //     area_id: 1,
  //     area_name: 'tokyo',
  //     address: 'shinjuku',
  //     has_prize: false,
  //     prize_amount: '0',
  //     terms_of_participation: 'no terms',
  //     organizer_name: 'Unimedia',
  //     summary: null,
  //     background_tpl: 1,
  //     has_third_place: false,
  //     retain_history: false,
  //     t_type: 't_public',
  //     owner: {
  //       data: {
  //         id: 'string',
  //         type: 'user_list',
  //         attributes: {
  //           user_code: 'testdulguun',
  //           nickname: 'dulguun',
  //           nickname2: '格ゲーマニア',
  //           avatar: null,
  //           features: null,
  //           game_titles: [
  //             {
  //               id: 1,
  //               display_name: 'Apex Legends',
  //               short_name: 'Ape',
  //               jp_kana_name: 'エーペックスレジェンズ',
  //               en_name: 'Apex Legends',
  //             },
  //             {
  //               id: 2,
  //               display_name: 'Valorant',
  //               short_name: 'VAL',
  //               jp_kana_name: 'ヴァロラント',
  //               en_name: 'Valorant',
  //             },
  //           ],
  //         },
  //       },
  //     },
  //     game_title: {
  //       data: {
  //         id: '2',
  //         type: 'game_title',
  //         attributes: {
  //           display_name: 'test game title',
  //         },
  //       },
  //     },
  //     game_hardware: {
  //       data: {
  //         id: 'string',
  //         type: 'game_hardware',
  //         attributes: {
  //           id: 5,
  //           name: 'hardware',
  //         },
  //       },
  //     },
  //     co_organizers: {
  //       data: [],
  //     },
  //     cover_image: null,
  //     summary_image: null,
  //     interested_count: 0,
  //     participant_count: 2,
  //     my_role: 'admin', //admin,participant,interested
  //     my_info: null, //[]
  //     my_position: null,
  //     hash_key: '12345678190',
  //     is_entered: true,
  //   },
  // }
  const { toEdit } = useLobbyHelper(lobby)
  const router = useRouter()

  // const actionComponent: Record<LobbyStatus, ReactNode> = {
  //   open: <Recruiting lobby={lobby} userProfile={userProfile} />, // before entry accepting
  //   in_progress: <InProgress lobby={lobby} userProfile={userProfile} />, //headset
  //   cancelled: <Cancelled lobby={lobby} userProfile={userProfile} />,
  //   completed: <Completed lobby={lobby} userProfile={userProfile} />, //trophy
  //   ready: <Ready lobby={lobby} userProfile={userProfile} />,
  //   ready_to_start: <RecruitmentClosed lobby={lobby} userProfile={userProfile} />, //hourglass
  //   recruiting: <Recruiting lobby={lobby} userProfile={userProfile} />,
  //   recruitment_closed: <RecruitmentClosed lobby={lobby} userProfile={userProfile} />, //hourglass
  // }

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
