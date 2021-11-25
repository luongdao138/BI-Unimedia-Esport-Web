import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import ArchiveDetailContainer from '@containers/ArchiveDetailContainer'

const ArchiveDetailPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <ArchiveDetailContainer />
    </StreamLayout>
  )
}

export default ArchiveDetailPage
