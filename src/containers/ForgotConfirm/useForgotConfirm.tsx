import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { UserConfirmParams } from '@services/auth.service'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'

const { selectors, actions } = authStore
const getForgotConfirm = createMetaSelector(actions.forgotConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useForgotConfirm = (confirmationCode: string) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const metaConfirm = useAppSelector(getForgotConfirm)

  const forgotConfirm = (params: UserConfirmParams) => dispatch(actions.forgotConfirm(params))

  const resetMeta = () => dispatch(clearMetaData(actions.forgotConfirm.typePrefix))

  const backAction = () => router.push('/forgot-password')

  useEffect(() => {
    if (metaConfirm.loaded) {
      router.push('/forgot-password/reset')
      resetMeta()
    }
  }, [metaConfirm.loaded])

  useEffect(() => {
    if (confirmationCode && !!metaConfirm.error) {
      resetMeta()
    }
  }, [confirmationCode])

  useEffect(() => {
    if (user === undefined) {
      router.push('/forgot-password')
    }
  }, [])

  return {
    user,
    forgotConfirm,
    metaConfirm,
    resetMeta,
    backAction,
  }
}

export default useForgotConfirm
