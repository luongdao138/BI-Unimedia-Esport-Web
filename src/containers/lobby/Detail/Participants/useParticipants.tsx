import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/arena'

const { selectors, actions } = store
const getMeta = createMetaSelector(actions.getTournamentParticipants)
//TODO arena useParticipants-тай яг адилхан байгаа
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useParticipants = () => {
  const dispatch = useAppDispatch()
  const participants = useAppSelector(selectors.getParticipants)
  const page = useAppSelector(selectors.getParticipantsMeta)
  const meta = useAppSelector(getMeta)
  const getParticipants = (param) => dispatch(actions.getTournamentParticipants(param))
  const resetParticipants = () => dispatch(actions.resetParticipants())
  const resetMeta = () => dispatch(clearMetaData(actions.getTournamentParticipants.typePrefix))
  return { participants, getParticipants, resetParticipants, resetMeta, meta, page }
}

export default useParticipants
