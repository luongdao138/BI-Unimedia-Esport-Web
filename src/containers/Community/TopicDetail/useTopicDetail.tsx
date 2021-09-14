import {
  TopicDetail,
  TopicDetailParams,
  CommentCreateParams,
  CommentsResponse,
  CommentsListParams,
  PageMeta,
  TopicDeleteParams,
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
const getDeleteTopicMeta = createMetaSelector(actions.deleteTopic)
const getCommentsListMeta = createMetaSelector(actions.getCommentsList)
const getCommentsListPageMeta = createMetaSelector(actions.getCommentsListPage)
const getCommentsListNextMeta = createMetaSelector(actions.getCommentsListNext)

const useTopicDetail = (): {
  topic: TopicDetail
  getTopicDetail: (TopicDetailParams) => void
  getCommentsList: (CommentsListParams) => void
  getCommentsListNext: (CommentsListParams) => void
  getCommentsListPage: (CommentsListParams) => void
  deleteTopic: (TopicDetailParams) => void
  resetMeta: () => void
  topicDetailMeta: Meta
  deleteTopicMeta: Meta
  createComment: (params: CommentCreateParams) => void
  deleteComment: (hash_key: string) => void
  commentsListMeta: Meta
  commentsListPageMeta: Meta
  commentsListNextMeta: Meta
  pages: PageMeta
  commentsList: CommentsResponse[]
} => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const topic = useAppSelector(selectors.getTopicDetail)
  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)
  const deleteTopicMeta = useAppSelector(getDeleteTopicMeta)
  const resetTopicMeta = () => dispatch(actions.clearTopicDetail())
  const createComment = (params: CommentCreateParams) => dispatch(actions.createTopicComment(params))
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

  const pages = useAppSelector(selectors.getCommentsListMeta)
  const commentsListMeta = useAppSelector(getCommentsListMeta)
  const commentsListPageMeta = useAppSelector(getCommentsListPageMeta)
  const commentsListNextMeta = useAppSelector(getCommentsListNextMeta)
  const commentsList = useAppSelector(selectors.getCommentsList)
  const getCommentsList = (param: CommentsListParams) => dispatch(actions.getCommentsList(param))
  const getCommentsListNext = (param: CommentsListParams) => dispatch(actions.getCommentsListNext(param))
  const getCommentsListPage = (param: CommentsListParams) => dispatch(actions.getCommentsListPage(param))

  return {
    getTopicDetail,
    deleteTopic,
    deleteTopicMeta,
    createComment,
    deleteComment,
    getCommentsList,
    getCommentsListNext,
    resetMeta,
    topic,
    commentsList,
    pages,
    commentsListMeta,
    topicDetailMeta,
    getCommentsListPage,
    commentsListPageMeta,
    commentsListNextMeta,
  }
}

export default useTopicDetail
