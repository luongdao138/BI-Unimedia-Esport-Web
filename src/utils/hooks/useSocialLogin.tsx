import { useAppDispatch, useAppSelector } from '@store/hooks'
import { loginSocial } from '@store/auth/actions'
import { LoginSocialParams } from '@services/auth.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'
import { useEffect } from 'react'
import useReturnHref from '@utils/hooks/useReturnHref'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const getMeta = createMetaSelector(loginSocial)

const useSocialLogin = (
  type: string
): {
  meta: Meta
  login: (param: LoginSocialParams) => void
  resetMeta: () => void
  cookies: {
    loginType?: any
    redirectTo?: any
  }
} => {
  const dispatch = useAppDispatch()
  const { handleLogin, navigateScreen } = useReturnHref()
  const meta = useAppSelector(getMeta)
  const router = useRouter()
  const { hasUCRReturnHref } = useReturnHref()
  const [cookies, setCookie, removeCookie] = useCookies(['loginType', 'redirectTo'])

  const login = (param) => {
    dispatch(loginSocial(param))
  }

  const resetMeta = () => dispatch(clearMetaData(loginSocial.typePrefix))

  useEffect(() => {
    if (type !== '') {
      setCookie('loginType', router.asPath, { path: '/' })
      setCookie('redirectTo', hasUCRReturnHref ? router.query._UCR_return_href : ESRoutes.HOME, { path: '/' })
    }
    return function () {
      removeCookie('loginType')
      removeCookie('redirectTo')
    }
  }, [])

  useEffect(() => {
    if (meta.loaded) {
      if (type === 'login') handleLogin()
      if (type === 'register') navigateScreen(ESRoutes.REGISTER_PROFILE)
      removeCookie('loginType')
      removeCookie('redirectTo')
      resetMeta()
    }
  }, [meta])
  return { meta, login, resetMeta, cookies }
}

export default useSocialLogin
