import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { ArenaWinners, TournamentDetail } from '@services/arena.service'

const getWinnersMeta = createMetaSelector(actions.getArenaWinners)
const getArenaMeta = createMetaSelector(actions.getTournamentDetail)

const useWinners = (
  isImmediately = true
): {
  arenaMeta: Meta
  winnersMeta: Meta
  arenaWinners: ArenaWinners
  arena: TournamentDetail
  fetchWinners: () => void
  toDetail: () => void
  handleBack: () => void
} => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const winnersMeta = useAppSelector(getWinnersMeta)
  const arenaMeta = useAppSelector(getArenaMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const arenaWinners = useAppSelector(selectors.getArenaWinners)

  const fetchWinners = () => dispatch(actions.getArenaWinners(router.query.hash_key))

  useEffect(() => {
    if (router.query.hash_key && isImmediately) {
      dispatch(actions.getArenaWinners(router.query.hash_key))
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router.query.hash_key])

  const toDetail = () => router.push(router.asPath.replace('/placements', ''))
  const handleBack = () => router.back()

  return {
    arenaWinners,
    winnersMeta,
    arenaMeta,
    arena,
    fetchWinners,
    toDetail,
    handleBack,
  }
}

export default useWinners
