import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/arena/selectors'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import { ArenaWinners, ParticipantsResponse, TournamentDetail } from '@services/arena.service'
import useGetProfile from '@utils/hooks/useGetProfile'
import { UserProfile } from '@services/user.service'

const getWinnersMeta = createMetaSelector(actions.getArenaWinners)
const getArenaMeta = createMetaSelector(actions.getTournamentDetail)

const useWinners = (
  isImmediately = true
): {
  arenaMeta: Meta
  winnersMeta: Meta
  arenaWinners: ArenaWinners
  arenaBRWinners: ParticipantsResponse[]
  arena: TournamentDetail
  fetchWinners: () => void
  toDetail: () => void
  handleBack: () => void
  isTeam: boolean
  hasWinnersData: boolean
  userProfile: UserProfile
  isBattleRoyale: boolean
} => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const winnersMeta = useAppSelector(getWinnersMeta)
  const arenaMeta = useAppSelector(getArenaMeta)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const arenaWinners = useAppSelector(selectors.getArenaWinners)
  const arenaBRWinners = useAppSelector(selectors.getSortedBRParticipants)
  const { userProfile } = useGetProfile()
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
          dispatch(actions.getBattleRoyaleParticipants({ page: 1, hash_key: String(router.query.hash_key), role: 'participant' }))
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
