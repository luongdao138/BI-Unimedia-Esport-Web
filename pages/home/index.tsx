import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HomeContainer />
    </MainLayout>
  )
}

export default HomePage
