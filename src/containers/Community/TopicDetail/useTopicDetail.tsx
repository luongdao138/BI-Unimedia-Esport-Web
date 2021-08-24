import { TopicDetail, TopicDetailParams } from '@services/community.service'
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
} => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const topic = useAppSelector(selectors.getTopicDetail)
  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)

  const deleteTopicMeta = useAppSelector(getDeleteTopicMeta)

  const deleteTopic = async (params: TopicDetailParams) => {
    const resultAction = await dispatch(actions.deleteTopic(params))
    if (actions.deleteTopic.fulfilled.match(resultAction)) {
      router.push(`${ESRoutes.COMMUNITY}/${router.query.community_id}`)
      dispatch(commonActions.addToast(t('common:community.topic.create_success')))
    }
  }

  return {
    topic,
    getTopicDetail,
    topicDetailMeta,
    deleteTopic,
    deleteTopicMeta,
  }
}

export default useTopicDetail
