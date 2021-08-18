import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import auth from '@store/auth'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { CommunityDetail } from '@services/community.service'

const { selectors, actions } = community
const getCommunityDetailMeta = createMetaSelector(actions.getCommunityDetail)

const useCommunityDetail = (
  hashkey?: string
): {
  isAuthenticated: boolean
  meta: Meta
  handleBack: () => void
  communityDetail: CommunityDetail
  getCommunityDetail: () => void
} => {
  const { back } = useRouter()
  const authSelectors = auth.selectors
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated)
  const handleBack = () => back()
  const dispatch = useAppDispatch()

  const meta = useAppSelector(getCommunityDetailMeta)
  const communityDetail = useAppSelector(selectors.getCommunityDetail)
  const getCommunityDetail = () => dispatch(actions.getCommunityDetail(hashkey))

  return {
    handleBack,
    isAuthenticated,
    communityDetail,
    getCommunityDetail,
    meta,
  }
}

export default useCommunityDetail
