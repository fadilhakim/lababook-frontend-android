import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Font from 'expo-font'

import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Username from './screens/Username'
import Bookname from './screens/Bookname'
import OTPRegister from './screens/OTPRegister'
import OTPLogin from './screens/OTPLogin'
import Home from './screens/Home'
import AuthLoading from './screens/AuthLoading'
import Settings from './screens/Settings'

import { store, persistor } from './store'

Font.loadAsync({
  NexaBold: require('./assets/fonts/NexaBold.otf'),
  NexaLight: require('./assets/fonts/NexaLight.otf'),
  RobotoMonoLight: require('./assets/fonts/RobotoMono-Light.ttf')
})

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
      screen: Home,
      navigationOptions: {
        headerShown: false
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerBackTitleVisible: true,
        headerTitle: 'Settings',
        headerTitleStyle: {
          color: '#444',
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 28,
          fontWeight: 'bold',
          marginLeft: -5
        }
      }
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen'
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
