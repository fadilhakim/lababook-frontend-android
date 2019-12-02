import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Username from './pages/Username'
import Bookname from './pages/Bookname'
import OTPRegister from './pages/OTPRegister'

import store from './store'

useScreens()

const AppNavigator = createStackNavigator(
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
    }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none'
  }
)

const AppStack = createAppContainer(AppNavigator)

export default function App () {
  return (
    <Provider store={store}>
      <AppStack/>
    </Provider>
  )
}
