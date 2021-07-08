import { useAppDispatch, useAppSelector } from '@store/hooks'
import tournament from '@store/arena'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = tournament
const getRecruitingTournamentsMeta = createMetaSelector(actions.getRecruitingTournaments)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentData = () => {
  const dispatch = useAppDispatch()

  const meta = useAppSelector(getRecruitingTournamentsMeta)
  const recruitingTournaments = useAppSelector(selectors.getRecruitingTournaments)
  const getRecruitingTournaments = () => dispatch(actions.getRecruitingTournaments({ page: 1 }))

  return { recruitingTournaments, getRecruitingTournaments, meta }
}

export default useTournamentData
