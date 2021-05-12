import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserResetPasswordParams } from '@services/auth.service'
import { useRouter } from 'next/router'

const { actions, selectors } = authStore
const getResetPasswordMeta = createMetaSelector(actions.resetPassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useResetPassword = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getResetPasswordMeta)
  const user = useAppSelector(selectors.getAuth)

  const resetPassword = (param: UserResetPasswordParams) => dispatch(actions.resetPassword(param))

  const resetMeta = () => dispatch(clearMetaData(actions.resetPassword.typePrefix))

  const backAction = () => router.push('/forgot-password')

  useEffect(() => {
    if (meta.loaded) {
      router.push('/login')
      resetMeta()
    }
  }, [meta.loaded])

  return { user, resetPassword, resetMeta, meta, backAction }
}

export default useResetPassword
