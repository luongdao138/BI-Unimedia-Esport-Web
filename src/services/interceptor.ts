/* eslint-disable @typescript-eslint/ban-types */
import api from './api'
import { StoreType } from '../store/store'
import { URI } from '@constants/uri.constants'
import { loginByEmail, logout } from '@store/auth/actions'

let subscribers: Function[] = []

function onAccessTokenFetched(access_token: string) {
  subscribers = subscribers.filter((callback: Function) => callback(access_token))
}

function addSubscriber(callback: Function) {
  subscribers.push(callback)
}

export const authorizationProvider = (store: StoreType): void => {
  api.interceptors.request.use(
    (config) => {
      const { auth } = store.getState()
      const user = auth.user
      if (user) {
        const token = `Bearer ${user.accessToken}`
        if (token) {
          config.headers.Authorization = `${token}`
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  let isRefreshing = false
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const status = error.response ? error.response.status : null
      if (status === 401) {
        const response = error.response.data.error

        if (response.code === 4010 && response.message === 'Token expired') {
          if (!isRefreshing) {
            isRefreshing = true
            const { auth } = store.getState()
            const user = auth.user
            const refreshToken = user.refreshToken
            api
              .post(URI.REFRESH, {
                refresh_token: refreshToken,
              })
              .then((res) => {
                store.dispatch({ type: loginByEmail.fulfilled.toString(), payload: res.data })
                onAccessTokenFetched(res.data.accessToken)
              })
              .finally(() => {
                isRefreshing = false
              })
          }
          const retryRequest = new Promise((resolve) => {
            const originalRequest = error.config
            addSubscriber((access_token: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + access_token
              resolve(api.request(originalRequest))
            })
          })

          return retryRequest
        } else if (response.code === 401 && response.message === 'Invalid token') {
          // Refresh token expired or token Invalid
          store.dispatch({ type: logout.fulfilled.toString() })
        }
        return Promise.reject(response)
      } else if (error.response && error.response.status === 404 && error.response.data.error === 'disabled') {
        // store.dispatch(errorActionCreators.setDisabled())
      } else if (error.response && error.response.status === 500) {
        // store.dispatch(errorActions.setError(error))
      }
      return Promise.reject(error)
    }
  )
}
