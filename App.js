import React, { useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  Text,
  Button
} from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Username from './pages/Username'
import Bookname from './pages/Bookname'
import OTPRegister from './pages/OTPRegister'
import OTPLogin from './pages/OTPLogin'

import store from './store'

useScreens()

function AuthLoading (props) {
  const { navigation } = props

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(userToken => {
        console.log(userToken)
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

function AppScreen (props) {
  const { navigation } = props

  const _signOut = async () => {
    await AsyncStorage.removeItem('userToken')
    navigation.navigate('AuthLoading')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CIAAAA LOGIN CIAAAAAAAAA</Text>
      <Button
        title='LOG OUT'
        onPress={() => _signOut()}
      />
    </View>
  )
}

const AuthNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    Login: {
      screen: Login
    },
    Username: {
      screen: Username
    },
    Bookname: {
      screen: Bookname
    },
    OTPRegister: {
      screen: OTPRegister
    },
    OTPLogin: {
      screen: OTPLogin
    }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none'
  }
)

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: AppScreen
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

const Router = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      Auth: AuthNavigator,
      App: AppNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)

export default function App () {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  )
}
