import React, { useEffect, useState } from 'react'
import BlankLayout from '@layouts/BlankLayout'
import useCommunityHelper from '../hooks/useCommunityHelper'
import UpsertForm from '../UpsertForm'
import CommunityDetailHeader from './Partials/CommunityDetailHeader'
import DetailInfo from './Partials/DetailInfo'
import useCommunityDetail from './useCommunityDetail'
import ESModal from '@components/Modal'
import { useRouter } from 'next/router'
import ESLoader from '@components/Loader'
import { Box } from '@material-ui/core'
import { TOPIC_STATUS, JOIN_CONDITION } from '@constants/community.constants'

const CommunityContainer: React.FC = () => {
  const router = useRouter()
  const { community_id } = router.query
  const [showTopicListAndSearchTab, setShowTopicListAndSearchTab] = useState<boolean>(true)
  const { handleBack, communityDetail, getCommunityDetail, topicList, getTopicList, meta } = useCommunityDetail()

  useEffect(() => {
    if (community_id) {
      const communityId = String(community_id)
      getCommunityDetail(communityId)
    }
  }, [router])

  useEffect(() => {
    if (
      communityDetail &&
      communityDetail.attributes.join_condition === JOIN_CONDITION.MANUAL &&
      communityDetail.attributes.member_role === null
    ) {
      setShowTopicListAndSearchTab(false)
      if (community_id) {
        const communityId = String(community_id)
        getTopicList({ community_id: communityId, filter: TOPIC_STATUS.ALL, page: 1 })
      }
    }
  }, [communityDetail])

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
            <DetailInfo
              detail={communityDetail}
              topicList={topicList}
              toEdit={toEdit}
              showTopicListAndSearchTab={showTopicListAndSearchTab}
            />
          </>
        )}
        {meta.pending && (
          <Box textAlign="center">
            <ESLoader />
          </Box>
        )}
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
