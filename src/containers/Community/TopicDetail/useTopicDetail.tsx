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

const useTopicDetail = (): {
  topic: TopicDetail
  getTopicDetail: (TopicDetailParams) => void
  getCommentsList: (CommentsListParams) => void
  getComments: (params: CommentsListParams) => void
  deleteTopic: (TopicDeleteParams) => void
  resetMeta: () => void
  topicDetailMeta: Meta
  deleteTopicMeta: Meta
  createComment: (params: CommentCreateParams) => void
  deleteComment: (hash_key: string) => void
  commentsListMeta: Meta
  pages: PageMeta
  commentsList: Array<CommentsResponse>
} => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const topic = useAppSelector(selectors.getTopicDetail)
  const commentsList = useAppSelector(selectors.getCommentsList)
  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)
  const deleteTopicMeta = useAppSelector(getDeleteTopicMeta)
  const commentsListMeta = useAppSelector(getCommentsListMeta)
  const pages = useAppSelector(selectors.getCommentsListMeta)
  const getComments = (param: CommentsListParams) => dispatch(actions.getCommentsList(param))
  const resetTopicMeta = () => dispatch(actions.clearTopicDetail())
  const createComment = (params: CommentCreateParams) => dispatch(actions.createTopicComment(params))
  const deleteComment = (params) => dispatch(actions.deleteTopicComment(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommentsList.typePrefix))

  const deleteTopic = async (params: TopicDeleteParams) => {
    const resultAction = await dispatch(actions.deleteTopic(params))
    if (actions.deleteTopic.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(t('common:community.topic.create_success')))
      await router.push(`${ESRoutes.COMMUNITY}/${router.query.community_id}`)
      resetTopicMeta()
    }
  }

  const getCommentsList = (param: CommentsListParams) => dispatch(actions.getCommentsList(param))

  return {
    getTopicDetail,
    deleteTopic,
    deleteTopicMeta,
    createComment,
    deleteComment,
    getComments,
    getCommentsList,
    resetMeta,
    topic,
    commentsList,
    pages,
    commentsListMeta,
    topicDetailMeta,
  }
}

export default useTopicDetail
