import { useAppDispatch, useAppSelector } from '@store/hooks'
import { loginSocial } from '@store/auth/actions'
import { LoginSocialParams } from '@services/auth.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'
import { useEffect } from 'react'

const getMeta = createMetaSelector(loginSocial)

const useSocialLogin = (): { meta: Meta; login: (param: LoginSocialParams) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const login = (param) => {
    dispatch(loginSocial(param))
  }
  useEffect(() => {
    if (meta.loaded) {
      dispatch(clearMetaData(loginSocial.typePrefix))
    }
  }, [meta])
  return { meta, login }
}

export default useSocialLogin
