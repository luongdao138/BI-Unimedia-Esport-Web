import { useAppDispatch } from '@store/hooks'
import userProfile from '@store/userProfile'

const { actions } = userProfile

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAccount = () => {
  const dispatch = useAppDispatch()
  const resetSteps = () => dispatch(actions.clearChangeEmailSteps())

  return { resetSteps }
}

export default useAccount
