import moment from 'moment'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { JoinParams, UpdateTournamentTeamParams } from '@services/arena.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import * as selectors from '@store/arena/selectors'
import useAddToast from '@utils/hooks/useAddToast'

const _closeMeta = createMetaSelector(actions.closeTournament)
const _joinMeta = createMetaSelector(actions.joinTournament)
const _leaveMeta = createMetaSelector(actions.leaveTournament)
const _updateTeamMeta = createMetaSelector(actions.updateTournamentTeamDetail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEntry = () => {
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const arena = useAppSelector(selectors.getTournamentDetail)
  const { addToast } = useAddToast()
  const isRecruitmentPeriodPassed = () => {
    const now = moment()
    const entryEnd = moment(arena.attributes.acceptance_end_date)
    return now.isSameOrAfter(entryEnd)
  }
  const join = async (param: JoinParams) => {
    if (isRecruitmentPeriodPassed()) {
      addToast(t('common:arena.entry_after_recruitment_period'))
      return
    }
    const resultAction = await dispatch(actions.joinTournament(param))
    if (actions.joinTournament.fulfilled.match(resultAction)) {
      dispatch(commonActions.addToast(t('common:arena.join_success')))
      dispatch(actions.getTournamentDetail(arena.attributes.hash_key))
    }
  }
  const leave = (param) => {
    if (isRecruitmentPeriodPassed()) {
      addToast(t('common:arena.leave_after_recruitment_period'))
      return
    }
    dispatch(actions.leaveTournament(param))
  }
  const updateTeam = (param: UpdateTournamentTeamParams) => dispatch(actions.updateTournamentTeamDetail(param))
  const close = (param) => dispatch(actions.closeTournament(param))

  const joinMeta = useAppSelector(_joinMeta)
  const leaveMeta = useAppSelector(_leaveMeta)
  const closeMeta = useAppSelector(_closeMeta)
  const updateTeamMeta = useAppSelector(_updateTeamMeta)

  const resetJoinMeta = () => dispatch(clearMetaData(actions.joinTournament.typePrefix))
  const resetLeaveMeta = () => dispatch(clearMetaData(actions.leaveTournament.typePrefix))
  const resetCloseMeta = () => dispatch(clearMetaData(actions.closeTournament.typePrefix))
  const resetUpdateTeamMeta = () => dispatch(clearMetaData(actions.updateTournamentTeamDetail.typePrefix))

  useEffect(() => {
    if (leaveMeta.loaded) {
      dispatch(commonActions.addToast(t('common:arena.leave_success')))
      resetLeaveMeta()
    }
  }, [leaveMeta.loaded])

  useEffect(() => {
    if (leaveMeta.error) {
      dispatch(commonActions.addToast(t('common:error.leave_arena_failed')))
      resetLeaveMeta()
    }
  }, [leaveMeta.error])

  useEffect(() => {
    if (closeMeta.loaded) {
      dispatch(commonActions.addToast(t('common:arena.close_entry_success')))
      resetCloseMeta()
    }
  }, [closeMeta.loaded])

  useEffect(() => {
    if (closeMeta.error) {
      dispatch(commonActions.addToast(t('common:error.close_arena_failed')))
      resetCloseMeta()
    }
  }, [closeMeta.error])

  useEffect(() => {
    if (updateTeamMeta.loaded) {
      dispatch(commonActions.addToast(t('common:arena.edit_entry_success')))
    }
  }, [updateTeamMeta.loaded])

  useEffect(() => {
    if (closeMeta.error) {
      dispatch(commonActions.addToast(t('common:error.failed')))
      resetUpdateTeamMeta()
    }
  }, [updateTeamMeta.error])

  return {
    join,
    leave,
    close,
    closeMeta,
    joinMeta,
    leaveMeta,
    resetJoinMeta,
    resetLeaveMeta,
    resetCloseMeta,
    updateTeam,
    updateTeamMeta,
    resetUpdateTeamMeta,
  }
}

export default useEntry
