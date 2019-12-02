import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_BOOK_NAME
} from '../actionTypes/user'

export function updatePhoneNumber (newPhoneNumber) {
  return {
    type: UPDATE_PHONE_NUMBER,
    phoneNumber: newPhoneNumber
  }
}

export function updateUserName (newUserName) {
  return {
    type: UPDATE_USER_NAME,
    userName: newUserName
  }
}

export function updateBookName (newBookName) {
  return {
    type: UPDATE_BOOK_NAME,
    bookName: newBookName
  }
}
