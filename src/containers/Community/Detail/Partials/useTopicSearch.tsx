import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { PageMeta, TopicSearchItem, TopicSearchParams } from '@services/community.service'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { selectors, actions } = community
const getTopicMeta = createMetaSelector(actions.searchTopic)

const useTopicSearch = (): {
  topicList: TopicSearchItem[]
  getTopicList: (params: TopicSearchParams) => void
  topicListMeta: Meta
  pages: PageMeta
} => {
  const dispatch = useAppDispatch()
  const getTopicList = (params: TopicSearchParams) => dispatch(actions.searchTopic(params))
  const topicList = useAppSelector(selectors.getTopicSearchList)
  const topicListMeta = useAppSelector(getTopicMeta)
  const pages = useAppSelector(selectors.getTopicSearchListMeta)

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(actions.searchTopic.typePrefix))
      dispatch(actions.clearSearchTopic())
    }
  }, [])

  return {
    topicList,
    getTopicList,
    topicListMeta,
    pages,
  }
}

export default useTopicSearch
