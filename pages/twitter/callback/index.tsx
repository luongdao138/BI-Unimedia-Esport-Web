import FullScreenLoader from '@components/FullScreenLoader'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import axios from 'axios'
import { LoginSocialParams } from '@services/auth.service'
import { useEffect } from 'react'
import useSocialLogin from '@utils/hooks/useSocialLogin'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<LoginSocialParams | {}, ParsedUrlQuery> = async () => {
  return { props: {} }
}

const TwitterCallbackPage: React.FC<LoginSocialParams> = () => {
  const social = useSocialLogin('')
  const router = useRouter()
  useEffect(() => {
    const getAccessToken = async (): Promise<LoginSocialParams> => {
      const { data } = await axios.post<LoginSocialParams>('/api/twitter/token', { data: location.search })
      return data
    }
    getAccessToken()
      .then((data) => {
        const type = social.cookies.loginType === '/login' ? 'login' : 'register'
        social.login({ ...data, social_channel: 'twitter', type })
      })
      .catch((_e) => {
        handleError()
      })
  }, [location.search])

  useEffect(() => {
    if (social.meta.loaded) {
      router.push(social.cookies.redirectTo || ESRoutes.HOME)
      social.resetMeta()
    } else if (social.meta.error) {
      handleError()
    }
  }, [social.meta])

  const handleError = () => {
    if (social.cookies.loginType === 'login') {
      router.push(ESRoutes.LOGIN)
    } else {
      router.push(ESRoutes.REGISTER)
    }
  }
  return <FullScreenLoader open />
}

export default TwitterCallbackPage
