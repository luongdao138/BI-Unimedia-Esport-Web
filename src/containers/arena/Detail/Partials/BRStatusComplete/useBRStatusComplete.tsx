import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'

const getBattleRoyaleParticipantsMeta = createMetaSelector(actions.getBattleRoyaleParticipants)

const useBRStatusComplete = () => {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const winner = useAppSelector(selectors.getBattleRoyaleFirstPlace)
  const winnerMeta = useAppSelector(getBattleRoyaleParticipantsMeta)

  useEffect(() => {
    if (query.hash_key) {
      dispatch(actions.getBattleRoyaleParticipants({ hash_key: String(query.hash_key), page: 1, role: 'participant' }))
    }
    return () => {
      dispatch(clearMetaData(actions.getArenaWinners.typePrefix))
    }
  }, [])

  return { winner, winnerMeta }
}

export default useBRStatusComplete
