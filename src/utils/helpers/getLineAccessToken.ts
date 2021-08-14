import axios from 'axios'

export interface GetLineAccessTokenResponse {
  access_token?: string
  error?: string
}

export const getLineAccessToken = async (code: string | string[], redirectTo: string | string[]): Promise<GetLineAccessTokenResponse> => {
  const { data } = await axios.post<GetLineAccessTokenResponse>(
    `https://api.line.me/oauth2/v2.1/token`,
    `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.NEXT_PUBLIC_LINE_CALLBACK}?redirectTo=${redirectTo}&client_id=${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}&client_secret=${process.env.LINE_CLIENT_SECRET}`
  )
  return data
}

export default getLineAccessToken
