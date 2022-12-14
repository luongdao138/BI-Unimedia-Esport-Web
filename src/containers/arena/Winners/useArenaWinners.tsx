import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import useGetProfile from '@utils/hooks/useGetProfile'
import { ArenaWinners } from '@services/arena.service'
import { clearMetaData } from '@store/metadata/actions'

const getWinnersMeta = createMetaSelector(actions.getArenaWinners)
const getArenaMeta = createMetaSelector(actions.getTournamentDetail)
const getBattleRoyaleWinnersMeta = createMetaSelector(actions.getBattleRoyaleWinners)

const useWinners = (isImmediately = true) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const winnersMeta = useAppSelector(getWinnersMeta)
  const brWinnersMeta = useAppSelector(getBattleRoyaleWinnersMeta)
  const arenaMeta = useAppSelector(getArenaMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const arenaWinners = useAppSelector(selectors.getArenaWinners)
  const arenaBRWinners = useAppSelector(selectors.getSortedBRParticipants)
  const { userProfile } = useGetProfile()
  const brFirstPlace = useAppSelector(selectors.getBattleRoyaleFirstPlace)
  const trFirstPlace = useAppSelector(selectors.getTournamentFirstPlace)
  const { isNotHeld, isTeam, isBattleRoyale, isCancelled } = useArenaHelper(arena)
  const fetchWinners = () => dispatch(actions.getArenaWinners(router.query.hash_key))
  useEffect(() => {
    if (isNotHeld || isCancelled) toDetail()
  }, [isNotHeld, isCancelled])

  useEffect(() => {
    if (router.query.hash_key && isImmediately) {
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router.query.hash_key, userProfile])
  useEffect(() => {
    if (arena && arenaMeta.loaded && !isNotHeld && !isCancelled) {
      switch (arena.attributes.rule) {
        case 'battle_royale':
        case 'score_attack':
        case 'time_attack':
          dispatch(actions.getBattleRoyaleWinners(String(router.query.hash_key)))
          break
        case 'single':
        case 'double':
          dispatch(actions.getArenaWinners(router.query.hash_key))
          break
        default:
          break
      }
    }
  }, [arena, arenaMeta.loaded, isNotHeld, isCancelled])

  const toDetail = () => {
    const placementsUrl = '/placements'
    if (router.asPath.includes(placementsUrl)) {
      router.push(router.asPath.replace(placementsUrl, ''))
    }
  }

  const handleBack = () => {
    // eslint-disable-next-line no-console
    console.log('backToTopVideo::back::17')
    router.back()
  }

  const hasWinners = useMemo(() => hasWinnersData(arenaWinners), [arenaWinners])
  const resetMeta = () => {
    dispatch(clearMetaData(actions.getArenaWinners.typePrefix))
    dispatch(clearMetaData(actions.getTournamentDetail.typePrefix))
  }

  return {
    arenaWinners,
    winnersMeta,
    brWinnersMeta,
    arenaMeta,
    arena,
    fetchWinners,
    toDetail,
    handleBack,
    isTeam,
    hasWinnersData: hasWinners,
    userProfile,
    arenaBRWinners,
    isBattleRoyale,
    winner: isBattleRoyale ? brFirstPlace : trFirstPlace,
    resetMeta,
    isCancelled,
    isNotHeld,
  }
}

function hasWinnersData(arenaWinners: ArenaWinners): boolean {
  if (!arenaWinners) return false

  for (const i of Object.keys(arenaWinners)) {
    if (i === '1' && arenaWinners[i].length) return true
  }
  return false
}

export default useWinners
