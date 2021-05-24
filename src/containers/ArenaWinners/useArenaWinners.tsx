import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/tournament/selectors'
import * as actions from '@store/tournament/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { ArenaWinners, TournamentDetail } from '@services/tournament.service'

const getWinnersMeta = createMetaSelector(actions.getArenaWinners)
const getArenaMeta = createMetaSelector(actions.getTournamentDetail)

const useWinners = (): { arenaMeta: Meta; winnersMeta: Meta; arenaWinners: ArenaWinners; arena: TournamentDetail } => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const winnersMeta = useAppSelector(getWinnersMeta)
  const arenaMeta = useAppSelector(getArenaMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const arenaWinners = useAppSelector(selectors.getArenaWinners)

  useEffect(() => {
    if (router.query.hash_key) {
      dispatch(actions.getArenaWinners(router.query.hash_key))
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router.query.hash_key])

  return {
    arenaWinners,
    winnersMeta,
    arenaMeta,
    arena,
  }
}

export default useWinners
