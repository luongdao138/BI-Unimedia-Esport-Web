import BlankLayout from '@layouts/BlankLayout'
import React, { useEffect } from 'react'
import useCommunityHelper from '../hooks/useCommunityHelper'
import UpsertForm from '../UpsertForm'
import CommunityDetailHeader from './Partials/CommunityDetailHeader'
import DetailInfo from './Partials/DetailInfo'
import useCommunityDetail from './useCommunityDetail'
import ESModal from '@components/Modal'
import { useRouter } from 'next/router'
import ESLoader from '@components/Loader'

const CommunityContainer: React.FC = () => {
  const router = useRouter()
  const { handleBack, communityDetail, getCommunityDetail, meta } = useCommunityDetail('260')

  useEffect(() => {
    getCommunityDetail()
  }, [])

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
        {!!communityDetail && meta.loaded && !meta.pending && (
          <>
            <CommunityDetailHeader
              title={communityDetail.attributes.name}
              cover={communityDetail.attributes.cover_image_url}
              onHandleBack={handleBack}
            />
            <DetailInfo detail={communityDetail} toEdit={toEdit} />
          </>
        )}
        {meta.pending && <ESLoader />}
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
