import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import storage from './storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import reducer from './reducers'
import { authMiddleware } from './middlewares/authMiddleware'
import { webSocketMiddle } from './middlewares/socketMiddleware'
import { webSyncMiddle } from './middlewares/webSyncMiddleware'
import { systemSyncMiddleware } from './middlewares/systemSyncMiddleware'
import { lobbyMiddlware } from './middlewares/lobbyMiddleware'
import { communityMiddleware } from './middlewares/communityMiddleware'
import liveSocketMiddleware from './middlewares/liveSocketMiddleware'

const initStore = () => {
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
      whitelist: ['auth', 'giftManage'],
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        authMiddleware,
        webSocketMiddle,
        webSyncMiddle,
        systemSyncMiddleware,
        lobbyMiddlware,
        communityMiddleware,
        liveSocketMiddleware
      ),
    })

    return store
  }
}

export const storeWrapper = createWrapper(initStore)
export type StoreType = ReturnType<typeof initStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
