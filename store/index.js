import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import user from './reducers/user'
import loading from './reducers/loading'

const reducers = combineReducers({
  user,
  loading
})

const newCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducers,
  newCompose(applyMiddleware(thunk))
)
