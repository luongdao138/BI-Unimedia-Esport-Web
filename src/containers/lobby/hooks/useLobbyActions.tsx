import * as actions from '@store/lobby/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'

const entryMetaSelector = createMetaSelector(actions.entryLobby)
const cancelMetaSelector = createMetaSelector(actions.cancelLobby)
const unjoinMetaSelector = createMetaSelector(actions.unjoinLobby)

const useLobbyActions = (): {
  entryMeta: Meta
  cancelMeta: Meta
  unjoinMeta: Meta
  entry: (id: number) => void
  cancel: (id: number) => void
  unjoin: (id: number) => void
} => {
  const dispatch = useAppDispatch()
  const entryMeta = useAppSelector(entryMetaSelector)
  const cancelMeta = useAppSelector(cancelMetaSelector)
  const unjoinMeta = useAppSelector(unjoinMetaSelector)
  const entry = (id: number) => {
    dispatch(actions.entryLobby(id))
  }
  const cancel = (id: number) => {
    dispatch(actions.cancelLobby(id))
  }
  const unjoin = (id: number) => {
    dispatch(actions.unjoinLobby(id))
  }
  return {
    entryMeta,
    cancelMeta,
    unjoinMeta,
    entry,
    cancel,
    unjoin,
  }
}

export default useLobbyActions
