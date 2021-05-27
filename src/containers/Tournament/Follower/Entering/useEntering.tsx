import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'
import { clearMetaData } from '@store/metadata/actions'
import { TournamentFollowersParams } from '@services/tournament.service'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEntering = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const tournamentFollowers = useAppSelector(selectors.getTournamentFollowers)
  const pages = useAppSelector(selectors.getTournamentFollowersMeta)
  const getTournamentFollowers = (params: TournamentFollowersParams) => dispatch(actions.getTournamentFollowers(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getTournamentFollowers.typePrefix))

  return { handleClick, tournamentFollowers, getTournamentFollowers, pages, resetMeta }
}

export default useEntering
