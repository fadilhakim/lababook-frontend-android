import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_USER_LOGIN,
  UPDATE_USER_REGISTER,
  DELETE_USER_DETAIL,
  UPDATE_BOOK_NAME,
  UPDATE_BOOK_ID,
  UPDATE_USER_OLD,
  UPDATE_USER_NEW,
  USER_REGISTERED,
  USER_ACTIVATED,
  USER_LOGIN,
  USER_CONFIRMED, UPDATE_BOOK_TYPE
} from '../actionTypes/user'

const initialStates = {
  phoneNumber: '',
  userName: '',
  bookName: '',
  bookType: '',
  bookId: '',
  id: '',
  token: '',
  isNew: true,
  isLoggedIn: false,
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
    case UPDATE_BOOK_TYPE:
      return {
        ...state,
        bookType: action.bookType
      }

    case UPDATE_BOOK_ID:
      return {
        ...state,
        bookId:action.bookId
      }

    case UPDATE_USER_LOGIN:
      console.log("action UPDATE_USER_LOGIN: ", action)
      return {
        ...state,
        userName: action.payload.userName,
        bookName: action.payload.bookName,
        bookType: action.payload.bookType,
        phoneNumber: action.payload.phoneNumber,
        bookId: action.payload.bookId,
        id: action.payload.id,
        token: action.payload.token,
        isLoggedIn: action.payload.isLoggedIn,
        isNew: action.payload.isNew,
      }

    case UPDATE_USER_REGISTER:
      return {
        ...state,
        userName: action.payload.name,
        bookName: action.payload.bookName,
        bookType: action.payload.bookType,
        phoneNumber: action.payload.phoneNumber,
        bookId: action.payload.bookId,
        id: action.payload.id,
      }

    case DELETE_USER_DETAIL:
      return {
        ...initialStates,
        isNew: state.isNew
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
      return {

      }
    case USER_CONFIRMED:
      return {
        ...state,
        token: action.token,
        isNew: action.isNew
      }
    case UPDATE_USER_OLD:
      return {
        ...state,
        isNew: false
      }
    case UPDATE_USER_NEW:
      return {
        ...state,
        isNew: true
      }
    default:
      return state
  }
}
