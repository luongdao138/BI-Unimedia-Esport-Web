import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/arena'
import { clearMetaData } from '@store/metadata/actions'
import { TournamentFollowersParams } from '@services/arena.service'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = tournament
const getTournamentFollowersMeta = createMetaSelector(actions.getTournamentFollowers)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEntering = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()
  const meta = useAppSelector(getTournamentFollowersMeta)

  const tournamentFollowers = useAppSelector(selectors.getTournamentFollowers)
  const pages = useAppSelector(selectors.getTournamentFollowersMeta)
  const getTournamentFollowers = (params: TournamentFollowersParams) => dispatch(actions.getTournamentFollowers(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getTournamentFollowers.typePrefix))

  return { handleClick, tournamentFollowers, getTournamentFollowers, pages, meta, resetMeta }
}

export default useEntering
