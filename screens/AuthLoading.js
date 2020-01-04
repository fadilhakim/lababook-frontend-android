import React, { useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

function AuthLoading (props) {
  const {
    navigation,
    user: { token, isNew }
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
    navigation.navigate('Home')
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

export default connect(mapStateToProps)(AuthLoading)
