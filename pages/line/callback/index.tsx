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
  if (context.query.liffClientId) {
    const { loginType, redirectTo } = cookies(context)
    const type = loginType === '/login' ? 'login' : 'register'
    const res = await getLineAccessToken(context.query.code)
    return { props: { ...res, loginType: type, redirectTo: redirectTo || ESRoutes.HOME } }
  }
  return { props: {} }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const LineCallbackPage: React.FC<LineCallbackPage> = ({ access_token, redirectTo, loginType }) => {
  const social = useSocialLogin(loginType || 'login')
  const router = useRouter()
  useEffect(() => {
    if (access_token) {
      const params: LoginSocialParams = {
        social_channel: 'line',
        access_token: access_token,
        type: loginType,
      }
      social.login(params)
    }
  }, [access_token])
  useEffect(() => {
    if (social.meta.loaded) {
      router.push(redirectTo)
    }
  }, [social.meta])
  return <FullScreenLoader open />
}

export default LineCallbackPage
