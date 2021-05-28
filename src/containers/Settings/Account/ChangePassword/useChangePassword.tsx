import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'

const { actions } = userProfile
const getChangePasswordMeta = createMetaSelector(actions.changePassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangePassword = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const meta = useAppSelector(getChangePasswordMeta)

  const changePassword = (params: services.ChangePasswordParams) => {
    dispatch(actions.changePassword(params))
  }

  useEffect(() => {
    if (meta.loaded) {
      router.push(ESRoutes.USER_ACCOUNT_SETTINGS)
    }
  }, [meta.loaded])

  return { changePassword, meta }
}

export default useChangePassword
