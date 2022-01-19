import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import ArchiveDetail from '@containers/ArchiveDetailContainer'

const ArchiveDetailPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <ArchiveDetail />
    </StreamLayout>
  )
}

export default ArchiveDetailPage
