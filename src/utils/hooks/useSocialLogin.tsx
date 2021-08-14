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
import { useState } from 'react'

const getMeta = createMetaSelector(loginSocial)

const useSocialLogin = (
  type: string
): {
  meta: Meta
  login: (param: LoginSocialParams) => void
  resetMeta: () => void
  redirectTo: string | string[]
} => {
  const dispatch = useAppDispatch()
  const { handleLogin, navigateScreen } = useReturnHref()
  const meta = useAppSelector(getMeta)
  const router = useRouter()
  const { hasUCRReturnHref } = useReturnHref()
  const [redirectTo, setRedirectTo] = useState<string | string[]>('')

  const login = (param) => {
    dispatch(loginSocial(param))
  }

  const resetMeta = () => {
    dispatch(clearMetaData(loginSocial.typePrefix))
  }

  useEffect(() => {
    if (type !== '') {
      setRedirectTo(hasUCRReturnHref ? router.query._UCR_return_href : ESRoutes.HOME)
    }
  }, [])

  useEffect(() => {
    if (meta.loaded) {
      if (type === 'login') handleLogin()
      if (type === 'register') navigateScreen(ESRoutes.REGISTER_PROFILE)
      resetMeta()
    }
  }, [meta])

  return { meta, login, resetMeta, redirectTo }
}

export default useSocialLogin
