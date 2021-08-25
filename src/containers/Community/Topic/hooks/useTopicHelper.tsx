import { useRouter } from 'next/router'
import { CommunityDetail } from '@services/community.service'
import { useContextualRouting } from 'next-use-contextual-routing'

const useTopicHelper = (
  topic?: CommunityDetail
): {
  toCreate: () => void
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hashKey = topic?.hash_key

  const toCreate = () => router.push(makeContextualHref({ hash_key: hashKey }), `/community/${hashKey}/topic/create`, { shallow: true })

  return {
    toCreate,
  }
}

export default useTopicHelper
