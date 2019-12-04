import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Username from './pages/Username'
import Bookname from './pages/Bookname'
import OTPRegister from './pages/OTPRegister'
import OTPLogin from './pages/OTPLogin'
import Home from './pages/Home'
import AuthLoading from './pages/AuthLoading'

import { store, persistor } from './store'

useScreens()

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
      screen: Home
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

const Root = createAppContainer(
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
      <PersistGate loading={null} persistor={persistor}>
        <Root/>
      </PersistGate>
    </Provider>
  )
}
