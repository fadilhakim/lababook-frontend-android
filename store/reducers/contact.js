import {
    UPDATE_PHONE_NUMBER,
    UPDATE_NAME,
    UPDATE_BOOK_ID,
    UPDATE_USER_ID,
    CONTACT_CREATE,
    CONTACT_DELETE,
    CONTACT_FETCH
  } from '../actionTypes/contact'
  
  const initialStates = {
    phoneNumber: '',
    name: '',
    userId:"",
    bookId: '',
    token: '',
    isNew: true
  }
  
  export default function contact (state = initialStates, action) {
    switch (action.type) {
      case UPDATE_PHONE_NUMBER:
        return {
          ...state,
          phoneNumber: action.phoneNumber
        }
      case UPDATE_NAME:
        return {
          ...state,
          name: action.name
        }
      case UPDATE_BOOK_ID:
        return {
          ...state,
          bookId: action.bookId
        }
      case UPDATE_USER_ID : 
        return {
          ...state,
          userId:action.userId
        }
      case CONTACT_CREATE: {
        const { user } = action
        return {
          ...state,
          name: user.name,
          bookId: user.bookId,
          phoneNumber: user.phoneNumber,
          user
        }
      }

      case CONTACT_FETCH : {

      }

      case CONTACT_DELETE : {

      }
   
      default:
        return state
    }
  }
  