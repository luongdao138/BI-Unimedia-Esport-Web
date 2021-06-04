import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import { BattlesContainer } from '@containers/arena'

const ArenaBattlesPage: PageWithLayoutType = () => {
  return <BattlesContainer />
}

PlainLayout.defaultProps = {
  noFooter: true,
}

ArenaBattlesPage.Layout = PlainLayout

export default ArenaBattlesPage
