import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import user from './reducers/user'
import loading from './reducers/loading'

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage
}

const reducers = combineReducers({
  user: persistReducer(userPersistConfig, user),
  loading
})

const newCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducers,
  newCompose(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
