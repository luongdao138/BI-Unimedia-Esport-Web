import { Header } from './elements/Header'
import { RecommendedUser } from './elements/Slider/RecommendedUser'
import { RecommendedRecruitment } from './elements/Slider/RecommendedRecruitment'
import { RecommendedEvent } from './elements/Slider/RecommendedEvent'
import { RecruitmentFollow } from './elements/Slider/RecruitmentFollow'
import { TournamentFollow } from './elements/Slider/TournamentFollow'
import { TournamentResult } from './elements/Slider/TournamentResult'
import { TopicFollow } from './elements/Slider/TopicFollow'

const HomeContainer: React.FC = () => {
  return (
    <>
      <Header />
      <RecommendedUser />
      <RecommendedRecruitment />
      <RecommendedEvent />
      <RecruitmentFollow />
      <TournamentFollow />
      <TournamentResult />
      <TopicFollow />
    </>
  )
}

export default HomeContainer
