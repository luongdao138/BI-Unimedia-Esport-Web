import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'
import { clearMetaData } from '@store/metadata/actions'
import { TournamentResultsParams } from '@services/tournament.service'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEnded = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const tournamentResults = useAppSelector(selectors.getTournamentResults)
  const pages = useAppSelector(selectors.getTournamentResultsMeta)
  const getTournamentResults = (params: TournamentResultsParams) => dispatch(actions.getTournamentResults(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getTournamentResults.typePrefix))

  return { handleClick, tournamentResults, getTournamentResults, pages, resetMeta }
}

export default useEnded
