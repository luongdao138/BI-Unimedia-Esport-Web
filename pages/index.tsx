import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <HomeContainer />
    </MainLayout>
  )
}

HomePage.Layout = MainLayout

export default HomePage
