import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/arena'

const { selectors, actions } = store
const getMeta = createMetaSelector(actions.getSuggestedTeamMembers)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSuggestedTeamMembers = () => {
  const dispatch = useAppDispatch()
  const suggestedTeamMembers = useAppSelector(selectors.getSuggestedTeamMembers)
  const page = useAppSelector(selectors.getSuggestedTeamMembersMeta)
  const meta = useAppSelector(getMeta)
  const getSuggestedTeamMembers = (params) => dispatch(actions.getSuggestedTeamMembers(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getSuggestedTeamMembers.typePrefix))
  return { suggestedTeamMembers, getSuggestedTeamMembers, resetMeta, meta, page }
}

export default useSuggestedTeamMembers
