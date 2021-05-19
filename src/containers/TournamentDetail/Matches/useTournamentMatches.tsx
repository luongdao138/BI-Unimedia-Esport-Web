import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import * as selectors from '@store/tournament/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { SetParticipantParams, TournamentMatchRound } from '@services/tournament.service'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.getTournamentMatches)

const useTournamentMatches = (): {
  matches: TournamentMatchRound[]
  third_place_match: TournamentMatchRound
  meta: Meta
  fetchMatches: () => void
  setParticipant: (params: SetParticipantParams) => void
} => {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
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
  return { matches, third_place_match, meta, setParticipant, fetchMatches }
}

export default useTournamentMatches
