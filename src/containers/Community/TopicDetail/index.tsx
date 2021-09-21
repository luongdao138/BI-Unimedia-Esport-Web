import React, { useEffect, useState } from 'react'
import TopicDetailHeader from '@containers/Community/TopicDetail/Partials/TopicDetailHeader'
import Comment, { ReportData } from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Box, useMediaQuery, useTheme, makeStyles, Theme } from '@material-ui/core'
import PaginationSmall from '../Partials/PaginationSmall'
import PaginationBig from '../Partials/PaginationBig'
import CommentInput from './Partials/CommentInput'
import useTopicDetail from './useTopicDetail'
import { Colors } from '@theme/colors'
import ESFullLoader from '@components/FullScreenLoader'
import { useRouter } from 'next/router'
import useCommunityDetail from '../Detail/useCommunityDetail'
import useCommunityHelper from '../hooks/useCommunityHelper'
import useTopicHelper from './useTopicHelper'
import _ from 'lodash'
import { ESRoutes } from '@constants/route.constants'
import { REPORT_TYPE } from '@constants/common.constants'

import DiscardDialog from '@containers/Community/Partials/DiscardDialog'
import { useTranslation } from 'react-i18next'
import ESReport from '@containers/Report'

const TopicDetailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const classes = useStyles()
  const router = useRouter()
  const { back } = useRouter()
  const { topic_hash_key, hash_key } = router.query
  const {
    getTopicDetail,
    topic,
    topicDetailMeta,
    deleteTopic,
    getCommentsList,
    commentsList,
    commentsListMeta,
    commentsListPageMeta,
    deleteComment,
    resetTopicMeta,
  } = useTopicDetail()
  const { getCommunityDetail, communityDetail, isAuthenticated } = useCommunityDetail()
  const { isOwner } = useTopicHelper(topic?.attributes?.owner_user_code)
  const { isNotMember, isModerator, isPublic, isAutomatic } = useCommunityHelper(communityDetail)

  const [reply, setReply] = useState<{ hash_key: string; comment_no: number } | any>({})
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedCommentNo, setSelectedCommentNo] = useState()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const [commentCount, setCommentCount] = useState<number>()
  const [render, setRender] = useState<boolean>(false)

  const data = topic?.attributes

  const menuParams = {
    isNotMember: isNotMember,
    isModerator: isModerator,
    isPublic: isPublic,
    isTopicOwner: isOwner,
  }

  const handleDeleteComment = () => {
    deleteComment({ comment_no: selectedCommentNo, topic_hash: String(topic_hash_key) })
    setOpenDelete(false)
  }

  useEffect(() => {
    getCommentsList({ hash_key: String(topic_hash_key), page: 1 })
    return () => {
      resetTopicMeta()
    }
  }, [])

  useEffect(() => {
    if (topic_hash_key) {
      getCommunityDetail(String(hash_key))
      getTopicDetail({ topic_hash: String(topic_hash_key), community_hash: String(hash_key) })
      getCommentsList({ hash_key: String(topic_hash_key) })
    }
  }, [router])

  useEffect(() => {
    if (!topicDetailMeta.pending && topicDetailMeta.loaded && !_.isEmpty(topic)) setCommentCount(topic.attributes.comment_count)
  }, [topicDetailMeta])

  useEffect(() => {
    getCommentsList({ hash_key: String(topic_hash_key), page: page })
  }, [page])

  useEffect(() => {
    if (!commentsListMeta.pending && commentsListMeta.loaded) {
      setCount(commentsListPageMeta?.total_pages)
    }
  }, [commentsListMeta])

  useEffect(() => {
    if (communityDetail && !isAutomatic && isNotMember) {
      router.push(ESRoutes.COMMUNITY_DETAIL.replace(/:id/gi, String(hash_key)))
    } else {
      setRender(true)
    }
  }, [communityDetail])

  const handleDeleteTopic = () => {
    deleteTopic({ hash_key: String(topic_hash_key) })
  }

  const handleReportComment = (detail: ReportData) => {
    setReportData(detail)
  }

  const handleBack = () => back()

  if (!render) {
    return <></>
  }

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flex={1}>
          <ESFullLoader open={topicDetailMeta.pending || commentsListMeta.pending} />
          {topicDetailMeta.loaded && (
            <>
              <TopicDetailHeader title={data?.title} isTopic={true} onHandleBack={handleBack} />
              <MainTopic topic={topic} handleDelete={handleDeleteTopic} community={communityDetail} comment_count={commentCount} />
            </>
          )}

          {!!commentsList &&
            !_.isEmpty(commentsList) &&
            _.map(_.reverse([...commentsList]), (comment, i) => {
              return (
                <Comment
                  key={i}
                  comment={comment}
                  menuParams={menuParams}
                  handleReply={setReply}
                  setOpenDelete={setOpenDelete}
                  setSelectedCommentNo={setSelectedCommentNo}
                  onReport={handleReportComment}
                />
              )
            })}
          {!_.isEmpty(commentsList) && (
            <Box display="flex" justifyContent="center" my={2}>
              {isMobile ? (
                <PaginationSmall page={page} pageNumber={count} setPage={setPage} disabled={commentsListMeta.pending} />
              ) : (
                <PaginationBig page={page} pageNumber={count} setPage={setPage} disabled={commentsListMeta.pending} />
              )}
            </Box>
          )}
        </Box>

        {!isNotMember && (
          <Box className={classes.inputContainer}>
            <CommentInput reply_param={reply} setPage={setPage} setCommentCount={setCommentCount} commentCount={commentCount} />
          </Box>
        )}
        {isAuthenticated && reportData && (
          <ESReport
            reportType={REPORT_TYPE.TOPIC_COMMENT}
            target_id={reportData.attributes.hash_key}
            data={reportData}
            open={reportData !== null}
            handleClose={() => setReportData(null)}
          />
        )}
        {isAuthenticated && (
          <DiscardDialog
            title={t('common:topic_comment.delete.title')}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={handleDeleteComment}
            description={t('common:topic_comment.delete.description')}
            confirmTitle={t('common:topic_comment.delete.submit')}
          />
        )}
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'sticky',
    bottom: 0,
    padding: 11,
    width: '100%',
    background: '#101010',
    willChange: 'transform',
    zIndex: 2,
  },
  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    zIndex: 1,
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderRadius: 4,
    },
    '& .MuiPaginationItem-outlined': {
      borderColor: Colors.primary,
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
      color: Colors.white,
    },
    '& .MuiPaginationItem-ellipsis': {
      height: 32,
      border: '1px solid',
      borderColor: Colors.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))

export default TopicDetailContainer
