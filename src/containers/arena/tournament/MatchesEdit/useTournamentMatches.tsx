import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import * as selectors from '@store/arena/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { TournamentMatchRound } from '@services/arena.service'
import { Meta } from '@store/metadata/actions/types'
import { useTranslation } from 'react-i18next'

const getMeta = createMetaSelector(actions.getTournamentMatches)

type RoundTitles = { matches: string[]; third_place_match: string[] }

const useTournamentMatches = (): {
  matches: TournamentMatchRound[]
  third_place_match: TournamentMatchRound
  meta: Meta
  fetchMatches: () => void
  roundTitles: RoundTitles
} => {
  const { t } = useTranslation(['common'])
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const [roundTitles, setRoundTitles] = useState<RoundTitles>({ matches: [], third_place_match: [] })
  const meta = useAppSelector(getMeta)
  const { matches, third_place_match } = useAppSelector(selectors.getTournamentMatches)
  useEffect(() => {
    fetchMatches()
  }, [query.hash_key])
  useEffect(() => {
    if (meta.loaded) {
      const matchesLength = matches.length
      switch (matchesLength) {
        case 1:
          setRoundTitles({ ...roundTitles, matches: [t('common:arena.matches.final_game')] })
          break
        case 2:
          setRoundTitles({ ...roundTitles, matches: [t('common:arena.matches.final_game'), t('common:arena.matches.semi_final')] })
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

  return {
    matches,
    third_place_match,
    meta,
    fetchMatches,
    roundTitles,
  }
}

export default useTournamentMatches
