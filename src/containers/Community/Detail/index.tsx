import BlankLayout from '@layouts/BlankLayout'
import React from 'react'
import useCommunityHelper from '../hooks/useCommunityHelper'
import UpsertForm from '../UpsertForm'
import CommunityDetailHeader from './Partials/CommunityDetailHeader'
import DetailInfo from './Partials/DetailInfo'
import useCommunityDetail from './useCommunityDetail'
import ESModal from '@components/Modal'
import { useRouter } from 'next/router'

const CommunityContainer: React.FC = () => {
  const { handleBack } = useCommunityDetail()
  const router = useRouter()

  const detail = {
    id: 60,
    attributes: {
      title: 'Ninjalaコミュニティ',
      cover: '/images/community_dummy_1.jpg',
      hash_key: '1231231',
      my_role: 'admin',
      is_official: false,
      is_private: true,
    },
  }
  const { toEdit } = useCommunityHelper(detail)

  const renderBody = () => {
    return (
      <>
        <CommunityDetailHeader title={detail?.attributes?.title} cover={detail?.attributes?.cover} onHandleBack={handleBack} />
        <DetailInfo detail={detail} toEdit={toEdit} />
      </>
    )
  }

  return (
    <>
      {renderBody()}
      <ESModal open={router.asPath.endsWith('/edit')}>
        <BlankLayout>
          <UpsertForm communityName={detail.attributes.title} />
        </BlankLayout>
      </ESModal>
    </>
  )
}

export default CommunityContainer
