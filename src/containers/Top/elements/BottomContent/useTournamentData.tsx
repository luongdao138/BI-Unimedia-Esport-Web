import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/tournament'

const { selectors, actions } = tournament

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentData = () => {
  const dispatch = useAppDispatch()

  const recruitingTournaments = useAppSelector(selectors.getRecruitingTournaments)
  const getRecruitingTournaments = () => dispatch(actions.getRecruitingTournaments({ page: 1 }))

  return { recruitingTournaments, getRecruitingTournaments }
}

export default useTournamentData
