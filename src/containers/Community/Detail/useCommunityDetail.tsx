import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import auth from '@store/auth'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { CommunityDetail, TopicDetailList, TopicListParams, PageMeta } from '@services/community.service'
const { selectors, actions } = community
const getCommunityDetailMeta = createMetaSelector(actions.getCommunityDetail)
const getFollowCommmutyMeta = createMetaSelector(actions.followCommunity)
const getUnfollowCommmutyMeta = createMetaSelector(actions.unfollowCommunity)
const getTopicListMeta = createMetaSelector(actions.getTopicList)

const useCommunityDetail = (): {
  isAuthenticated: boolean
  meta: Meta
  handleBack: () => void
  topicList: Array<TopicDetailList>
  communityDetail: CommunityDetail
  getCommunityDetail: (hash_key?: string) => void
  getTopicList: (params: TopicListParams) => void
  followCommunity: (hash_key?: string) => void
  unfollowCommunity: (hash_key?: string) => void
  followCommunityMeta: Meta
  unfollowCommunityMeta: Meta
  topicListMeta: Meta
  topicListPageMeta: PageMeta
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
  const topicListMeta = useAppSelector(getTopicListMeta)
  const topicListPageMeta = useAppSelector(selectors.getTopicListMeta)

  const followCommunityMeta = useAppSelector(getFollowCommmutyMeta)
  const unfollowCommunityMeta = useAppSelector(getUnfollowCommmutyMeta)
  const followCommunity = (hash_key: string) => dispatch(actions.followCommunity(hash_key))
  const unfollowCommunity = (hash_key: string) => dispatch(actions.unfollowCommunity(hash_key))

  return {
    handleBack,
    isAuthenticated,
    communityDetail,
    topicList,
    getCommunityDetail,
    getTopicList,
    meta,
    followCommunity,
    unfollowCommunity,
    followCommunityMeta,
    unfollowCommunityMeta,
    topicListMeta,
    topicListPageMeta,
  }
}

export default useCommunityDetail
