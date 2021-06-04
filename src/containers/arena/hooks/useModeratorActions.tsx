import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { SetParticipantParams, SetParticipantsParams } from '@services/arena.service'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const _setParticipantMeta = createMetaSelector(actions.setParticipant)
const _setParticipantsMeta = createMetaSelector(actions.setParticipants)
const _randomizeMeta = createMetaSelector(actions.randomizeTournament)
const _freezeMeta = createMetaSelector(actions.freezeTournament)

const useModeratorActions = (): {
  setParticipant: (params: SetParticipantParams) => void
  setParticipants: (params: SetParticipantsParams) => void
  randomize: (params: string) => void
  freeze: (params: string) => void
  setParticipantMeta: Meta
  setParticipantsMeta: Meta
  randomizeMeta: Meta
  freezeMeta: Meta
  resetParticipantMeta: () => void
  resetParticipantsMeta: () => void
  resetRandomizeMeta: () => void
  resetFreezeMeta: () => void
} => {
  const dispatch = useAppDispatch()

  const setParticipant = (param: SetParticipantParams) => dispatch(actions.setParticipant(param))
  const setParticipants = (param: SetParticipantsParams) => dispatch(actions.setParticipants(param))
  const randomize = (param: string) => dispatch(actions.randomizeTournament(param))
  const freeze = (param: string) => dispatch(actions.freezeTournament(param))

  const setParticipantMeta = useAppSelector(_setParticipantMeta)
  const setParticipantsMeta = useAppSelector(_setParticipantsMeta)
  const randomizeMeta = useAppSelector(_randomizeMeta)
  const freezeMeta = useAppSelector(_freezeMeta)

  const resetParticipantMeta = () => dispatch(clearMetaData(actions.setParticipant.typePrefix))
  const resetParticipantsMeta = () => dispatch(clearMetaData(actions.setParticipants.typePrefix))
  const resetRandomizeMeta = () => dispatch(clearMetaData(actions.randomizeTournament.typePrefix))
  const resetFreezeMeta = () => dispatch(clearMetaData(actions.freezeTournament.typePrefix))
  return {
    setParticipant,
    setParticipants,
    setParticipantMeta,
    setParticipantsMeta,
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
