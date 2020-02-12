import { SHOW_LOADING, HIDE_LOADING } from '../actionTypes/loading'

const initialState = false

export default function loading (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return true
    case HIDE_LOADING:
      return false
    default:
      return state
  }
}
