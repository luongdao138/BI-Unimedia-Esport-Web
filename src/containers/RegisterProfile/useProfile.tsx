import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserProfileParams } from '@services/auth.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const { actions } = authStore
const getRegisterProfile = createMetaSelector(actions.registerProfile)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProfile = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getRegisterProfile)

  const registerProfile = (param: UserProfileParams) => dispatch(actions.registerProfile(param))

  const resetMeta = () => dispatch(clearMetaData(actions.registerProfile.typePrefix))

  const backAction = () => router.push(ESRoutes.REGISTER)

  useEffect(() => {
    if (meta.loaded) {
      router.push('/user-settings')
      resetMeta()
    }
  }, [meta.loaded])

  return { registerProfile, resetMeta, meta, backAction }
}

export default useProfile
