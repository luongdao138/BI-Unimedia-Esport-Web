import { useEffect } from 'react'
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
  const pages = useAppSelector(selectors.getCommunityMembersMeta)
  const membersMeta = useAppSelector(getMeta)

  const getMembers = (params: CommunityMembersParams) => dispatch(actions.getCommunityMembers(params))
  const approveMembers = (params: CommunityMembersApproveCancelParams) => dispatch(actions.approveCommunityMembers(params))
  const cancelMembers = (params: CommunityMembersApproveCancelParams) => dispatch(actions.cancelCommunityMembers(params))
  const changeMemberRole = (params: CommunityMemberChangeRoleParams) => dispatch(actions.changeCommunityMemberRole(params))
  const removeMember = (params: CommunityMemberRemoveParams) => dispatch(actions.removeCommunityMember(params))
  const sendToast = (params: string) => dispatch(addToast(params))

  const resetMembers = () => dispatch(actions.resetCommunityMembers())
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityMembers.typePrefix))

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(actions.approveCommunityMembers.typePrefix))
      dispatch(clearMetaData(actions.cancelCommunityMembers.typePrefix))
      dispatch(clearMetaData(actions.changeCommunityMemberRole.typePrefix))
      dispatch(clearMetaData(actions.removeCommunityMember.typePrefix))
      resetMembers()
      resetMeta()
    }
  }, [])

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
