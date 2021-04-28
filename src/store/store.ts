import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import reducer from './reducers'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initStore = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return configureStore({ reducer })
  } else {
    // we need it only on client side

    const persistConfig = {
      key: 'auth',
      whitelist: ['auth'],
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = configureStore({ reducer: persistedReducer })

    return store
  }
}

export const storeWrapper = createWrapper(initStore)
export type StoreType = ReturnType<typeof initStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
