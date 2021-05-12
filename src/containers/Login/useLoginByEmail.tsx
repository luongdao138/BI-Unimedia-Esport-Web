import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserLoginParams } from '@services/auth.service'
import { useRouter } from 'next/router'

const { selectors, actions } = authStore
const getLoginMeta = createMetaSelector(actions.loginByEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLoginByEmail = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getLoginMeta)
  const loginByEmail = (param: UserLoginParams) => dispatch(actions.loginByEmail(param))
  const resetMeta = () => dispatch(clearMetaData(actions.loginByEmail.typePrefix))
  const handleClick = () => router.push('/home')

  useEffect(() => {
    if (meta.loaded) {
      router.push('/home')
      resetMeta()
    }
  }, [meta.loaded])

  return { user, loginByEmail, resetMeta, meta, handleClick }
}

export default useLoginByEmail
