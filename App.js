import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Font from 'expo-font'

import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Register from './screens/Register'
import OTP from './screens/OTP'
import Home from './screens/Home'
import AuthLoading from './screens/AuthLoading'
import Settings from "./screens/Settings"
// import AccountSetting from './screens/AccountSetting'

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
    OTP: {
      screen: OTP
    },
    Settings:{
      screen:Settings
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
      App: AppNavigator,
      Register: Register,
      //Settings:Settings
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
