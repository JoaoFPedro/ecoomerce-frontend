
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducers'
import logger from 'redux-logger'



const store = createStore(rootReducer, undefined, applyMiddleware(logger))

export type RootState = ReturnType<typeof store.getState>

export default store
