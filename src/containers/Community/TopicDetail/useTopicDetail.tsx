import { TopicDetail, TopicDetailParams } from '@services/community.service'
import community from '@store/community'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = community
const getTopicDetailMeta = createMetaSelector(actions.getTopicDetail)

const useTopicDetail = (): {
  topic: TopicDetail
  getTopicDetail: (TopicDetailParams) => void
  topicDetailMeta: Meta
} => {
  const dispatch = useAppDispatch()
  const topic = useAppSelector(selectors.getTopicDetail)
  const getTopicDetail = (param: TopicDetailParams) => dispatch(actions.getTopicDetail(param))
  const topicDetailMeta = useAppSelector(getTopicDetailMeta)

  return {
    topic,
    getTopicDetail,
    topicDetailMeta,
  }
}

export default useTopicDetail
