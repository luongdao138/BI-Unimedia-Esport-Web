import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecruitingData = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recruitingTournaments = useAppSelector(selectors.getRecruitingTournaments)
  const getRecruitingTournaments = () => dispatch(actions.getRecruitingTournaments())

  return { handleClick, recruitingTournaments, getRecruitingTournaments }
}

export default useRecruitingData
