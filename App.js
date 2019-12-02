import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Username from './pages/Username'

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
    }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)
