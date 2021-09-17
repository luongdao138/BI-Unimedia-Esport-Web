import { useAppDispatch, useAppSelector } from '@store/hooks'
import { CommunityMember, CommunityMembersParams, MemberParams, PageMeta } from '@services/community.service'
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
  sendToast: (params: string) => void
  submitMembers: (params: MemberParams) => void
} => {
  const dispatch = useAppDispatch()
  const membersList = useAppSelector(selectors.getCommunityMembers)
  const getMembers = (params) => dispatch(actions.getCommunityMembers(params))
  const pages = useAppSelector(selectors.getCommunityMembersMeta)
  const membersMeta = useAppSelector(getMeta)
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityMembers.typePrefix))
  const resetMembers = () => dispatch(actions.resetCommunityMembers())
  const sendToast = (params) => dispatch(addToast(params))
  const submitMembers = (params) => dispatch(actions.memberSubmit(params))

  return {
    membersList,
    getMembers,
    pages,
    membersMeta,
    resetMeta,
    resetMembers,
    sendToast,
    submitMembers,
  }
}

export default useFollowList
