import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { ProfileUpdateParams } from '@services/profile.service'
import profileStore from '@store/profile'

const { selectors, actions } = profileStore
const profileUpdateMeta = createMetaSelector(actions.profileUpdate)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUpdateProfile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectors.getProfile)
  const meta = useAppSelector(profileUpdateMeta)
  const profileUpdate = (param: ProfileUpdateParams) => dispatch(actions.profileUpdate(param))
  const resetMeta = () => dispatch(clearMetaData(actions.profileUpdate.typePrefix))
  return { profile, profileUpdate, resetMeta, meta }
}

export default useUpdateProfile
