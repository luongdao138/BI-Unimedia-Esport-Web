import { useEffect } from 'react'
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
import { HOME_SETTINGS } from '@constants/common.constants'

const HomeContainer: React.FC = () => {
  const { recommendedUsers, getUserRecommendations, homeSettings, getUserProfile } = useUserData()
  const { recommendedRecruitments, getRecruitmentRecommendations, recruitmentFollow, getRecruitmentFollow } = uesRecruitmentData()
  const { recommendedEventList, getRecommendedEventList } = useEventData()
  const { tournamentFollowers, tournamentResults, getTournamentFollowers, getTournamentResults } = useTournamentData()
  const { followersTopicList, getFollowersTopicList } = useTopicData()

  useEffect(() => {
    getUserProfile()
    getUserRecommendations()
    getRecruitmentRecommendations()
    getRecommendedEventList()
    getRecruitmentFollow()
    getTournamentFollowers()
    getTournamentResults()
    getFollowersTopicList()
  }, [])

  const renderItem = (value: string) => {
    switch (value) {
      case HOME_SETTINGS.RECOMMENDED_USER:
        return <RecommendedUser users={recommendedUsers} />
      case HOME_SETTINGS.RECOMMENDED_RECRUITMENT:
        return <RecommendedRecruitment data={recommendedRecruitments} />
      case HOME_SETTINGS.RECOMMENDED_EVENT:
        return <RecommendedEvent data={recommendedEventList} />
      case HOME_SETTINGS.RECRUITMENT_FOLLOW:
        return <RecruitmentFollow data={recruitmentFollow} />
      case HOME_SETTINGS.TOURNAMENT_FOLLOW:
        return <TournamentFollow data={tournamentFollowers} />
      case HOME_SETTINGS.TOURNAMENT_RESULT:
        return <TournamentResult data={tournamentResults} />
      case HOME_SETTINGS.TOPIC_FOLLOW:
        return <TopicFollow data={followersTopicList} />
      default:
        return ''
    }
  }

  return (
    <>
      <Header />
      {homeSettings.map((value) => {
        return renderItem(value)
      })}
      <Box marginBottom={9} />
    </>
  )
}

export default HomeContainer
