import IntroContainer from '@containers/Login/Intro'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const Welcome: PageWithLayoutType = () => {
  return <IntroContainer />
}

Welcome.Layout = AuthenticationLayout

export default Welcome
