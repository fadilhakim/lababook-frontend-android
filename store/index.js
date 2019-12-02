import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware
} from 'redux'

import user from './reducers/user'

const reducers = combineReducers({
  user
})

const newCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducers,
  newCompose(applyMiddleware(...[]))
)
