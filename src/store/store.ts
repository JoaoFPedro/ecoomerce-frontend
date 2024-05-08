import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducers'
import logger from 'redux-logger'

// @ts-ignore
import storage from 'redux-persist/lib/storage'
// @ts-ignore
import persistReducer from 'redux-persist/es/persistReducer'
// @ts-ignore
import persistStore from 'redux-persist/es/persistStore'
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer']
}

const persistedRootReducer: typeof rootReducer = persistReducer(
  persistConfig,
  rootReducer
)

export const store = createStore(
  persistedRootReducer,
  undefined,
  applyMiddleware(thunk, logger)
)

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
