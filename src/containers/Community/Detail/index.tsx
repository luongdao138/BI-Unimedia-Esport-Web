import React from 'react'
import CommunityDetailHeader from './Partials/CommunityDetailHeader'
import DetailInfo from './Partials/DetailInfo'
import useCommunityDetail from './useCommunityDetail'

const CommunityContainer: React.FC = () => {
  const { handleBack } = useCommunityDetail()

  const detail = {
    id: 60,
    attributes: {
      title: 'Ninjalaコミュニティ',
      cover: '/images/community_dummy_1.jpg',
    },
  }

  return (
    <>
      <CommunityDetailHeader title={detail?.attributes?.title} cover={detail?.attributes?.cover} onHandleBack={handleBack} />
      <DetailInfo detail={detail} />
    </>
  )
}

export default CommunityContainer
