import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'

const getBattleRoyaleWinnersMeta = createMetaSelector(actions.getBattleRoyaleWinners)

const useBRStatusComplete = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const winner = useAppSelector(selectors.getBattleRoyaleFirstPlace)
  const winnerMeta = useAppSelector(getBattleRoyaleWinnersMeta)

  useEffect(() => {
    if (router.query.hash_key && !router.asPath.endsWith('/participants')) {
      dispatch(actions.getBattleRoyaleWinners(String(router.query.hash_key)))
    }
    return () => {
      dispatch(actions.resetParticipants())
      dispatch(clearMetaData(actions.getArenaWinners.typePrefix))
    }
  }, [router])

  return { winner, winnerMeta }
}

export default useBRStatusComplete
