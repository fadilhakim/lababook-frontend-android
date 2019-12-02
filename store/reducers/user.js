import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_BOOK_NAME
} from '../actionTypes/user'

const initialStates = {
  phoneNumber: '',
  userName: '',
  bookName: ''
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
    default:
      return state
  }
}
