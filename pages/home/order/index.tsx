import HomeOrderContainer from '@containers/Home/Order'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const HomeOrderPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <HomeOrderContainer />
    </MainLayout>
  )
}

export default HomeOrderPage
