import { useAppDispatch, useAppSelector } from '@store/hooks'
import { CommunityMember, CommunityMembersParams } from '@services/community.service'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'

const { actions, selectors } = community
const getMeta = createMetaSelector(actions.getCommunityMembers)

const useFollowList = (): {
  members: Array<CommunityMember>
  getMembers: (params: CommunityMembersParams) => void
  membersMeta: Meta
} => {
  const dispatch = useAppDispatch()
  const members = useAppSelector(selectors.getCommunityMembers)
  const getMembers = (params) => dispatch(actions.getCommunityMembers(params))
  const membersMeta = useAppSelector(getMeta)

  return {
    members,
    getMembers,
    membersMeta,
  }
}

export default useFollowList
