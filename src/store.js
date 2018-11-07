import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'

const middlewares = [ReduxThunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
)
export const persistor = persistStore(store)
