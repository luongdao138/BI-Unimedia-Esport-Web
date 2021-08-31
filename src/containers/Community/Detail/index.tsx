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
import { TOPIC_STATUS } from '@constants/community.constants'
import useFollowList from './Partials/FollowList/useFollowList'
import { CommunityMemberRole } from '@services/community.service'

const CommunityContainer: React.FC = () => {
  const router = useRouter()
  const { hash_key } = router.query
  const [showTopicListAndSearchTab, setShowTopicListAndSearchTab] = useState<boolean>(true)
  const { handleBack, communityDetail, getCommunityDetail, topicList, getTopicList, meta } = useCommunityDetail()
  const { isAutomatic, isNotMember } = useCommunityHelper(communityDetail)
  const { getMembers } = useFollowList()

  useEffect(() => {
    if (hash_key) {
      getCommunityDetail(String(hash_key))
      getMembers({ hash_key: String(hash_key), role: CommunityMemberRole.all, page: 1 })
    }
  }, [router])

  useEffect(() => {
    if (communityDetail && !isAutomatic && isNotMember) {
      setShowTopicListAndSearchTab(false)
    } else {
      if (hash_key) {
        getTopicList({ community_hash: String(hash_key), filter: TOPIC_STATUS.ALL, page: 1 })
      }
      setShowTopicListAndSearchTab(true)
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
