import { ReactNode } from 'react'
import useLobbyDetail from '../hooks/useLobbyDetail'
import LobbyDetailHeader from '@components/LobbyDetailHeader'
import { LobbyDetail, LobbyStatus } from '@services/lobby.service'
import DetailInfo from '@containers/lobby/Detail/Partials/DetailInfo'
// import RecruitmentClosed from './Partials/RecruitmentClosed'
import Recruiting from './Partials/Recruiting'
import Ready from './Partials/Ready'
// import InProgress from './Partials/InProgress'
// import Cancelled from './Partials/Cancelled'
// import Completed from './Partials/Completed'
// import ESLoader from '@components/FullScreenLoader'
// import BattleRoyaleInfo from './Partials/BattleRoyaleInfo'
import useLobbyHelper from '../hooks/useLobbyHelper'
import BlankLayout from '@layouts/BlankLayout'
import ESModal from '@components/Modal'
// import { UpsertForm } from '..'
import { useRouter } from 'next/router'

const LobbyDetailBody: React.FC = () => {
  // const { tournament, meta, userProfile, handleBack } = useLobbyDetail()
  const { userProfile, handleBack } = useLobbyDetail()
  const lobby: LobbyDetail = {
    id: 'uniqueid123',
    type: 'tournament_details',
    attributes: {
      title: 'testLobby',
      overview: 'overview',
      notes: 'note',
      rule: 'single', //double, battle_royale
      max_participants: 15,
      status: 'ready', //'ready' | 'recruiting' | 'recruitment_closed' | 'ready_to_start' | 'in_progress' | 'completed' | 'cancelled' | 'before_recruitment'
      is_freezed: false,
      start_date: '2021-08-05 13:00',
      end_date: '2021-08-06 13:00',
      chat_room_id: '123',
      acceptance_start_date: '2021-08-04 13:00',
      acceptance_end_date: '2021-08-05 12:00',
      participant_type: 1,
      area_id: 1,
      area_name: 'tokyo',
      address: 'shinjuku',
      has_prize: false,
      prize_amount: '0',
      terms_of_participation: 'no terms',
      organizer_name: 'dulguun',
      summary: null,
      background_tpl: 1,
      has_third_place: false,
      retain_history: false,
      t_type: 't_public',
      owner: {
        data: {
          id: 'string',
          type: 'user_list',
          attributes: {
            user_code: '04156',
            nickname: 'dulguun',
            nickname2: null,
            avatar: null,
            features: [
              {
                id: 456,
                feature: 'feature',
              },
            ],
            game_titles: [
              {
                id: 1,
                display_name: 'dota 2',
              },
            ],
          },
        },
      },
      game_title: {
        data: {
          id: '2',
          type: 'game_title',
          attributes: {
            display_name: 'test game title',
          },
        },
      },
      game_hardware: {
        data: {
          id: 'string',
          type: 'game_hardware',
          attributes: {
            id: 5,
            name: 'hardware',
          },
        },
      },
      co_organizers: {
        data: [],
      },
      cover_image: null,
      summary_image: null,
      interested_count: 0,
      participant_count: 2,
      my_role: null, //admin,participant,interested,co_organizer
      my_info: null,
      my_position: null,
      hash_key: '12345678190',
      is_entered: false,
    },
  }
  const { toEdit, isBattleRoyale } = useLobbyHelper(lobby)
  const router = useRouter()

  const actionComponent: Record<LobbyStatus, ReactNode> = {
    in_progress: {
      /* <InProgress lobby={lobby} userProfile={userProfile} /> */
    }, //headset
    cancelled: {
      /* <Cancelled lobby={lobby} userProfile={userProfile} /> */
    },
    completed: {
      /* <Completed lobby={lobby} userProfile={userProfile} /> */
    }, //trophy
    ready: <Ready lobby={lobby} userProfile={userProfile} />,
    ready_to_start: {
      /* <RecruitmentClosed lobby={lobby} userProfile={userProfile} /> */
    }, //hourglass
    recruiting: <Recruiting lobby={lobby} userProfile={userProfile} />,
    recruitment_closed: {
      /* <RecruitmentClosed lobby={lobby} userProfile={userProfile} /> */
    }, //hourglass
  }

  const renderBody = () => {
    if (isBattleRoyale) {
      return (
        <>
          <LobbyDetailHeader
            title={lobby?.attributes?.title}
            status={lobby?.attributes?.status || 'ready'}
            cover={lobby?.attributes?.cover_image || '/images/default_card.png'}
            onHandleBack={handleBack}
            showTab={false}
          >
            {/* <BattleRoyaleInfo tournament={lobby} userProfile={userProfile} /> */}
          </LobbyDetailHeader>
        </>
      )
    }

    return (
      <>
        <LobbyDetailHeader
          title={lobby?.attributes?.title}
          status={lobby?.attributes?.status || 'ready'}
          cover={lobby?.attributes?.cover_image || '/images/default_card.png'}
          onHandleBack={handleBack}
        >
          {actionComponent[lobby.attributes.status]}
        </LobbyDetailHeader>
        <DetailInfo toEdit={toEdit} detail={lobby} extended />
      </>
    )
  }

  return (
    <div>
      {/* <ESLoader open={meta.loading} /> */}
      {lobby /* && meta.loaded  */ && renderBody()}
      <ESModal open={router.asPath.endsWith('/edit')}>
        <BlankLayout>{/* <UpsertForm /> */}</BlankLayout>
      </ESModal>
    </div>
  )
}

export default LobbyDetailBody
