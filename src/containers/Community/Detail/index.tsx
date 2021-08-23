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
  const { community_id } = router.query
  const { handleBack, communityDetail, getCommunityDetail, meta } = useCommunityDetail()

  useEffect(() => {
    if (community_id) getCommunityDetail(String(community_id))
  }, [router])

  const { toEdit } = useCommunityHelper(communityDetail)

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
          <UpsertForm communityName={communityDetail?.attributes?.name} />
        </BlankLayout>
      </ESModal>
    </>
  )
}

export default CommunityContainer
