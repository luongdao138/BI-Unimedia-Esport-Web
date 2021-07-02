import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/arena'

const { selectors, actions } = store
const _getMeta = createMetaSelector(actions.getParticipantName)
const _changeMeta = createMetaSelector(actions.changeParticipantName)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useParticipantDetail = () => {
  const dispatch = useAppDispatch()
  const participant = useAppSelector(selectors.getParticipant)
  const getMeta = useAppSelector(_getMeta)
  const changeMeta = useAppSelector(_changeMeta)

  const getParticipant = (hashKey: string, pid?: number) => dispatch(actions.getParticipantName({ hash_key: hashKey, pid: pid }))
  const changeName = async (hashKey: string, name: string, successCB: () => void) => {
    const resultAction = await dispatch(actions.changeParticipantName({ hash_key: hashKey, data: { name: name } }))
    if (actions.changeParticipantName.fulfilled.match(resultAction)) {
      successCB()
    }
  }
  const resetMeta = () => dispatch(clearMetaData(actions.getParticipantName.typePrefix))
  const isPending = getMeta.pending || changeMeta.pending
  const changeDone = changeMeta.loaded || changeMeta.error

  return { getParticipant, resetMeta, isPending, participant, changeName, changeDone }
}

export default useParticipantDetail
