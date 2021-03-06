import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Font from 'expo-font'
import Carousel from 'react-native-snap-carousel'

import Intro from './screens/Intro'
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import RegisterOld from './screens/Register/RegisterOld'
import OTP from './screens/OTP'
import Home from './screens/Home'
import AuthLoading from './screens/AuthLoading'
import Settings from "./screens/Settings"
import AccountSetting from './screens/AccountSetting'
import CaraPakai from './screens/CaraPakai'
import DetailTransaction from './screens/DetailTransaction'
import AddTransactions from './screens/AddTransactions'
import SelectContact from "./components/SelectContact"
import { RegisterType } from './screens/Register'

import Test from "./screens/Test"

import { store, persistor } from './store'

import NavigationService from './helpers/NavigationService';

useScreens()

const AuthNavigator = createStackNavigator(
  {
    Welcome: Welcome,
    Intro: Intro,
    Register01: RegisterType,
    Register02: RegisterOld,
    Login: Login,
    OTP: OTP,
    AccountSetting: AccountSetting,
    DetailTransaction: DetailTransaction,
    CaraPakai: CaraPakai,
    Test: Test,
    SelectContact: SelectContact,
  },
  {
    initialRouteName: 'Intro',
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
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2a2c7b'
        },
        headerTitleStyle: {
          color: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 22,
          fontWeight: 'bold',
          marginLeft: -5
        }
      }
    },
    Test: {
      screen: Test,
      navigationOptions: {
        headerBackTitleVisible: true,
        headerTitle: 'Test',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2a2c7b'
        },
        headerTitleStyle: {
          color: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 22,
          fontWeight: 'bold',
          marginLeft: -5
        }
      }
    },
    AccountSetting: {
      screen: AccountSetting,
      navigationOptions: {
        headerBackTitleVisible: true,
        headerTitle: 'Pengaturan Akun',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2a2c7b'
        },
        headerTitleStyle: {
          color: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 22,
          fontWeight: 'bold',
          marginLeft: -5
        }
      }
    },
    // DetailTransaction: {
    //   screen: DetailTransaction,
    //   navigationOptions: {
    //     headerBackTitleVisible: true,
    //     headerTitle: 'Aan Wiguna',
    //     headerTintColor: 'white',
    //     headerStyle : {
    //       backgroundColor:'#2a2c7b'
    //     },
    //     headerTitleStyle: {
    //       color: '#fff',
    //       paddingTop: 10,
    //       paddingBottom: 10,
    //       fontSize: 22,
    //       fontWeight: 'bold',
    //       marginLeft: -5
    //     }
    //   }
    // },
    CaraPakai: {
      screen: CaraPakai,
      navigationOptions: {
        headerBackTitleVisible: true,
        headerTitle: 'Cara Pakai',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2a2c7b'
        },
        headerTitleStyle: {
          color: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 22,
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
      // RegisterOld: RegisterOld,
      AccountSetting: AccountSetting,
      CaraPakai: CaraPakai,
      DetailTransaction: DetailTransaction,
      AddTransactions: AddTransactions,
      SelectContact:SelectContact,
      Test: Test
    },
    {
      initialRouteName: 'App'
    }
  )
)

export default function App() {

  this.componentDidMount = function () {
    Font.loadAsync({
      NexaBold: require('./assets/fonts/NexaBold.otf'),
      NexaLight: require('./assets/fonts/NexaLight.otf'),
      "RobotoMono-Light": require('./assets/fonts/RobotoMono-Light.ttf')
    })
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </PersistGate>
    </Provider>
  )
}
