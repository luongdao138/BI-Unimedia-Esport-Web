import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserProfileParams } from '@services/auth.service'
import { ESRoutes } from '@constants/route.constants'
import { getUserProfile } from '@store/userProfile/actions'
import useReturnHref from '@utils/hooks/useReturnHref'

const { actions } = authStore
const getRegisterProfile = createMetaSelector(actions.registerProfile)
const getProfileMeta = createMetaSelector(getUserProfile)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProfile = () => {
  const { navigateScreen } = useReturnHref()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getRegisterProfile)
  const profileMeta = useAppSelector(getProfileMeta)

  const registerProfile = (param: UserProfileParams) => dispatch(actions.registerProfile(param))

  const resetMeta = () => dispatch(clearMetaData(actions.registerProfile.typePrefix))

  const backAction = () => navigateScreen(ESRoutes.REGISTER)

  useEffect(() => {
    if (meta.loaded) {
      dispatch(getUserProfile())
    }
  }, [meta.loaded])

  useEffect(() => {
    if (profileMeta.loaded && meta.loaded) {
      resetMeta()
      navigateScreen(ESRoutes.USER_SETTINGS)
    }
  }, [profileMeta.loaded, meta.loaded])

  return { registerProfile, resetMeta, meta, backAction }
}

export default useProfile
