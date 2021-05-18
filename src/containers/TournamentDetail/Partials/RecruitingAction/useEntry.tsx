import { useAppDispatch } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import { JoinParams } from '@services/tournament.service'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEntry = (): { join: (param: JoinParams) => void; leave: (param: string) => void } => {
  const dispatch = useAppDispatch()
  const join = (param: JoinParams) => dispatch(actions.joinTournament(param))
  const leave = (param) => dispatch(actions.leaveTournament(param))
  return { join, leave }
}

export default useEntry
