import * as actions from '@store/lobby/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { participantSelector } from '@store/lobby/selectors'
import { ParticipantsItem } from '@services/lobby.service'

const entryMetaSelector = createMetaSelector(actions.entryLobby)
const cancelMetaSelector = createMetaSelector(actions.cancelLobby)
const unjoinMetaSelector = createMetaSelector(actions.unjoinLobby)
const participantsMetaSelector = createMetaSelector(actions.getParticipants)

const useLobbyActions = (): {
  entryMeta: Meta
  cancelMeta: Meta
  unjoinMeta: Meta
  entry: (id: number) => void
  cancel: (id: number) => void
  unjoin: (id: number) => void
  getParticipants: (id: number) => void
  participants: ParticipantsItem[]
  participantsMeta: Meta
} => {
  const dispatch = useAppDispatch()
  const entryMeta = useAppSelector(entryMetaSelector)
  const cancelMeta = useAppSelector(cancelMetaSelector)
  const unjoinMeta = useAppSelector(unjoinMetaSelector)
  const participantsMeta = useAppSelector(participantsMetaSelector)
  const participants = useAppSelector(participantSelector)
  const entry = (id: number) => {
    dispatch(actions.entryLobby(id))
  }
  const cancel = (id: number) => {
    dispatch(actions.cancelLobby(id))
  }
  const unjoin = (id: number) => {
    dispatch(actions.unjoinLobby(id))
  }
  const getParticipants = (id: number) => {
    dispatch(actions.getParticipants(id))
  }
  return {
    entryMeta,
    cancelMeta,
    unjoinMeta,
    entry,
    cancel,
    unjoin,
    getParticipants,
    participantsMeta,
    participants,
  }
}

export default useLobbyActions
