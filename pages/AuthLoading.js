import React, { useEffect } from 'react'
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native'

function AuthLoading (props) {
  const { navigation } = props

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(userToken => {
        navigation.navigate(userToken ? 'App' : 'Auth')
      })
  })

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

export default AuthLoading
