import PageWithLayoutType from '@constants/page'
import ArchivedListContainer from '@containers/ArchivedListContainer'
import StreamerRequireLayout from '@layouts/StreamerRequireLayout'

const ArchivedListPage: PageWithLayoutType = () => {
  return (
    <StreamerRequireLayout>
      <ArchivedListContainer />
    </StreamerRequireLayout>
  )
}

export default ArchivedListPage
