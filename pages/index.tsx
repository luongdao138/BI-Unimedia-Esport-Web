import TopContainer from '@containers/Top'
import LandingPageLayout from '@layouts/LandingPageLayout'

const TopPage = () => {
  return (
    <LandingPageLayout>
      <TopContainer />
    </LandingPageLayout>
  )
}

TopPage.Layout = LandingPageLayout

export default TopPage
