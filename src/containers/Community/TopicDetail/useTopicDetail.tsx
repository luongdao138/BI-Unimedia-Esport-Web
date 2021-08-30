import { TopicDetail, TopicDetailParams, CommentCreateParams } from '@services/community.service'
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
  topicDetailMeta: Meta
  deleteTopic: (TopicDetailParams) => void
  deleteTopicMeta: Meta
  createComment: (params: CommentCreateParams) => void
  deleteComment: (hash_key: string) => void
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
  const deleteComment = (params) => dispatch(actions.createTopicComment(params))

  const deleteTopic = async (params: TopicDetailParams) => {
    const resultAction = await dispatch(actions.deleteTopic(params))
    if (actions.deleteTopic.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(t('common:community.topic.create_success')))
      await router.push(`${ESRoutes.COMMUNITY}/${router.query.community_id}`)
      resetTopicMeta()
    }
  }

  return {
    topic,
    getTopicDetail,
    topicDetailMeta,
    deleteTopic,
    deleteTopicMeta,
    createComment,
    deleteComment,
  }
}

export default useTopicDetail
