import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/arena'
import { clearMetaData } from '@store/metadata/actions'
import { RecruitingTournamentParams } from '@services/arena.service'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecruitingData = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recruitingTournaments = useAppSelector(selectors.getRecruitingTournaments)
  const pages = useAppSelector(selectors.getRecruitingTournamentsMeta)
  const getRecruitingTournaments = (params: RecruitingTournamentParams) => dispatch(actions.getRecruitingTournaments(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getRecruitingTournaments.typePrefix))

  return { handleClick, recruitingTournaments, getRecruitingTournaments, pages, resetMeta }
}

export default useRecruitingData
