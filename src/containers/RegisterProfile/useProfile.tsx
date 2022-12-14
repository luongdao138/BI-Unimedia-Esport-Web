import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserProfileParams } from '@services/auth.service'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const { actions, selectors } = authStore
const getRegisterProfile = createMetaSelector(actions.registerProfile)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProfile = () => {
  const { navigateScreen } = useReturnHref()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getRegisterProfile)
  const isSocial = useAppSelector(selectors.getIsSocial)

  const registerProfile = (param: UserProfileParams) => dispatch(actions.registerProfile(param))

  const resetMeta = () => dispatch(clearMetaData(actions.registerProfile.typePrefix))

  const backAction = () => navigateScreen(ESRoutes.REGISTER)

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
      navigateScreen(ESRoutes.USER_SETTINGS)
    }
  }, [meta.loaded])

  return { registerProfile, resetMeta, meta, backAction, isSocial }
}

export default useProfile
