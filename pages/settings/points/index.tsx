import StreamLayout from '@layouts/StreamLayout'
import PageWithLayoutType from '@constants/page'
import PointManage from '@containers/PointManage'

const PointManagement: PageWithLayoutType = () => {
  return (
    <StreamLayout>
      <PointManage />
    </StreamLayout>
  )
}

export default PointManagement
