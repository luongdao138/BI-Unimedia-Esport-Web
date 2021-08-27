import { TopicDetail, TopicDetailParams, CommentsListResponse, CommentsListParams } from '@services/community.service'
import community from '@store/community'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'

const { selectors, actions } = community
const getTopicDetailMeta = createMetaSelector(actions.getTopicDetail)
const getDeleteTopicMeta = createMetaSelector(actions.deleteTopic)

const useTopicDetail = (): {
  topic: TopicDetail
  getTopicDetail: (TopicDetailParams) => void
  getCommentsList: (CommentsListParams) => void
  topicDetailMeta: Meta
  deleteTopic: (TopicDetailParams) => void
  deleteTopicMeta: Meta
  commentsList: CommentsListResponse
} => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const topic = useAppSelector(selectors.getTopicDetail)
  const commentsList = useAppSelector(selectors.getCommentsList)
  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)
  const deleteTopicMeta = useAppSelector(getDeleteTopicMeta)
  const resetTopicMeta = () => dispatch(actions.clearTopicDetail())

  const deleteTopic = async (params: TopicDetailParams) => {
    const resultAction = await dispatch(actions.deleteTopic(params))
    if (actions.deleteTopic.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(t('common:community.topic.create_success')))
      await router.push(`${ESRoutes.COMMUNITY}/${router.query.community_id}`)
      resetTopicMeta()
    }
  }

  const getCommentsList = (param: CommentsListParams) => dispatch(actions.getCommentsList(param))

  return {
    topic,
    getTopicDetail,
    topicDetailMeta,
    deleteTopic,
    deleteTopicMeta,
    getCommentsList,
    commentsList,
  }
}

export default useTopicDetail
