import FullScreenLoader from '@components/FullScreenLoader'
import { ESRoutes } from '@constants/route.constants'
import { LoginSocialParams } from '@services/auth.service'
import getLineAccessToken, { GetLineAccessTokenResponse } from '@utils/helpers/getLineAccessToken'
import useSocialLogin from '@utils/hooks/useSocialLogin'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'
import cookies from 'next-cookies'

interface LineCallbackPage extends GetLineAccessTokenResponse {
  loginType?: 'login' | 'register'
  redirectTo?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<LineCallbackPage | {}, ParsedUrlQuery> = async (context) => {
  if (context.query.code) {
    const { loginType, redirectTo } = cookies(context)
    const type = loginType === '/login' ? 'login' : 'register'
    const res = await getLineAccessToken(context.query.code)
    return { props: { ...res, loginType: type, redirectTo: redirectTo || ESRoutes.HOME } }
  }
  return {
    props: {},
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const LineCallbackPage: React.FC<LineCallbackPage> = ({ access_token, redirectTo, loginType }) => {
  const { cookies, login, meta, resetMeta } = useSocialLogin('')
  const router = useRouter()
  useEffect(() => {
    if (access_token) {
      const params: LoginSocialParams = {
        social_channel: 'line',
        access_token: access_token,
        type: loginType,
      }
      login(params)
    }
  }, [access_token])
  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
      if (loginType === 'register') {
        router.push(ESRoutes.REGISTER_PROFILE)
      } else {
        router.push(redirectTo === '/' ? ESRoutes.HOME : redirectTo)
      }
    } else if (meta.error) {
      if (cookies.loginType === 'login') {
        router.push(ESRoutes.LOGIN)
      } else {
        router.push(ESRoutes.REGISTER)
      }
    }
  }, [meta])

  return <FullScreenLoader open />
}

export default LineCallbackPage
