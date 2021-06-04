import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import { BattlesEditContainer } from '@containers/arena'

const ArenaBattleEditPage: PageWithLayoutType = () => {
  return <BattlesEditContainer />
}
PlainLayout.defaultProps = {
  noFooter: true,
}
ArenaBattleEditPage.Layout = PlainLayout

export default ArenaBattleEditPage
