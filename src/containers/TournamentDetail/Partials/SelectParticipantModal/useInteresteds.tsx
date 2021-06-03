import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/tournament'

const { selectors, actions } = store
const getMeta = createMetaSelector(actions.getTournamentInteresteds)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useInteresteds = () => {
  const dispatch = useAppDispatch()
  const interesteds = useAppSelector(selectors.getInteresteds)
  const page = useAppSelector(selectors.getInterestedsMeta)
  const meta = useAppSelector(getMeta)
  const getInteresteds = (param) => dispatch(actions.getTournamentInteresteds(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getTournamentInteresteds.typePrefix))
  return { interesteds, getInteresteds, resetMeta, meta, page }
}

export default useInteresteds
