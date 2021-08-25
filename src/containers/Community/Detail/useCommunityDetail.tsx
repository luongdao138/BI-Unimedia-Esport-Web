import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import auth from '@store/auth'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { CommunityDetail, TopicDetail, TopicListParams } from '@services/community.service'

const { selectors, actions } = community
const getCommunityDetailMeta = createMetaSelector(actions.getCommunityDetail)

const useCommunityDetail = (): {
  isAuthenticated: boolean
  meta: Meta
  handleBack: () => void
  topicList: Array<TopicDetail>
  communityDetail: CommunityDetail
  getCommunityDetail: (hash_key?: string) => void
  getTopicList: (params: TopicListParams) => void
} => {
  const { back } = useRouter()
  const authSelectors = auth.selectors
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated)
  const handleBack = () => back()
  const dispatch = useAppDispatch()

  const meta = useAppSelector(getCommunityDetailMeta)
  const communityDetail = useAppSelector(selectors.getCommunityDetail)
  const topicList = useAppSelector(selectors.getTopicList)

  const getCommunityDetail = (hash_key: string) => dispatch(actions.getCommunityDetail(hash_key))
  const getTopicList = (params: TopicListParams) => dispatch(actions.getTopicList(params))

  return {
    handleBack,
    isAuthenticated,
    communityDetail,
    topicList,
    getCommunityDetail,
    getTopicList,
    meta,
  }
}

export default useCommunityDetail
