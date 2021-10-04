import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/arena'

const { selectors, actions } = store
const getMeta = createMetaSelector(actions.getBattleRoyaleParticipants)
const getMetaSorted = createMetaSelector(actions.getBattleRoyaleWinners)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useBRParticipants = () => {
  const dispatch = useAppDispatch()
  const participants = useAppSelector(selectors.getBattleRoyaleParticipants)
  const meta = useAppSelector(getMeta)
  const metaSorted = useAppSelector(getMetaSorted)
  const getBattleRoyaleParticipantsSorted = (param) => dispatch(actions.getBattleRoyaleWinners(param))
  const getBattleRoyaleParticipants = (param) => dispatch(actions.getBattleRoyaleParticipants(param))
  const resetParticipants = () => dispatch(actions.resetParticipants())
  const resetMeta = () => {
    dispatch(clearMetaData(actions.getBattleRoyaleParticipants.typePrefix))
    dispatch(clearMetaData(actions.getBattleRoyaleWinners.typePrefix))
  }

  return {
    participants,
    getBattleRoyaleParticipants,
    getBattleRoyaleParticipantsSorted,
    resetParticipants,
    resetMeta,
    meta,
    metaSorted,
  }
}

export default useBRParticipants
