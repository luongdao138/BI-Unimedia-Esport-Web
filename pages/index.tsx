import HomeContainer from '@containers/Home'
import MainLayout from '@layout/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <HomeContainer />
    </MainLayout>
  )
}

HomePage.Layout = MainLayout

export default HomePage
