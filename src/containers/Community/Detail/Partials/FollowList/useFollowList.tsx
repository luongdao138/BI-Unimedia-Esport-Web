import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  CommunityMember,
  CommunityMemberChangeRoleParams,
  CommunityMemberRemoveParams,
  CommunityMembersApproveCancelParams,
  CommunityMembersParams,
  PageMeta,
} from '@services/community.service'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { addToast } from '@store/common/actions'
import { clearMetaData } from '@store/metadata/actions'

const { actions, selectors } = community
const getMeta = createMetaSelector(actions.getCommunityMembers)

const useFollowList = (): {
  membersList: CommunityMember[]
  getMembers: (params: CommunityMembersParams) => void
  pages: PageMeta
  membersMeta: Meta
  resetMembers: () => void
  resetMeta: () => void
  approveMembers: (params: CommunityMembersApproveCancelParams) => void
  cancelMembers: (params: CommunityMembersApproveCancelParams) => void
  changeMemberRole: (params: CommunityMemberChangeRoleParams) => void
  removeMember: (params: CommunityMemberRemoveParams) => void
  sendToast: (params: string) => void
} => {
  const dispatch = useAppDispatch()
  const membersList = useAppSelector(selectors.getCommunityMembers)
  const getMembers = (params) => dispatch(actions.getCommunityMembers(params))
  const pages = useAppSelector(selectors.getCommunityMembersMeta)
  const membersMeta = useAppSelector(getMeta)
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityMembers.typePrefix))
  const resetMembers = () => dispatch(actions.resetCommunityMembers())
  const approveMembers = (params) => dispatch(actions.approveCommunityMembers(params))
  const cancelMembers = (params) => dispatch(actions.cancelCommunityMembers(params))
  const changeMemberRole = (params) => dispatch(actions.changeCommunityMemberRole(params))
  const removeMember = (params) => dispatch(actions.removeCommunityMember(params))
  const sendToast = (params) => dispatch(addToast(params))

  return {
    membersList,
    getMembers,
    pages,
    membersMeta,
    resetMeta,
    resetMembers,
    approveMembers,
    cancelMembers,
    sendToast,
    changeMemberRole,
    removeMember,
  }
}

export default useFollowList
