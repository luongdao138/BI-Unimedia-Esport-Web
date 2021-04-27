import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import reducer from './reducers'

const initStore = () => {
  return configureStore({ reducer })
}

export const storeWrapper = createWrapper(initStore)

export type StoreType = ReturnType<typeof initStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
