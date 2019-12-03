import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_BOOK_NAME,
  USER_REGISTERED,
  USER_ACTIVATED,
  USER_LOGIN,
  USER_CONFIRMED
} from '../actionTypes/user'
import {
  register,
  otpRegister,
  otpLogin,
  login
} from '../../libs/request'
import { showErrorBottom } from '../../libs/errorHandler'

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

export function confirmRegister (phoneNumber, otp) {
  return function (dispatch) {
    otpRegister(phoneNumber, otp)
      .then(data => {
        dispatch({
          type: USER_ACTIVATED,
          token: data.token
        })
      })
      .catch(error => {
        console.log(error.response.data)
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}

export function loginUser (phoneNumber, cb, errCb) {
  return function (dispatch) {
    login(phoneNumber)
      .then(data => {
        dispatch({
          type: USER_LOGIN,
          user: data.user
        })
        cb()
      })
      .catch(error => {
        errCb(error)
      })
  }
}

export function confirmLogin (phoneNumber, otp) {
  return function (dispatch) {
    otpLogin(phoneNumber, otp)
      .then(data => {
        dispatch({
          type: USER_CONFIRMED,
          token: data.token
        })
      })
      .catch(error => {
        console.log(error.response.data)
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}
