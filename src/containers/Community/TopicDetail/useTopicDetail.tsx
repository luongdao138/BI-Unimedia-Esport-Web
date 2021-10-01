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
import { clearMetaData } from '@store/metadata/actions'

const { selectors, actions } = community
const getTopicDetailMeta = createMetaSelector(actions.getTopicDetail)
const getCreateCommentMeta = createMetaSelector(actions.createTopicComment)
const getDeleteTopicMeta = createMetaSelector(actions.deleteTopic)
const getTopicCommentMeta = createMetaSelector(actions.getTopicComment)
const getCommentsListMeta = createMetaSelector(actions.getCommentsList)
const getDeleteTopicCommentMeta = createMetaSelector(actions.deleteTopicComment)

const useTopicDetail = (): {
  getTopicDetail: (TopicDetailParams) => void
  getCommentDetail: (CommentDetailParams) => void
  getCommentsList: (CommentsListParams) => void
  deleteTopic: (TopicDetailParams) => void
  createComment: (params: CommentCreateParams) => void
  deleteComment: (params: DeleteCommentParams) => void
  resetCommentDetail: () => void
  resetMeta: () => void
  resetTopicMeta: () => void
  resetTopicDeleteMeta: () => void
  resetCommentCreateMeta: () => void
  topicDetailMeta: Meta
  deleteTopicMeta: Meta
  commentDetailMeta: Meta
  commentsListMeta: Meta
  createCommentMeta: Meta
  deleteTopicCommentMeta: Meta
  commentsListPageMeta: PageMeta
  commentsList: CommentsResponse[]
  topic: TopicDetail
  commentDetail: CommentDetail
} => {
  const dispatch = useAppDispatch()

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
  const resetCommentCreateMeta = () => dispatch(clearMetaData(actions.createTopicComment.typePrefix))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommentsList.typePrefix))
  const resetTopicDeleteMeta = () => dispatch(clearMetaData(actions.deleteTopic.typePrefix))
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
    resetTopicDeleteMeta,
    getCommentsList,
    commentDetailMeta,
    commentsList,
    commentsListMeta,
    commentsListPageMeta,
    createCommentMeta,
    resetTopicMeta,
    deleteTopicCommentMeta,
    resetCommentCreateMeta,
  }
}

export default useTopicDetail
