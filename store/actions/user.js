import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_BOOK_NAME,
  USER_REGISTERED,
  USER_LOGIN,
  USER_CONFIRMED
} from '../actionTypes/user'
import { SHOW_LOADING, HIDE_LOADING } from '../actionTypes/loading'
import {
  register,
  checkOtp,
  login
} from '../../libs/request'
import { showErrorBottom } from '../../libs/errorHandler'
import syncActions from '../../libs/syncActions'
import { UPDATE_BOOK_ID } from '../actionTypes/contact'

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

export function updateBookId(newBookId) {
  return {
    type:UPDATE_BOOK_ID,
    bookId: newBookId
  }
}

export function registerUser (user) {
  return function (dispatch) {
    register(user)
      .then(data => {
        dispatch({
          type: USER_REGISTERED,
          user: data.user
        })
      })
      .catch(error => {
        console.log(error.response.data)
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}

export function loginUser (phoneNumber, cb) {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOADING
    })
    login(phoneNumber)
      .then(async data => {
        dispatch({
          type: USER_LOGIN,
          user: data.user
        })
        dispatch({
          type: HIDE_LOADING
        })
        cb()
      })
      .catch(error => {
        dispatch({
          type: HIDE_LOADING
        })
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}

export function confirmOTP (phoneNumber, otp, cb) {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOADING
    })
    checkOtp(phoneNumber, otp)
      .then(data => {
        syncActions([
          () => dispatch({
            type: USER_CONFIRMED,
            token: data.token,
            isNew: data.isNew
          }),
          () => dispatch({
            type: HIDE_LOADING
          }),
          () => cb()
        ])
      })
      .catch(error => {
        dispatch({
          type: HIDE_LOADING
        })
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}
