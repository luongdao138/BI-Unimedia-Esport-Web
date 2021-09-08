import { useAppSelector } from '@store/hooks'
import { getUserCode } from '@store/auth/selectors'

const useTopicHelper = (
  owner_code: string
): {
  isSelf: boolean
} => {
  const user_code = useAppSelector(getUserCode)
  const isSelf = user_code === owner_code
  return {
    isSelf,
  }
}

export default useTopicHelper
