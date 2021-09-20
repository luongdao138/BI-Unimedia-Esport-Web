import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import auth from '@store/auth'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { CommunityDetail, TopicDetailList, TopicListParams, PageMeta } from '@services/community.service'
import { clearMetaData } from '@store/metadata/actions'

const { selectors, actions } = community
const getCommunityDetailMeta = createMetaSelector(actions.getCommunityDetail)
const getFollowCommunityMeta = createMetaSelector(actions.followCommunity)
const getUnfollowCommunityMeta = createMetaSelector(actions.unfollowCommunity)
const getUnfollowCommunityMetaPending = createMetaSelector(actions.unfollowCommunityPending)
const getTopicListMeta = createMetaSelector(actions.getTopicList)

const useCommunityDetail = (): {
  isAuthenticated: boolean
  meta: Meta
  handleBack: () => void
  topicList: TopicDetailList[]
  communityDetail: CommunityDetail
  getCommunityDetail: (hash_key?: string) => void
  getTopicList: (params: TopicListParams) => void
  followCommunity: (hash_key?: string) => void
  unfollowCommunity: (hash_key?: string) => void
  unfollowCommunityPending: (hash_key?: string) => void
  followCommunityMeta: Meta
  unfollowCommunityMeta: Meta
  unfollowCommunityPendingMeta: Meta
  topicListMeta: Meta
  topicListPageMeta: PageMeta
} => {
  const { back } = useRouter()
  const dispatch = useAppDispatch()
  const authSelectors = auth.selectors

  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated)
  const communityDetail = useAppSelector(selectors.getCommunityDetail)
  const topicList = useAppSelector(selectors.getTopicList)

  const meta = useAppSelector(getCommunityDetailMeta)
  const topicListMeta = useAppSelector(getTopicListMeta)
  const topicListPageMeta = useAppSelector(selectors.getTopicListMeta)
  const followCommunityMeta = useAppSelector(getFollowCommunityMeta)
  const unfollowCommunityMeta = useAppSelector(getUnfollowCommunityMeta)
  const unfollowCommunityPendingMeta = useAppSelector(getUnfollowCommunityMetaPending)

  const handleBack = () => back()
  const getCommunityDetail = (hash_key: string) => dispatch(actions.getCommunityDetail(hash_key))
  const followCommunity = (hash_key: string) => dispatch(actions.followCommunity(hash_key))
  const unfollowCommunity = (hash_key: string) => dispatch(actions.unfollowCommunity(hash_key))
  const unfollowCommunityPending = (hash_key: string) => dispatch(actions.unfollowCommunityPending(hash_key))
  const getTopicList = (params: TopicListParams) => dispatch(actions.getTopicList(params))

  useEffect(() => {
    return () => {
      dispatch(actions.clearCommunityDetail())
      dispatch(actions.clearTopicListData())
      dispatch(clearMetaData(actions.getCommunityDetail.typePrefix))
      dispatch(clearMetaData(actions.followCommunity.typePrefix))
      dispatch(clearMetaData(actions.unfollowCommunity.typePrefix))
      dispatch(clearMetaData(actions.unfollowCommunityPending.typePrefix))
      dispatch(clearMetaData(actions.getTopicList.typePrefix))
    }
  }, [])

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
    unfollowCommunityPending,
    followCommunityMeta,
    unfollowCommunityMeta,
    unfollowCommunityPendingMeta,
    topicListMeta,
    topicListPageMeta,
  }
}

export default useCommunityDetail
