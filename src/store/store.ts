import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import storage from './storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import reducer from './reducers'
import { authMiddleware } from './middlewares/authMiddleware'
import { webSocketMiddle } from './middlewares/socketMiddleware'

const store = (): any => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return configureStore({
      reducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    })
  } else {
    const persistConfig = {
      key: 'auth',
      whitelist: ['auth', 'ngWords'],
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(authMiddleware, webSocketMiddle),
    })

    return store
  }
}

export const storeWrapper = createWrapper(store)
export type StoreType = ReturnType<typeof store>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
export default store
