import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_BOOK_NAME,
  USER_REGISTERED,
  USER_ACTIVATED,
  USER_LOGIN,
  USER_CONFIRMED
} from '../actionTypes/user'

const initialStates = {
  phoneNumber: '',
  userName: '',
  bookName: '',
  token: ''
}

export default function user (state = initialStates, action) {
  switch (action.type) {
    case UPDATE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }
    case UPDATE_USER_NAME:
      return {
        ...state,
        userName: action.userName
      }
    case UPDATE_BOOK_NAME:
      return {
        ...state,
        bookName: action.bookName
      }
    case USER_LOGIN:
    case USER_REGISTERED: {
      const { user } = action
      return {
        ...state,
        userName: user.name,
        bookName: user.bookName,
        phoneNumber: user.phoneNumber
      }
    }
    case USER_ACTIVATED:
    case USER_CONFIRMED:
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}
