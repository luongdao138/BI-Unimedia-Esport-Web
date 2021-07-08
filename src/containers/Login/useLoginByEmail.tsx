import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserLoginParams } from '@services/auth.service'
import useReturnHref from '@utils/hooks/useReturnHref'

const { selectors, actions } = authStore
const getLoginMeta = createMetaSelector(actions.loginByEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLoginByEmail = () => {
  const { handleReturn, handleLogin } = useReturnHref()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getLoginMeta)
  const loginByEmail = (param: UserLoginParams) => dispatch(actions.loginByEmail(param))
  const resetMeta = () => dispatch(clearMetaData(actions.loginByEmail.typePrefix))
  const resetSocialMeta = () => dispatch(clearMetaData(actions.loginSocial.typePrefix))
  const handleClick = () => {
    resetSocialMeta()
    resetMeta()
    handleReturn()
  }

  useEffect(() => {
    if (meta.loaded) {
      handleLogin()
      resetMeta()
    }
  }, [meta.loaded])

  return { user, loginByEmail, resetMeta, meta, handleClick }
}

export default useLoginByEmail
