import { useEffect, useState } from 'react'
import { Header } from './elements/Header'
import { RecommendedUser } from './elements/Slider/RecommendedUser'
import { RecommendedRecruitment } from './elements/Slider/RecommendedRecruitment'
import { RecommendedEvent } from './elements/Slider/RecommendedEvent'
import { RecruitmentFollow } from './elements/Slider/RecruitmentFollow'
import { TournamentFollow } from './elements/Slider/TournamentFollow'
import { TournamentResult } from './elements/Slider/TournamentResult'
import { TopicFollow } from './elements/Slider/TopicFollow'
import useUserData from './useUserData'
import uesRecruitmentData from './useRecruitmentData'
import useEventData from './useEventData'
import { Box } from '@material-ui/core'
import useTournamentData from './useTournamentData'
import useTopicData from './useTopicData'
import { WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { WEBSYNC_PREFIX } from '@constants/sync.constants'
import { useAppDispatch } from '@store/hooks'

const DEFAULT_ORDER = [
  {
    key: 1,
    value: 'recommendedUser',
  },
  {
    key: 2,
    value: 'recommendedRecruitment',
  },
  {
    key: 3,
    value: 'recommendedEvent',
  },
  {
    key: 4,
    value: 'recruitmentFollow',
  },
  {
    key: 5,
    value: 'tournamentFollow',
  },
  {
    key: 6,
    value: 'tournamentResult',
  },
  {
    key: 7,
    value: 'topicFollow',
  },
]

type orderType = {
  key: number
  value: string
}

const HomeContainer: React.FC = () => {
  const [order] = useState<Array<orderType>>(DEFAULT_ORDER)
  const { recommendedUsers, getUserRecommendations } = useUserData()
  const { recommendedRecruitments, getRecruitmentRecommendations, recruitmentFollow, getRecruitmentFollow } = uesRecruitmentData()
  const { recommendedEventList, getRecommendedEventList } = useEventData()
  const { tournamentFollowers, tournamentResults, getTournamentFollowers, getTournamentResults } = useTournamentData()
  const { followersTopicList, getFollowersTopicList } = useTopicData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getUserRecommendations()
    getRecruitmentRecommendations()
    dispatch({
      type: `${WEBSOCKET_PREFIX}:CONNECT`,
    })
    dispatch({
      type: `${WEBSYNC_PREFIX}:CONNECT`,
    })
    getRecommendedEventList()
    getRecruitmentFollow()
    getTournamentFollowers()
    getTournamentResults()
    getFollowersTopicList()
  }, [])

  const renderItem = (val: string) => {
    switch (val) {
      case 'recommendedUser':
        return <RecommendedUser users={recommendedUsers} />
      case 'recommendedRecruitment':
        return <RecommendedRecruitment data={recommendedRecruitments} />
      case 'recommendedEvent':
        return <RecommendedEvent data={recommendedEventList} />
      case 'recruitmentFollow':
        return <RecruitmentFollow data={recruitmentFollow} />
      case 'tournamentFollow':
        return <TournamentFollow data={tournamentFollowers} />
      case 'tournamentResult':
        return <TournamentResult data={tournamentResults} />
      case 'topicFollow':
        return <TopicFollow data={followersTopicList} />
      default:
        return ''
    }
  }

  return (
    <>
      <Header />
      {order.map((item) => {
        return renderItem(item.value)
      })}
      <Box marginBottom={9} />
    </>
  )
}

export default HomeContainer
