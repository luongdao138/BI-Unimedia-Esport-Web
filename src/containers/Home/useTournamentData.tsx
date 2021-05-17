import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentData = () => {
  const dispatch = useAppDispatch()

  const tournamentFollowers = useAppSelector(selectors.getTournamentFollowers)
  const tournamentResults = useAppSelector(selectors.getTournamentResults)
  const getTournamentFollowers = () => dispatch(actions.tournamentFollowers())
  const getTournamentResults = () => dispatch(actions.tournamentResults())

  return { tournamentFollowers, tournamentResults, getTournamentFollowers, getTournamentResults }
}

export default useTournamentData
