import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import { ArenaWinners } from '@services/arena.service'
import useGetProfile from '@utils/hooks/useGetProfile'

const getWinnersMeta = createMetaSelector(actions.getArenaWinners)
const getArenaMeta = createMetaSelector(actions.getTournamentDetail)

const useWinners = (isImmediately = true) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const winnersMeta = useAppSelector(getWinnersMeta)
  const arenaMeta = useAppSelector(getArenaMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const arenaWinners = useAppSelector(selectors.getArenaWinners)
  const arenaBRWinners = useAppSelector(selectors.getSortedBRParticipants)
  const { userProfile } = useGetProfile()
  const brFirstPlace = useAppSelector(selectors.getBattleRoyaleFirstPlace)
  const trFirstPlace = useAppSelector(selectors.getTournamentFirstPlace)
  const { isNotHeld, isTeam, isBattleRoyale } = useArenaHelper(arena)
  const fetchWinners = () => dispatch(actions.getArenaWinners(router.query.hash_key))
  useEffect(() => {
    if (isNotHeld) toDetail()
  }, [isNotHeld])

  useEffect(() => {
    if (router.query.hash_key && isImmediately) {
      dispatch(actions.getTournamentDetail(router.query.hash_key))
    }
  }, [router.query.hash_key, userProfile])

  useEffect(() => {
    if (arenaMeta.loaded && !isNotHeld) {
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
  }, [arenaMeta.loaded, isNotHeld])

  const toDetail = () => {
    const placementsUrl = '/placements'
    if (router.asPath.includes(placementsUrl)) {
      router.push(router.asPath.replace(placementsUrl, ''))
    }
  }

  const handleBack = () => router.back()

  const hasWinners = useMemo(() => hasWinnersData(arenaWinners), [arenaWinners])

  return {
    arenaWinners,
    winnersMeta,
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
  }
}

function hasWinnersData(arenaWinners: ArenaWinners): boolean {
  if (!arenaWinners) return false
  let hasData = false
  Object.keys(arenaWinners).forEach((place) => {
    const placement = arenaWinners[place]
    if (!!placement && placement.length > 0) {
      hasData = true
    }
  })
  return hasData
}

export default useWinners
