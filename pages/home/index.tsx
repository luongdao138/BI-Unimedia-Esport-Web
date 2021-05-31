import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const HomePage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <HomeContainer />
    </MainLayout>
  )
}

export default HomePage
