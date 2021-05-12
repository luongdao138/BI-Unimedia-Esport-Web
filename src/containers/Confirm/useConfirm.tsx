import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { UserConfirmParams } from '@services/auth.service'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'

const { selectors, actions } = authStore
const getRegisterConfirmMeta = createMetaSelector(actions.registerConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useConfirm = (confirmationCode: string) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const metaConfirm = useAppSelector(getRegisterConfirmMeta)

  const registerConfirm = (params: UserConfirmParams) => dispatch(actions.registerConfirm(params))

  const resetMeta = () => dispatch(clearMetaData(actions.registerConfirm.typePrefix))

  const backAction = () => router.push('/register/by-email')

  useEffect(() => {
    if (metaConfirm.loaded) {
      router.push('/register/profile')
      resetMeta()
    }
  }, [metaConfirm.loaded])

  useEffect(() => {
    if (confirmationCode && !!metaConfirm.error) {
      resetMeta()
    }
  }, [confirmationCode])

  return {
    user,
    registerConfirm,
    metaConfirm,
    resetMeta,
    backAction,
  }
}

export default useConfirm
