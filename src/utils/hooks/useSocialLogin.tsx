import { useAppDispatch, useAppSelector } from '@store/hooks'
import { loginSocial } from '@store/auth/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { LoginSocialParams } from '@services/auth.service'

const getMeta = createMetaSelector(loginSocial)

const useSocialLogin = (): { meta: Meta; login: (param: LoginSocialParams) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const login = (param) => {
    dispatch(loginSocial(param))
  }
  return { meta, login }
}

export default useSocialLogin
