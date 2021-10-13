import React, { useEffect, useState } from 'react'
import TopicDetailHeader from '@containers/Community/TopicDetail/Partials/TopicDetailHeader'
import Comment, { ReportData } from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Box, makeStyles, Theme } from '@material-ui/core'
import Pagination from '../Partials/Pagination'
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
import { useTranslation } from 'react-i18next'
import ESReport from '@containers/Report'
import useDocTitle from '@utils/hooks/useDocTitle'
import { useConfirm } from '@components/Confirm'
import { COMMUNITY_DIALOGS } from '@constants/community.constants'

const TopicDetailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { back } = useRouter()
  const confirm = useConfirm()
  const { topic_hash_key, hash_key, from } = router.query
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
    resetTopicDeleteMeta,
    createCommentMeta,
    deleteTopicCommentMeta,
    deleteTopicMeta,
  } = useTopicDetail()
  const { getCommunityDetail, communityDetail, isAuthenticated } = useCommunityDetail()
  const { isOwner } = useTopicHelper(topic?.attributes?.owner_user_code)
  const { isNotMember, isModerator, isPublic, isAutomatic } = useCommunityHelper(communityDetail)

  const [reply, setReply] = useState<{ hash_key: string; comment_no: number } | any>({})
  const [showCommentReply, setShowCommentReply] = useState<boolean[]>([])
  const [openDelete, setOpenDelete] = useState(false)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [selectedCommentNo, setSelectedCommentNo] = useState()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const [commentCount, setCommentCount] = useState<number>(0)
  const [render, setRender] = useState<boolean>(false)
  const { changeTitle } = useDocTitle()

  const data = topic?.attributes

  const menuParams = {
    isNotMember: isNotMember,
    isModerator: isModerator,
    isPublic: isPublic,
    isTopicOwner: isOwner,
  }

  const handleDeleteComment = () => {
    deleteComment({ comment_no: selectedCommentNo, topic_hash: String(topic_hash_key) })
  }

  useEffect(() => {
    if (deleteTopicMeta.loaded) {
      router.push(`${ESRoutes.COMMUNITY}/${router.query.hash_key}`)
      resetTopicMeta()
      resetTopicDeleteMeta()
    }
  }, [deleteTopicMeta])

  useEffect(() => {
    if (isAuthenticated && openDelete) {
      confirm({
        ...COMMUNITY_DIALOGS.DELETE_COMMENT,
      })
        .then(() => {
          handleDeleteComment()
        })
        .catch(() => {
          /* ... */
        })
    }
    setOpenDelete(false)
  }, [openDelete])

  useEffect(() => {
    if (topic_hash_key) {
      setIsOpened(true)
      getCommunityDetail(String(hash_key))
      getTopicDetail({ topic_hash: String(topic_hash_key), community_hash: String(hash_key) })
      getCommentsList({ hash_key: String(topic_hash_key) })
    }
    return () => {
      resetTopicMeta()
    }
  }, [router])

  useEffect(() => {
    if (!topicDetailMeta.pending && topicDetailMeta.loaded && !_.isEmpty(topic)) setCommentCount(topic.attributes.comment_count)
  }, [topicDetailMeta])

  useEffect(() => {
    if (topic_hash_key && isOpened) {
      getCommentsList({ hash_key: String(topic_hash_key), page: page })
    }
  }, [page])

  useEffect(() => {
    if (!commentsListMeta.pending && commentsListMeta.loaded) {
      setCount(commentsListPageMeta?.total_pages)
      _.map(commentsList, (__) => setShowCommentReply((comments) => [...comments, false]))
    }
  }, [commentsListMeta])

  useEffect(() => {
    if (topic) {
      const title = `${t('common:page_head.community_topic_detail_title')}｜${topic?.attributes?.title || ''}`
      changeTitle(title)
    }
  }, [topic])

  useEffect(() => {
    if (communityDetail && !isAutomatic && isNotMember) {
      router.push({ pathname: ESRoutes.COMMUNITY_DETAIL.replace(/:id/gi, String(hash_key)), query: { from: from } })
    } else {
      setRender(true)
    }
  }, [communityDetail])

  const handleDeleteTopic = () => {
    deleteTopic({ hash_key: String(topic_hash_key) })
  }

  const handleReportComment = (detail: ReportData) => {
    detail.attributes.topic_title = topic?.attributes?.title
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
          <ESFullLoader
            open={topicDetailMeta.pending || commentsListMeta.pending || createCommentMeta.pending || deleteTopicCommentMeta.pending}
          />
          {topicDetailMeta.loaded && (
            <>
              <TopicDetailHeader title={data?.title} isTopic={true} onHandleBack={handleBack} />
              <MainTopic topic={topic} handleDelete={handleDeleteTopic} community={communityDetail} comment_count={commentCount} />
            </>
          )}

          {!!commentsList &&
            !_.isEmpty(commentsList) &&
            _.map(commentsList, (comment, i) => {
              return (
                <Comment
                  key={i}
                  comment={comment}
                  menuParams={menuParams}
                  handleReply={setReply}
                  setOpenDelete={setOpenDelete}
                  setSelectedCommentNo={setSelectedCommentNo}
                  onReport={handleReportComment}
                  setShowComment={setShowCommentReply}
                  showComment={showCommentReply[i]}
                  index={i}
                />
              )
            })}
          {!_.isEmpty(commentsList) && (
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination page={page} pageNumber={count} setPage={setPage} disabled={commentsListMeta.pending} />
            </Box>
          )}
        </Box>

        {!isNotMember && (
          <Box className={classes.inputContainer}>
            <CommentInput
              reply_param={reply}
              setPage={setPage}
              setCommentCount={setCommentCount}
              commentCount={commentCount}
              setShowReply={setShowCommentReply}
            />
          </Box>
        )}
        {isAuthenticated && reportData && (
          <ESReport
            reportType={REPORT_TYPE.TOPIC_COMMENT}
            target_id={reportData.attributes.id}
            data={reportData}
            title={t('common:topic_comment.report.dialog_title')}
            open={reportData !== null}
            handleClose={() => setReportData(null)}
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
