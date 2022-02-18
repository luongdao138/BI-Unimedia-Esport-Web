import React, { useEffect, useState } from 'react'
import BlankLayout from '@layouts/BlankLayout'
import useCommunityHelper from '../hooks/useCommunityHelper'
import UpsertForm from '../UpsertForm'
import TopicUpsertForm from '../Topic/UpsertForm'
import CommunityDetailHeader from './Partials/CommunityDetailHeader'
import DetailInfo from './Partials/DetailInfo'
import useCommunityDetail, { useClearMeta } from './useCommunityDetail'
import ESModal from '@components/Modal'
import { useRouter } from 'next/router'
import ESLoader from '@components/Loader'
import { Box, Grid } from '@material-ui/core'
import _ from 'lodash'
import { ESRoutes } from '@constants/route.constants'
import { ROUTE_FROM } from '@constants/community.constants'

const CommunityContainer: React.FC = () => {
  const router = useRouter()

  useClearMeta()

  const { hash_key, from } = router.query
  const [showTopicListAndSearchTab, setShowTopicListAndSearchTab] = useState<boolean>(true)
  const { handleBack, communityDetail, getCommunityDetail, topicList, meta } = useCommunityDetail()
  const { isAutomatic, isNotMember } = useCommunityHelper(communityDetail)

  useEffect(() => {
    if (hash_key) {
      getCommunityDetail(String(hash_key))
    }
  }, [router])

  useEffect(() => {
    if (!meta.pending && meta.error) {
      router.push(ESRoutes.COMMUNITY)
    }
  }, [meta])

  useEffect(() => {
    if (communityDetail && !isAutomatic && isNotMember) {
      setShowTopicListAndSearchTab(false)
    } else {
      setShowTopicListAndSearchTab(true)
    }
  }, [communityDetail])

  const goToTopicFollower = () => {
    router.push(ESRoutes.TOPIC_FOLLOWER)
  }

  const goToHomeTopic = () => {
    router.push(ESRoutes.HOME)
  }

  const renderBody = () => {
    return (
      <>
        {!_.isEmpty(communityDetail) && (
          <>
            <CommunityDetailHeader
              title={communityDetail.attributes.name}
              cover={communityDetail.attributes.cover_image_url}
              onHandleBack={from === ROUTE_FROM.HOME ? goToHomeTopic : from === ROUTE_FROM.FOLLOWERS ? goToTopicFollower : handleBack}
            />
            <DetailInfo detail={communityDetail} topicList={topicList} showTopicListAndSearchTab={showTopicListAndSearchTab} />
          </>
        )}
        {communityDetail === null && !meta.loaded && meta.pending && (
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
      <ESModal open={router.asPath.endsWith('/topic/create')}>
        <BlankLayout isWide={true}>
          <TopicUpsertForm />
        </BlankLayout>
      </ESModal>
    </>
  )
}

export default CommunityContainer
