import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/arena'
import { createMetaSelector } from '@store/metadata/selectors'
const { selectors, actions } = tournament
const getTournamentFollowersMeta = createMetaSelector(actions.getTournamentFollowers)
const getTournamentResultsMeta = createMetaSelector(actions.getTournamentResults)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentData = () => {
  const dispatch = useAppDispatch()

  const tournamentFollowers = useAppSelector(selectors.getTournamentFollowers)
  const tournamentResults = useAppSelector(selectors.getTournamentResults)

  const tournamentFollowersMeta = useAppSelector(getTournamentFollowersMeta)
  const tournamentResultsMeta = useAppSelector(getTournamentResultsMeta)
  const getTournamentFollowers = () => dispatch(actions.getTournamentFollowers({ page: 1 }))
  const getTournamentResults = () => dispatch(actions.getTournamentResults({ page: 1 }))

  return {
    tournamentFollowers,
    tournamentResults,
    getTournamentFollowers,
    getTournamentResults,
    tournamentFollowersMeta,
    tournamentResultsMeta,
  }
}

export default useTournamentData
