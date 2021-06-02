import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import ArenaBattles from '@containers/ArenaBattles'

const ArenaBattlesPage: PageWithLayoutType = () => {
  return <ArenaBattles />
}

PlainLayout.defaultProps = {
  noFooter: true,
}

ArenaBattlesPage.Layout = PlainLayout

export default ArenaBattlesPage
