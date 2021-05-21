import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import { JoinParams } from '@services/tournament.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const _closeMeta = createMetaSelector(actions.closeTournament)
const _joinMeta = createMetaSelector(actions.joinTournament)
const _leaveMeta = createMetaSelector(actions.leaveTournament)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEntry = (): {
  join: (param: JoinParams) => void
  leave: (param: string) => void
  close: (param: string) => void
  closeMeta: Meta
  joinMeta: Meta
  leaveMeta: Meta
  resetJoinMeta: () => void
  resetLeaveMeta: () => void
  resetCloseMeta: () => void
} => {
  const dispatch = useAppDispatch()
  const join = (param: JoinParams) => dispatch(actions.joinTournament(param))
  const leave = (param) => dispatch(actions.leaveTournament(param))
  const close = (param) => dispatch(actions.closeTournament(param))

  const joinMeta = useAppSelector(_joinMeta)
  const leaveMeta = useAppSelector(_leaveMeta)
  const closeMeta = useAppSelector(_closeMeta)

  const resetJoinMeta = () => dispatch(clearMetaData(actions.joinTournament.typePrefix))
  const resetLeaveMeta = () => dispatch(clearMetaData(actions.leaveTournament.typePrefix))
  const resetCloseMeta = () => dispatch(clearMetaData(actions.closeTournament.typePrefix))

  return { join, leave, close, closeMeta, joinMeta, leaveMeta, resetJoinMeta, resetLeaveMeta, resetCloseMeta }
}

export default useEntry
