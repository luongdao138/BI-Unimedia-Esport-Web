import FullScreenLoader from '@components/FullScreenLoader'
import { ESRoutes } from '@constants/route.constants'
import { LoginSocialParams } from '@services/auth.service'
import getLineAccessToken, { GetLineAccessTokenResponse } from '@utils/helpers/getLineAccessToken'
import useSocialLogin from '@utils/hooks/useSocialLogin'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'

interface LineCallbackPage extends GetLineAccessTokenResponse {
  loginType?: 'login' | 'register'
  redirectTo?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<LineCallbackPage | {}, ParsedUrlQuery> = async (context) => {
  if (context.query.code) {
    const { code, redirectTo } = context.query
    const [redirect, type] = redirectTo.toString().split('type')
    const res = await getLineAccessToken(code, redirectTo)
    return { props: { ...res, loginType: type, redirectTo: redirect } }
  }
  return {
    props: {},
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const LineCallbackPage: React.FC<LineCallbackPage> = ({ access_token, redirectTo, loginType }) => {
  const { login, meta, resetMeta } = useSocialLogin('')
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
      if (loginType === 'login') {
        router.push(ESRoutes.LOGIN)
      } else {
        router.push(ESRoutes.REGISTER)
      }
    }
  }, [meta])

  return <FullScreenLoader open />
}

export default LineCallbackPage
