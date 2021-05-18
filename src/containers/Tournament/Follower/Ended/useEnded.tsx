import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEnded = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const tournamentResults = useAppSelector(selectors.getTournamentResults)
  const getTournamentResults = () => dispatch(actions.getTournamentResults())

  return { handleClick, tournamentResults, getTournamentResults }
}

export default useEnded
