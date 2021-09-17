import { StoreType, AppDispatch } from '@store/store'
import { Middleware, Action } from 'redux'
import _ from 'lodash'
import {
  unfollowCommunity,
  getTopicList,
  getCommunityList,
  getCommunityListPublic,
  getCommunityListByUser,
  getTopicFollowers,
  getCommunityDetail,
  getCommunityFeatures,
  getCommunityMembers,
  approveCommunityMembers,
  cancelCommunityMembers,
  changeCommunityMemberRole,
  removeCommunityMember,
  closeCommunity,
  createTopic,
  getTopicDetail,
  deleteTopic,
  createTopicComment,
  deleteTopicComment,
  searchTopic,
  unfollowCommunityPending,
  followCommunity,
  getCommentsList,
} from '@store/community/actions/index'
import i18n from '@locales/i18n'
import { addToast } from '@store/common/actions'

const messages = {
  [`${unfollowCommunity.fulfilled}`]: i18n.t('common:community.toast_unfollowed'),
  [`${getTopicList.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getCommunityList.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getCommunityListPublic.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getCommunityListByUser.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getTopicFollowers.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getCommunityDetail.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getCommunityFeatures.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getCommunityMembers.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${approveCommunityMembers.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${cancelCommunityMembers.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${changeCommunityMemberRole.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${removeCommunityMember.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${closeCommunity.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${createTopic.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${getTopicDetail.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${deleteTopic.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${createTopicComment.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${deleteTopicComment.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${searchTopic.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${unfollowCommunityPending.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${unfollowCommunity.rejected}`]: i18n.t('common:common.failed_to_get_data'),
  [`${followCommunity.rejected}`]: i18n.t('common:common.failed_to_get_data'),
}

const fetchCommentsList = (store: StoreType) => {
  const hashKey = store.getState().community.topicDetail?.attributes?.hash_key
  hashKey && store.dispatch(getCommentsList({ hash_key: hashKey, page: 1 }))
}

const actions = {
  [`${createTopicComment.fulfilled}`]: fetchCommentsList,
}

export const communityMiddleware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const message = messages[action.type]
  const communityAction = actions[action.type]

  if (communityAction) communityAction(store)

  if (message && !_.isEmpty(message)) store.dispatch(addToast(message))

  return next(action)
}
