import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import * as selectors from '@store/arena/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { SetScoreParams, TournamentMatchRound } from '@services/arena.service'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.getTournamentMatches)
const setScoreMeta = createMetaSelector(actions.setScore)

type RoundTitles = { matches: string[]; third_place_match: string[] }

const useTournamentMatches = (): {
  matches: TournamentMatchRound[]
  third_place_match: TournamentMatchRound
  meta: Meta
  scoreMeta: Meta
  fetchMatches: () => void
  setScore: (params: SetScoreParams) => void
  roundTitles: RoundTitles
} => {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const [roundTitles, setRoundTitles] = useState<RoundTitles>({ matches: [], third_place_match: [] })
  const meta = useAppSelector(getMeta)
  const scoreMeta = useAppSelector(setScoreMeta)
  const { matches, third_place_match } = useAppSelector(selectors.getTournamentMatches)
  useEffect(() => {
    fetchMatches()
  }, [query.hash_key])
  useEffect(() => {
    if (meta.loaded) {
      const matchesLength = matches.length
      switch (matchesLength) {
        case 1:
          setRoundTitles({ ...roundTitles, matches: ['決勝戦'] })
          break
        case 2:
          setRoundTitles({ ...roundTitles, matches: ['決勝戦', '準決勝戦'] })
          break
        default: {
          const rounds = Array.from({ length: matchesLength }, (_, i) => i)
          const matchTitles = rounds.map((r) => `${r + 1}回戦`)
          matchTitles[matchesLength - 1] = '決勝戦'
          matchTitles[matchesLength - 2] = '準決勝戦'
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

  const setScore = (param: SetScoreParams) => dispatch(actions.setScore(param))
  return { matches, third_place_match, meta, fetchMatches, roundTitles, setScore, scoreMeta }
}

export default useTournamentMatches
