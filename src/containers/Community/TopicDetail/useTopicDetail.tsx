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

const useTopicDetail = (): {
  topic: TopicDetail
  commentDetail: CommentDetail
  getTopicDetail: (TopicDetailParams) => void
  getCommentDetail: (CommentDetailParams) => void
  getCommentsList: (CommentsListParams) => void
  deleteTopic: (TopicDetailParams) => void
  resetMeta: () => void
  topicDetailMeta: Meta
  deleteTopicMeta: Meta
  commentDetailMeta: Meta
  createComment: (params: CommentCreateParams) => void
  createCommentMeta: Meta
  deleteComment: (hash_key: string) => void
  commentsListMeta: Meta
  commentsListPageMeta: PageMeta
  commentsList: CommentsResponse[]
} => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const topic = useAppSelector(selectors.getTopicDetail)
  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const getCommentDetail = (param: CommentDetailParams) => dispatch(actions.getTopicComment(param))
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)
  const deleteTopicMeta = useAppSelector(getDeleteTopicMeta)
  const commentDetailMeta = useAppSelector(getTopicCommentMeta)
  const commentDetail = useAppSelector(selectors.getCommentDetail)
  const resetTopicMeta = () => dispatch(actions.clearTopicDetail())
  const createComment = (params: CommentCreateParams) => dispatch(actions.createTopicComment(params))
  const createCommentMeta = useAppSelector(getCreateCommentMeta)
  const resetMeta = () => dispatch(clearMetaData(actions.getCommentsList.typePrefix))

  const deleteComment = async (params) => {
    const resultAction = await dispatch(actions.deleteTopicComment(params))
    if (actions.deleteTopicComment.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(t('common:topic_comment.delete.success_toast')))
    }
  }

  const deleteTopic = async (params: TopicDeleteParams) => {
    const resultAction = await dispatch(actions.deleteTopic(params))
    if (actions.deleteTopic.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(t('common:community.topic.delete_success')))
      await router.push(`${ESRoutes.COMMUNITY}/${router.query.hash_key}`)
      resetTopicMeta()
    }
  }

  const commentsListPageMeta = useAppSelector(selectors.getCommentsListMeta)
  const commentsListMeta = useAppSelector(getCommentsListMeta)
  const commentsList = useAppSelector(selectors.getCommentsList)
  const getCommentsList = (param: CommentsListParams) => dispatch(actions.getCommentsList(param))

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
    getCommentsList,
    commentDetailMeta,
    commentsList,
    commentsListMeta,
    commentsListPageMeta,
    createCommentMeta,
  }
}

export default useTopicDetail
