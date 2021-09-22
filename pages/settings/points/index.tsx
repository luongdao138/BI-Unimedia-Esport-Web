import PageWithLayoutType from '@constants/page'
import PointManage from '@containers/PointManage'
import MainLayout from '@layouts/MainLayout'

const PointManagement: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <PointManage />
    </MainLayout>
  )
}

export default PointManagement
