import { useEffect } from 'react'
import {
  TopicDetail,
  TopicDetailParams,
  CommentCreateParams,
  CommentsResponse,
  CommentsListParams,
  PageMeta,
  TopicDeleteParams,
  CommentDetailParams,
  CommentDetail,
  DeleteCommentParams,
} from '@services/community.service'
import community from '@store/community'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as commonActions from '@store/common/actions'
import { clearMetaData } from '@store/metadata/actions'
import { useTranslation } from 'react-i18next'

const { selectors, actions } = community
const getTopicDetailMeta = createMetaSelector(actions.getTopicDetail)
const getCreateCommentMeta = createMetaSelector(actions.createTopicComment)
const getDeleteTopicMeta = createMetaSelector(actions.deleteTopic)
const getTopicCommentMeta = createMetaSelector(actions.getTopicComment)
const getCommentsListMeta = createMetaSelector(actions.getCommentsList)
const getDeleteTopicCommentMeta = createMetaSelector(actions.deleteTopicComment)

const useTopicDetail = (): {
  topic: TopicDetail
  commentDetail: CommentDetail
  getTopicDetail: (TopicDetailParams) => void
  getCommentDetail: (CommentDetailParams) => void
  getCommentsList: (CommentsListParams) => void
  deleteTopic: (TopicDetailParams) => void
  resetCommentDetail: () => void
  resetMeta: () => void
  topicDetailMeta: Meta
  deleteTopicMeta: Meta
  commentDetailMeta: Meta
  createComment: (params: CommentCreateParams) => void
  createCommentMeta: Meta
  deleteComment: (params: DeleteCommentParams) => void
  commentsListMeta: Meta
  commentsListPageMeta: PageMeta
  commentsList: CommentsResponse[]
} => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const router = useRouter()

  const topic = useAppSelector(selectors.getTopicDetail)
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)
  const deleteTopicMeta = useAppSelector(getDeleteTopicMeta)
  const commentDetailMeta = useAppSelector(getTopicCommentMeta)
  const commentDetail = useAppSelector(selectors.getCommentDetail)
  const createCommentMeta = useAppSelector(getCreateCommentMeta)
  const deleteTopicCommentMeta = useAppSelector(getDeleteTopicCommentMeta)

  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const getCommentDetail = (param: CommentDetailParams) => dispatch(actions.getTopicComment(param))
  const resetCommentDetail = () => dispatch(actions.resetCommentDetail())
  const resetTopicMeta = () => dispatch(actions.clearTopicDetail())
  const createComment = (params: CommentCreateParams) => dispatch(actions.createTopicComment(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommentsList.typePrefix))
  const deleteComment = (params: DeleteCommentParams) => {
    dispatch(actions.deleteTopicComment(params))
  }
  const deleteTopic = (params: TopicDeleteParams) => {
    dispatch(actions.deleteTopic(params))
  }

  const commentsListPageMeta = useAppSelector(selectors.getCommentsListMeta)
  const commentsListMeta = useAppSelector(getCommentsListMeta)
  const commentsList = useAppSelector(selectors.getCommentsList)
  const getCommentsList = (param: CommentsListParams) => dispatch(actions.getCommentsList(param))

  useEffect(() => {
    if (deleteTopicCommentMeta.loaded) {
      dispatch(commonActions.addToast(t('common:topic_comment.delete.success_toast')))
    }
  }, [deleteTopicCommentMeta])

  useEffect(() => {
    if (deleteTopicMeta.loaded) {
      dispatch(commonActions.addToast(t('common:community.topic.delete_success')))
      router.push(`${ESRoutes.COMMUNITY}/${router.query.hash_key}`)
      resetTopicMeta()
    }
  }, [deleteTopicMeta])

  useEffect(() => {
    return () => {
      resetTopicMeta()
    }
  }, [])

  return {
    getTopicDetail,
    getCommentDetail,
    topicDetailMeta,
    topic,
    commentDetail,
    deleteTopic,
    deleteTopicMeta,
    createComment,
    deleteComment,
    resetMeta,
    resetCommentDetail,
    getCommentsList,
    commentDetailMeta,
    commentsList,
    commentsListMeta,
    commentsListPageMeta,
    createCommentMeta,
  }
}

export default useTopicDetail
