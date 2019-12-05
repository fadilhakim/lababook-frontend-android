import React, { useEffect } from 'react'
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import Constants from 'expo-constants'

function AuthLoading (props) {
  const { navigation } = props

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(userToken => {
        navigation.navigate(userToken ? 'App' : 'Auth')
      })
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

export default AuthLoading
