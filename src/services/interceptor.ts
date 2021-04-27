import api from './api'
import { StoreType } from '../store/store'

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
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
