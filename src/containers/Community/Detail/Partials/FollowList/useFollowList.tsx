import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { CommunityMember, CommunityMembersParams, MemberParams, PageMeta } from '@services/community.service'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
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
  submitMembers: (params: MemberParams) => void
} => {
  const dispatch = useAppDispatch()
  const membersList = useAppSelector(selectors.getCommunityMembers)
  const pages = useAppSelector(selectors.getCommunityMembersMeta)
  const membersMeta = useAppSelector(getMeta)

  const getMembers = (params: CommunityMembersParams) => dispatch(actions.getCommunityMembers(params))
  const resetMembers = () => dispatch(actions.resetCommunityMembers())
  const submitMembers = (params: MemberParams) => dispatch(actions.memberSubmit(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityMembers.typePrefix))

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(actions.approveCommunityMembers.typePrefix))
      dispatch(clearMetaData(actions.cancelCommunityMembers.typePrefix))
      dispatch(clearMetaData(actions.changeCommunityMemberRole.typePrefix))
      dispatch(clearMetaData(actions.removeCommunityMember.typePrefix))
    }
  }, [])

  return {
    membersList,
    getMembers,
    pages,
    membersMeta,
    resetMeta,
    resetMembers,
    submitMembers,
  }
}

export default useFollowList
