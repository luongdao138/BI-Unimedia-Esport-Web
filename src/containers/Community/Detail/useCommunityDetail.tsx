import { useRouter } from 'next/router'
import { useAppSelector } from '@store/hooks'
import auth from '@store/auth'

const useCommunityDetail = (): { isAuthenticated: boolean; handleBack: () => void } => {
  const { back } = useRouter()
  const authSelectors = auth.selectors
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated)
  const handleBack = () => back()

  return {
    handleBack,
    isAuthenticated,
  }
}

export default useCommunityDetail
