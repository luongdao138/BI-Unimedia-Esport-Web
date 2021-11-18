import React, { useEffect, useState } from 'react'
import TopicDetailHeader from '@containers/Community/TopicDetail/Partials/TopicDetailHeader'
import Comment, { ReportData } from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Box } from '@material-ui/core'
import Pagination from '../Partials/Pagination'
import CommentInput from './Partials/CommentInput'
import useTopicDetail, { useClearMeta } from './useTopicDetail'
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
import ListContainer from './Partials/ListContainer'
import { use100vh } from 'react-div-100vh'

const TopicDetailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
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

  const height = use100vh()

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

  useClearMeta()

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

  const handleBack = () => router.push({ pathname: ESRoutes.COMMUNITY_DETAIL.replace(/:id/gi, String(hash_key)) })

  if (!render) {
    return <></>
  }

  return (
    <>
      <Box display="flex" height={height - 60} overflow="hidden" flexDirection="column">
        <ListContainer height="100%">
          <Box>
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
                    windowHeight={height}
                  />
                )
              })}
            {!_.isEmpty(commentsList) && (
              <Box display="flex" justifyContent="center" my={2}>
                <Pagination page={page} pageNumber={count} setPage={setPage} disabled={commentsListMeta.pending} />
              </Box>
            )}
          </Box>
        </ListContainer>
        <Box flexGrow={1}>
          {!isNotMember && (
            <CommentInput
              reply_param={reply}
              setPage={setPage}
              setCommentCount={setCommentCount}
              commentCount={commentCount}
              setShowReply={setShowCommentReply}
            />
          )}
        </Box>
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

export default TopicDetailContainer
