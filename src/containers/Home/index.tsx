/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'
import { Header } from './elements/Header'
import { RecommendedUser } from './elements/Slider/RecommendedUser'
// import { RecommendedEvent } from './elements/Slider/RecommendedEvent'
import { TournamentFollow } from './elements/Slider/TournamentFollow'
import { TournamentResult } from './elements/Slider/TournamentResult'
import { TopicFollow } from './elements/Slider/TopicFollow'
import useUserData from './useUserData'
// import useEventData from './useEventData'
import { Box, useMediaQuery, useTheme } from '@material-ui/core'
import useTournamentData from './useTournamentData'
import useTopicData from './useTopicData'
import { HOME_SETTINGS } from '@constants/common.constants'
import ESLoader from '@components/FullScreenLoader'
import { RecentLobbies } from '@containers/Home/elements/Slider/RecentLobbies'
import { RecommendedLobbies } from './elements/Slider/RecommendedLobbies'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'

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
  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')

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

  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.HOME, screenDownSP))
  }, [screenDownSP])

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
      {!screenDownSP && <div id="ad_home_top" className="ad_home_t google_ad_patten_1" />}
      {/* GADS: Home */}
      {!screenDownSP && (
        <GoogleAd id={{ idPatten1: 'ad_home_t' }} slot={slotDataLayer} idTag={'ad_home_t'} currenPath={window.location.href} />
      )}
      <Header />
      {homeSettings.map((value, index) => {
        return renderItem(value, index)
      })}
      {metaHomeSettings.pending && <ESLoader open={metaHomeSettings.pending} />}
      <Box marginBottom={9} />
      {screenDownSP && (
        <GoogleAd id={{ idPatten3: 'ad_home_b' }} idTag={'ad_home_b'} slot={slotDataLayer} currenPath={window.location.href} />
      )}
      {screenDownSP && <div id={'ad_home_bottom'} className="ad_home_b google_ad_patten_3" />}
    </>
  )
}

export default HomeContainer
