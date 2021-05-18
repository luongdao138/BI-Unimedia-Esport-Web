import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEntering = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const tournamentFollowers = useAppSelector(selectors.getTournamentFollowers)
  const getTournamentFollowers = () => dispatch(actions.getTournamentFollowers())

  return { handleClick, tournamentFollowers, getTournamentFollowers }
}

export default useEntering
