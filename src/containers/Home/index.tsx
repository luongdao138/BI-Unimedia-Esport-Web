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
import recruitmentData from './useRecruitmentData'

const HomeContainer: React.FC = () => {
  const { recommendedUsers, getUserRecommendations } = useUserData()
  const { recommendedRecruitments, getRecruitmentRecommendations } = recruitmentData()

  useEffect(() => {
    getUserRecommendations()
    getRecruitmentRecommendations()
  }, [])

  return (
    <>
      <Header />
      <RecommendedUser users={recommendedUsers} />
      <RecommendedRecruitment data={recommendedRecruitments} />
      <RecommendedEvent />
      <RecruitmentFollow />
      <TournamentFollow />
      <TournamentResult />
      <TopicFollow />
    </>
  )
}

export default HomeContainer
