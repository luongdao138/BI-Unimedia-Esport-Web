import React, { useEffect, useState, createRef } from 'react'
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
import { Box, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import _ from 'lodash'
import TopicCreateButton from '@containers/Community/Partials/TopicCreateButton'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { useRect } from '@utils/hooks/useRect'
import { ESRoutes } from '@constants/route.constants'
import { ROUTE_FROM } from '@constants/community.constants'

let topicCreateRightPx: number
type StyleParams = {
  topicCreateRightPx: number
}
const StyledBox = styled(Box)``
const contentRef = createRef<HTMLDivElement>()

const CommunityContainer: React.FC = () => {
  const router = useRouter()
  const contentRect = useRect(contentRef)
  topicCreateRightPx = contentRect.left
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'), { noSsr: true })

  const classes = useStyles({ topicCreateRightPx })

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
    if (communityDetail && !isAutomatic && isNotMember) {
      setShowTopicListAndSearchTab(false)
    } else {
      setShowTopicListAndSearchTab(true)
    }
  }, [communityDetail])

  const { toEdit, toCreateTopic } = useCommunityHelper(communityDetail)

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
            <DetailInfo
              detail={communityDetail}
              topicList={topicList}
              toEdit={toEdit}
              showTopicListAndSearchTab={showTopicListAndSearchTab}
            />
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
      <StyledBox ref={contentRef}>
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
        {!isNotMember && (
          <Box className={classes.topicCreateContainer}>
            <TopicCreateButton onClick={toCreateTopic} isMobile={isMobile} />
          </Box>
        )}
      </StyledBox>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  topicCreateContainer: {
    zIndex: 50,
    display: 'flex',
    justifyContent: 'flex-end',
    width: 99,
    right: (props: StyleParams) => props.topicCreateRightPx + 24,
    position: 'fixed',
    bottom: theme.spacing(5),
  },
  [theme.breakpoints.down('sm')]: {
    topicCreateContainer: {
      bottom: theme.spacing(3),
    },
  },
}))

export default CommunityContainer
