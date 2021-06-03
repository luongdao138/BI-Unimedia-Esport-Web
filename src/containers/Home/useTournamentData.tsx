import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/arena'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentData = () => {
  const dispatch = useAppDispatch()

  const tournamentFollowers = useAppSelector(selectors.getTournamentFollowers)
  const tournamentResults = useAppSelector(selectors.getTournamentResults)
  const getTournamentFollowers = () => dispatch(actions.getTournamentFollowers({ page: 1 }))
  const getTournamentResults = () => dispatch(actions.getTournamentResults({ page: 1 }))

  return { tournamentFollowers, tournamentResults, getTournamentFollowers, getTournamentResults }
}

export default useTournamentData
