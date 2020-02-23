import React, { useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import { CheckTokenIsValid } from '../api/auth'
import { API_URL } from 'react-native-dotenv'
import { loginUser, updatePhoneNumber } from '../store/actions/user'

function AuthLoading (props) {
  const {
    navigation,
    user: { token, isNew, isLoggedIn }
  } = props

  useEffect(() => {
    // if (token) {
    //   if (isNew) {
    //     navigation.navigate('Register')
    //   } else {
    //     navigation.navigate('App')
    //   }
    // } else {
    //   navigation.navigate('Auth')
    // }
    // navigation.navigate('Home')
    // console.log("token: ", token)
    // console.log("isNew: ", isNew)
    // console.log("isLoggedIn: ", isLoggedIn)
    // console.log(navigation)
    if (isLoggedIn) {
      // navigation.navigate('App')
      // should be belom
      CheckTokenIsValid({ token })
        .then(result => {
          if (result.status === 200 && result.data.result && result.data.result === 'valid'){
            navigation.navigate('App')
          } else {
            navigation.navigate('Auth')
          }
        })
        .catch(err => {
          alert(`Terjadi kesalahan saat menghubungi server!`)
          navigation.navigate('Auth')
        })
    } else {
      navigation.navigate('Auth')
    }
  })

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Constants.statusBarHeight
    }}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePhoneNumber: (newPhoneNumber) => {
      dispatch(updatePhoneNumber(newPhoneNumber))
    },
    login: (phoneNumber, cb) => {
      dispatch(loginUser(phoneNumber, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)
