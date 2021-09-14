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
import { Box, Grid } from '@material-ui/core'
import { TOPIC_STATUS } from '@constants/community.constants'

const CommunityContainer: React.FC = () => {
  const router = useRouter()
  const { hash_key } = router.query
  const [showTopicListAndSearchTab, setShowTopicListAndSearchTab] = useState<boolean>(true)
  const { handleBack, communityDetail, getCommunityDetail, topicList, getTopicList, meta } = useCommunityDetail()
  const { isAutomatic, isNotMember } = useCommunityHelper(communityDetail)

  useEffect(() => {
    if (hash_key) {
      getCommunityDetail(String(hash_key))
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
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
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
