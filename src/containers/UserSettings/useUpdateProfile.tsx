import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { ProfileUpdateParams } from '@services/user.service'
import profileStore from '@store/userProfile'

const { selectors, actions } = profileStore
const _profileUpdateMeta = createMetaSelector(actions.profileUpdate)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUpdateProfile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectors.getUserProfile)
  const profileUpdateMeta = useAppSelector(_profileUpdateMeta)
  const profileUpdate = (param: ProfileUpdateParams) => dispatch(actions.profileUpdate(param))
  const resetProfileUpdateMeta = () => dispatch(clearMetaData(actions.profileUpdate.typePrefix))
  return { profile, profileUpdate, resetProfileUpdateMeta, profileUpdateMeta }
}

export default useUpdateProfile
