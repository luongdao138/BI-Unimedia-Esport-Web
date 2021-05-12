import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const HomePage: React.FC = () => {
  return <HomeContainer />
}

;(HomePage as PageWithLayoutType).Layout = MainLayout

export default HomePage
