import TopContainer from '@containers/Top'
import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'

const TopPage: PageWithLayoutType = () => {
  return <TopContainer />
}

TopPage.Layout = PlainLayout

export default TopPage
