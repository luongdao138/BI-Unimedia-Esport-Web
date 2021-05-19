import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import * as selectors from '@store/tournament/selectors'
import { createMetaSelector } from '@store/metadata/selectors'
import { TournamentMatchRound } from '@services/tournament.service'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.getTournamentMatches)

const useTournamentMatches = (): { matches: TournamentMatchRound[]; third_place_match: TournamentMatchRound; meta: Meta } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const { matches, third_place_match } = useAppSelector(selectors.getTournamentMatches)
  useEffect(() => {
    dispatch(actions.getTournamentMatches('328'))
  }, [])
  return { matches, third_place_match, meta }
}

export default useTournamentMatches
