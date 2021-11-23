import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import ArchivedListContainer from '@containers/ArchivedListContainer'

const ArchivedListPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <ArchivedListContainer />
    </StreamLayout>
  )
}

export default ArchivedListPage
