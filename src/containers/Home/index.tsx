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
import recruitmentData from './useRecruitmentData'
import { Box } from '@material-ui/core'
// import tournamentData from './useTournamentData'
// import topicData from './useTopicData'
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
  const { recommendedRecruitments, getRecruitmentRecommendations } = recruitmentData()

  useEffect(() => {
    getUserRecommendations()
    getRecruitmentRecommendations()
  }, [])

  // RECRUITMENT_RECOMMENDED: '/recruitment/recommended',
  // RECRUITMENT_FOLLOWER: '/recruitment/follower',
  // EVENT_RECOMMENDED: '/event/recommended',
  // TOURNAMENT_FOLLOWER_ENTERING: '/tournament/follower/entering',
  // TOURNAMENT_FOLLOWER_ENDED: '/tournament/follower/ended',
  // TOPIC_FOLLOWER: '/topic/follower',
  const renderItem = (val: string) => {
    switch (val) {
      case 'recommendedUser':
        return <RecommendedUser users={recommendedUsers} />
      case 'recommendedRecruitment':
        return <RecommendedRecruitment data={recommendedRecruitments} />
      case 'recommendedEvent':
        return <RecommendedEvent />
      case 'recruitmentFollow':
        return <RecruitmentFollow />
      case 'tournamentFollow':
        return <TournamentFollow />
      case 'tournamentResult':
        return <TournamentResult />
      case 'topicFollow':
        return <TopicFollow />
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
