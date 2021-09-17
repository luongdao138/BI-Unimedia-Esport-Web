import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { FreezeMatchParams, SetBattleRoyaleScoresParams, SetParticipantParams, SetParticipantsParams } from '@services/arena.service'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const _setParticipantMeta = createMetaSelector(actions.setParticipant)
const _setParticipantsMeta = createMetaSelector(actions.setParticipants)
const _setBattleRoyaleScores = createMetaSelector(actions.setBattleRoyaleScores)
const _randomizeMeta = createMetaSelector(actions.randomizeTournament)
const _freezeMeta = createMetaSelector(actions.freezeTournament)

const useModeratorActions = (): {
  setParticipant: (params: SetParticipantParams) => void
  setParticipants: (params: SetParticipantsParams, cb?: () => void) => void
  setBattleRoyaleScores: (params: SetBattleRoyaleScoresParams) => void
  randomize: (params: string) => void
  freeze: (params: FreezeMatchParams) => void
  setBattleRoyaleScoresMeta: Meta
  setParticipantMeta: Meta
  setParticipantsMeta: Meta
  randomizeMeta: Meta
  freezeMeta: Meta
  resetParticipantMeta: () => void
  resetParticipantsMeta: () => void
  resetRandomizeMeta: () => void
  resetFreezeMeta: () => void
} => {
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const router = useRouter()

  const setParticipant = (param: SetParticipantParams) => dispatch(actions.setParticipant(param))
  const setParticipants = async (param: SetParticipantsParams, cb?: () => void) => {
    const resultAction = await dispatch(actions.setParticipants(param))
    if (actions.setParticipants.fulfilled.match(resultAction) && !!cb) {
      cb()
    }
  }
  const randomize = (param: string) => dispatch(actions.randomizeTournament(param))
  const freeze = (params) => dispatch(actions.freezeTournament(params))

  const setBattleRoyaleScores = (params: SetBattleRoyaleScoresParams) => dispatch(actions.setBattleRoyaleScores(params))

  const setParticipantMeta = useAppSelector(_setParticipantMeta)
  const setParticipantsMeta = useAppSelector(_setParticipantsMeta)
  const setBattleRoyaleScoresMeta = useAppSelector(_setBattleRoyaleScores)
  const randomizeMeta = useAppSelector(_randomizeMeta)
  const freezeMeta = useAppSelector(_freezeMeta)

  const resetParticipantMeta = () => dispatch(clearMetaData(actions.setParticipant.typePrefix))
  const resetParticipantsMeta = () => dispatch(clearMetaData(actions.setParticipants.typePrefix))
  const resetRandomizeMeta = () => dispatch(clearMetaData(actions.randomizeTournament.typePrefix))
  const resetFreezeMeta = () => dispatch(clearMetaData(actions.freezeTournament.typePrefix))

  useEffect(() => {
    if (randomizeMeta.loaded) {
      dispatch(commonActions.addToast(t('common:arena.randomize_success')))
      resetRandomizeMeta()
    }
  }, [randomizeMeta.loaded])

  useEffect(() => {
    if (freezeMeta.loaded) {
      dispatch(commonActions.addToast(t('common:arena.freeze_success')))
      resetFreezeMeta()
    }
  }, [freezeMeta.loaded])

  useEffect(() => {
    if (!!freezeMeta.error || !!randomizeMeta.error || !!setParticipantsMeta.error) {
      dispatch(commonActions.addToast(t('common:arena.failed_to_update_match')))
      resetFreezeMeta()
      resetRandomizeMeta()
      resetParticipantsMeta()
      setTimeout(() => router.reload(), 3000)
    }
  }, [freezeMeta.error, randomizeMeta.error, setParticipantsMeta.error])

  return {
    setParticipant,
    setParticipants,
    setParticipantMeta,
    setParticipantsMeta,
    setBattleRoyaleScores,
    setBattleRoyaleScoresMeta,
    randomize,
    freeze,
    randomizeMeta,
    freezeMeta,
    resetParticipantMeta,
    resetParticipantsMeta,
    resetRandomizeMeta,
    resetFreezeMeta,
  }
}

export default useModeratorActions
