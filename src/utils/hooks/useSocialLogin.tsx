import { useAppDispatch, useAppSelector } from '@store/hooks'
import { loginSocial } from '@store/auth/actions'
import { LoginSocialParams } from '@services/auth.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'
import { useEffect } from 'react'
import useReturnHref from '@utils/hooks/useReturnHref'

const getMeta = createMetaSelector(loginSocial)

const useSocialLogin = (type: string): { meta: Meta; login: (param: LoginSocialParams) => void; resetMeta: () => void } => {
  const dispatch = useAppDispatch()
  const { handleLogin, handleRegister } = useReturnHref()
  const meta = useAppSelector(getMeta)
  const login = (param) => {
    dispatch(loginSocial(param))
  }

  const resetMeta = () => dispatch(clearMetaData(loginSocial.typePrefix))

  useEffect(() => {
    if (meta.loaded) {
      if (type === 'login') handleLogin()
      if (type === 'register') handleRegister()

      resetMeta()
    }
  }, [meta])
  return { meta, login, resetMeta }
}

export default useSocialLogin
