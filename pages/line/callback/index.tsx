import FullScreenLoader from '@components/FullScreenLoader'
import { ESRoutes } from '@constants/route.constants'
import { LoginSocialParams } from '@services/auth.service'
import getLineAccessToken, { GetLineAccessTokenResponse } from '@utils/helpers/getLineAccessToken'
import useSocialLogin from '@utils/hooks/useSocialLogin'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'
import { genRanHex } from '@utils/helpers/CommonHelper'

interface LineCallbackPage extends GetLineAccessTokenResponse {
  loginType?: 'login' | 'register'
  redirectTo?: string
  errorServer: any
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<LineCallbackPage | {}, ParsedUrlQuery> = async (context) => {
  if (context.query.code) {
    try {
      const { code, redirectTo } = context.query
      const [redirect, type] = redirectTo.toString().split('type')
      const res = await getLineAccessToken(code, redirectTo)
      return { props: { ...res, loginType: type, redirectTo: redirect } }
    } catch (error) {
      return { props: { errorServer: JSON.parse(JSON.stringify(error)) } }
    }
  }
  return {
    props: {},
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const LineCallbackPage: React.FC<LineCallbackPage> = ({ access_token, redirectTo, loginType, errorServer }) => {
  const { login, meta, resetMeta } = useSocialLogin('')
  const router = useRouter()
  // console.log('access_token', access_token)
  // console.log('redirectTo', redirectTo)
  // console.log('loginType', loginType)
  // console.log('errorServer', errorServer)
  useEffect(() => {
    if (typeof errorServer !== 'undefined') {
      if (errorServer.name === 'Error') {
        handleError()
      }
    }
  }, [errorServer])

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

  const handleError = () => {
    // console.log('handle error -----------------')
    const isTypeRegister = errorServer.config.data.toString().split('type')[2].includes('register')
    // if (isTypeRegister) {
    //   router.push(ESRoutes.REGISTER)
    // } else {
    //   router.push(ESRoutes.LOGIN)
    // }
    router.push(
      `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
        process.env.NEXT_PUBLIC_LINE_CLIENT_ID
      }&scope=profile%20openid%20email&state=${genRanHex(6)}&redirect_uri=${
        process.env.NEXT_PUBLIC_LINE_CALLBACK
      }?redirectTo=${redirectTo}type${isTypeRegister ? 'register' : 'login'}`
    )
  }
  return <FullScreenLoader open />
}

export default LineCallbackPage
