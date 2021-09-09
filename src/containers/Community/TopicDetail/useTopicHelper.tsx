import { useAppSelector } from '@store/hooks'
import { getUserCode } from '@store/auth/selectors'

const useTopicHelper = (
  owner_code: string,
  topic_owner_code?: string
): {
  isSelf: boolean
  isTopicOwner: boolean
} => {
  const user_code = useAppSelector(getUserCode)
  const isSelf = user_code === owner_code
  const isTopicOwner = user_code === topic_owner_code
  return {
    isSelf,
    isTopicOwner,
  }
}

export default useTopicHelper
