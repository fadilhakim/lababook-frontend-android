import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import { Ionicons, Foundation } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Constanst from 'expo-constants'

import Kontak from './Kontak'
import Aktifitas from './Aktifitas'
import Pengingat from './Pengingat'

const HomeTabs = createMaterialTopTabNavigator(
  {
    Kontak: { screen: Kontak },
    Aktifitas: { screen: Aktifitas },
    Pengingat: { screen: Pengingat }
  },
  {
    initialRouteName: 'Kontak',
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#444',
      pressColor: '#ddd',
      upperCaseLabel: false,
      style: {
        height: 40,
        marginBottom: 15,
        backgroundColor: 'white'
      },
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      labelStyle: {
        color: '#444',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
      },
      indicatorStyle: {
        borderBottomWidth: 7,
        borderBottomColor: '#444',
        backgroundColor: '#444',
        marginBottom: -7
      }
    }
  }
)

const Tabs = createAppContainer(
  HomeTabs
)

function Home (props) {
  const { user, navigation } = props

  const signOut = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => {
        navigation.navigate('AuthLoading')
      })
  }

  return (
    <View style={{ flex: 1 }}>

      <StatusBar barStyle='dark-content'/>

      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Foundation
            name='book'
            size={32}
            color='#444'
            style={styles.bookLogo}
          />
          <Text style={styles.bookName}>
            {user.bookName}
          </Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableNativeFeedback>
            <View style={styles.logo}>
              <Ionicons
                name='md-search'
                size={32}
                color='#444'
                style={styles.searchLogo}
              />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => signOut()}>
            <View style={styles.logo}>
              <Ionicons
                name='ios-log-out'
                size={32}
                color='#444'
                style={styles.optionLogo}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

      <Tabs user={user}/>

    </View>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Constanst.statusBarHeight
  },
  topBarRight: {
    flexDirection: 'row'
  },
  topBarLeft: {
    flexDirection: 'row'
  },
  bookName: {
    color: '#444',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 28,
    fontWeight: 'bold'
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookLogo: {
    marginTop: 13,
    marginLeft: 13,
    marginRight: 13
  },
  searchLogo: {
    color: '#444',
    marginLeft: 13,
    marginRight: 13
  },
  optionLogo: {
    marginLeft: 13,
    marginRight: 13
  }
})
