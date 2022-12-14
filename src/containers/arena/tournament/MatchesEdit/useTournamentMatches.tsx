import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import * as selectors from '@store/arena/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { SetScoreParams, TournamentMatchRound } from '@services/arena.service'
import { Meta } from '@store/metadata/actions/types'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { getIsAuthenticated } from '@store/auth/selectors'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

const getMeta = createMetaSelector(actions.getTournamentMatches)
const setScoreMeta = createMetaSelector(actions.setScore)

type RoundTitles = { matches: string[]; third_place_match: string[] }

const useTournamentMatches = (): {
  matches: TournamentMatchRound[]
  third_place_match: TournamentMatchRound
  meta: Meta
  fetchMatches: () => void
  roundTitles: RoundTitles
  handleBack: () => void
  setScore: (params: SetScoreParams) => void
  scoreMeta: Meta
} => {
  const { t } = useTranslation(['common'])
  const { query, push, back } = useRouter()
  const dispatch = useAppDispatch()
  const [roundTitles, setRoundTitles] = useState<RoundTitles>({ matches: [], third_place_match: [] })
  const meta = useAppSelector(getMeta)
  const { matches, third_place_match } = useAppSelector(selectors.getTournamentMatches)
  const isAuth = useAppSelector(getIsAuthenticated)
  const arena = useAppSelector(selectors.getTournamentDetail)
  const { isNotHeld, isBattleRoyale } = useArenaHelper(arena)
  const scoreMeta = useAppSelector(setScoreMeta)

  useEffect(() => {
    if (isNotHeld || isBattleRoyale) push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, String(query.hash_key)))
  }, [isNotHeld, isBattleRoyale])

  useEffect(() => {
    if (!isAuth) {
      push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, String(query.hash_key)))
    } else fetchMatches()
  }, [query.hash_key, isAuth])
  useEffect(() => {
    if (meta.loaded) {
      const matchesLength = matches.length
      switch (matchesLength) {
        case 1:
          setRoundTitles({ ...roundTitles, matches: [t('common:arena.matches.final_game')] })
          break
        case 2:
          setRoundTitles({ ...roundTitles, matches: [t('common:arena.matches.semi_final'), t('common:arena.matches.final_game')] })
          break
        default: {
          const rounds = Array.from({ length: matchesLength }, (_, i) => i)
          const matchTitles = rounds.map((r) => `${r + 1}${t('common:arena.matches.round')}`)
          matchTitles[matchesLength - 1] = t('common:arena.matches.final_game')
          matchTitles[matchesLength - 2] = t('common:arena.matches.semi_final')
          setRoundTitles({ ...roundTitles, matches: matchTitles })
        }
      }
    }
  }, [meta.loaded])

  const fetchMatches = () => {
    if (query.hash_key) {
      dispatch(actions.getTournamentMatches(String(query.hash_key)))
    }
  }

  const handleBack = () => back()

  const setScore = (param: SetScoreParams) => dispatch(actions.setScore(param))

  return {
    matches,
    third_place_match,
    meta,
    fetchMatches,
    roundTitles,
    handleBack,
    setScore,
    scoreMeta,
  }
}

export default useTournamentMatches
