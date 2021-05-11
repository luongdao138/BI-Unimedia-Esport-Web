import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserLoginParams } from '@services/auth.service'
import { useRouter } from 'next/router'

const { selectors, actions } = authStore
const getRegisterMeta = createMetaSelector(actions.registerByEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRegisterByEmail = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getRegisterMeta)

  const registerByEmail = (param: UserLoginParams) => dispatch(actions.registerByEmail(param))

  const resetMeta = () => dispatch(clearMetaData(actions.registerByEmail.typePrefix))

  const backAction = () => router.push('/register')

  useEffect(() => {
    if (meta.loaded) {
      router.push('/register/confirm')
      resetMeta()
    }
  }, [meta.loaded])

  return { user, registerByEmail, resetMeta, meta, backAction }
}

export default useRegisterByEmail
