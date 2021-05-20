import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import * as selectors from '@store/tournament/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { SetParticipantParams, SetScoreParams, TournamentMatchRound } from '@services/tournament.service'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.getTournamentMatches)
const setParticipantMeta = createMetaSelector(actions.setParticipant)
const setScoreMeta = createMetaSelector(actions.setScore)

const useTournamentMatches = (): {
  matches: TournamentMatchRound[]
  third_place_match: TournamentMatchRound
  meta: Meta
  setMeta: Meta
  scoreMeta: Meta
  fetchMatches: () => void
  setParticipant: (params: SetParticipantParams) => void
  setScore: (params: SetScoreParams) => void
} => {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const setMeta = useAppSelector(setParticipantMeta)
  const scoreMeta = useAppSelector(setScoreMeta)
  const { matches, third_place_match } = useAppSelector(selectors.getTournamentMatches)
  useEffect(() => {
    fetchMatches()
  }, [query.hash_key])

  const fetchMatches = () => {
    if (query.hash_key) {
      dispatch(actions.getTournamentMatches(String(query.hash_key)))
    }
  }

  const setParticipant = (param: SetParticipantParams) => dispatch(actions.setParticipant(param))
  const setScore = (param: SetScoreParams) => dispatch(actions.setScore(param))
  return { matches, third_place_match, meta, setParticipant, setMeta, fetchMatches, setScore, scoreMeta }
}

export default useTournamentMatches
