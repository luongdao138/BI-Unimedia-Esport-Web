import * as actions from '@store/lobby/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'

const entryMetaSelector = createMetaSelector(actions.entryLobby)
const cancelMetaSelector = createMetaSelector(actions.cancelLobby)
const unjoinMetaSelector = createMetaSelector(actions.unjoinLobby)

const useLobbyActions = (): {
  entryMeta: Meta
  cancelMeta: Meta
  unjoinMeta: Meta
} => {
  const entryMeta = useAppSelector(entryMetaSelector)
  const cancelMeta = useAppSelector(cancelMetaSelector)
  const unjoinMeta = useAppSelector(unjoinMetaSelector)
  return {
    entryMeta,
    cancelMeta,
    unjoinMeta,
  }
}

export default useLobbyActions
