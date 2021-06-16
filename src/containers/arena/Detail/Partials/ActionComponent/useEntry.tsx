import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { JoinParams } from '@services/arena.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation(['common'])
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

  useEffect(() => {
    if (joinMeta.error) {
      dispatch(commonActions.addToast(t('common:error.join_arena_failed')))
      resetJoinMeta()
    }
  }, [joinMeta.error])

  useEffect(() => {
    if (leaveMeta.error) {
      dispatch(commonActions.addToast(t('common:error.leave_arena_failed')))
      resetLeaveMeta()
    }
  }, [leaveMeta.error])

  useEffect(() => {
    if (closeMeta.error) {
      dispatch(commonActions.addToast(t('common:error.close_arena_failed')))
      resetCloseMeta()
    }
  }, [closeMeta.error])

  return { join, leave, close, closeMeta, joinMeta, leaveMeta, resetJoinMeta, resetLeaveMeta, resetCloseMeta }
}

export default useEntry
