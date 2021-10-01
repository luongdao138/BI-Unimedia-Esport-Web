import { useEffect } from 'react'
import { Header } from './elements/Header'
import { RecommendedUser } from './elements/Slider/RecommendedUser'
// import { RecommendedEvent } from './elements/Slider/RecommendedEvent'
import { TournamentFollow } from './elements/Slider/TournamentFollow'
import { TournamentResult } from './elements/Slider/TournamentResult'
import { TopicFollow } from './elements/Slider/TopicFollow'
import useUserData from './useUserData'
// import useEventData from './useEventData'
import { Box } from '@material-ui/core'
import useTournamentData from './useTournamentData'
import useTopicData from './useTopicData'
import { HOME_SETTINGS } from '@constants/common.constants'
import ESLoader from '@components/FullScreenLoader'
import { RecentLobbies } from '@containers/Home/elements/Slider/RecentLobbies'
import { RecommendedLobbies } from './elements/Slider/RecommendedLobbies'

const HomeContainer: React.FC = () => {
  const { recommendedUsers, getUserRecommendations, homeSettings, getUserProfile, metaHomeSettings } = useUserData()
  // const { recommendedEventList, getRecommendedEventList } = useEventData()
  const {
    tournamentFollowers,
    tournamentResults,
    getTournamentFollowers,
    getTournamentResults,
    tournamentFollowersMeta,
    tournamentResultsMeta,
  } = useTournamentData()
  const { followersTopicList, followersTopicListMeta, getFollowersTopicList, resetFollowersTopicList } = useTopicData()

  useEffect(() => {
    getUserProfile()
    getUserRecommendations()
    // getRecommendedEventList()
    getTournamentFollowers()
    getTournamentResults()
    getFollowersTopicList()
    return () => {
      resetFollowersTopicList()
    }
  }, [])

  const renderItem = (value: string, index: number) => {
    switch (value) {
      case HOME_SETTINGS.RECOMMENDED_USER:
        return <RecommendedUser users={recommendedUsers} key={index} />
      case HOME_SETTINGS.LOBBY_RECOMMENDED:
        return <RecommendedLobbies key={index} />
      // case HOME_SETTINGS.RECOMMENDED_EVENT:
      //   return <RecommendedEvent data={recommendedEventList} key={index} />
      case HOME_SETTINGS.LOBBY_FOLLOW:
        return <RecentLobbies key={index} />
      case HOME_SETTINGS.TOURNAMENT_FOLLOW:
        return <TournamentFollow data={tournamentFollowers} key={index} meta={tournamentFollowersMeta} />
      case HOME_SETTINGS.TOURNAMENT_RESULT:
        return <TournamentResult data={tournamentResults} key={index} meta={tournamentResultsMeta} />
      case HOME_SETTINGS.TOPIC_FOLLOW:
        return <TopicFollow data={followersTopicList} key={index} meta={followersTopicListMeta} />
      default:
        return ''
    }
  }

  return (
    <>
      <Header />
      {homeSettings.map((value, index) => {
        return renderItem(value, index)
      })}
      {metaHomeSettings.pending && <ESLoader open={metaHomeSettings.pending} />}
      <Box marginBottom={9} />
    </>
  )
}

export default HomeContainer
