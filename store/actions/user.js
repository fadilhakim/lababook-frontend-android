import { AsyncStorage } from 'react-native'

import {
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_NAME,
  UPDATE_BOOK_NAME,
  USER_REGISTERED,
  USER_ACTIVATED,
  USER_LOGIN,
  USER_CONFIRMED
} from '../actionTypes/user'
import { SHOW_LOADING, HIDE_LOADING } from '../actionTypes/loading'
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

export function confirmRegister (phoneNumber, otp, cb) {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOADING
    })
    otpRegister(phoneNumber, otp)
      .then(data => {
        AsyncStorage.setItem('userToken', data.token)
          .then(() => {
            dispatch({
              type: USER_ACTIVATED,
              token: data.token
            })
            dispatch({
              type: HIDE_LOADING
            })
            cb()
          })
      })
      .catch(error => {
        dispatch({
          type: HIDE_LOADING
        })
        console.log(error.response.data)
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}

export function loginUser (phoneNumber, cb, errCb) {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOADING
    })
    login(phoneNumber)
      .then(data => {
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
        errCb(error)
      })
  }
}

export function confirmLogin (phoneNumber, otp, cb) {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOADING
    })
    otpLogin(phoneNumber, otp)
      .then(data => {
        AsyncStorage.setItem('userToken', data.token)
          .then(() => {
            dispatch({
              type: USER_CONFIRMED,
              token: data.token
            })
            dispatch({
              type: HIDE_LOADING
            })
            cb()
          })
      })
      .catch(error => {
        dispatch({
          type: HIDE_LOADING
        })
        console.log(error.response.data)
        showErrorBottom(error.response.data.message || 'server error')
      })
  }
}
