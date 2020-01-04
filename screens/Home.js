import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
  Image
} from 'react-native'
import { Ionicons, Foundation, SimpleLineIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Constanst from 'expo-constants'

import { textExtraProps as tProps } from '../config/system'

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
      activeTintColor: '#fff',
      pressColor: '#ddd',
      upperCaseLabel: false,
      style: {
        height: 50,
        marginBottom: 10,
        backgroundColor: '#2a2c7b'
      },
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      labelStyle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily: 'sans-serif'
      },
      indicatorStyle: {
        borderBottomWidth: 5,
        borderBottomColor: '#fff',
        backgroundColor: '#fff',
        marginBottom: -1,
        borderTopLeftRadius:3,
        borderTopRightRadius:3
      }
    }
  }
)

const Tabs = createAppContainer(
  HomeTabs
)

function Home (props) {
  const { user, navigation } = props

  const toSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <View style={{ flex: 1 }}>

      <StatusBar barStyle='dark-content'/>

      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>

         <Image style={styles.logoIcon} source={require('../assets/icon.png')}/>

          <Text {...tProps} style={styles.bookName}>
            {/*user.bookName*/}
            Warung Mira
          </Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableNativeFeedback>
            <View style={styles.logo}>
              <Ionicons
                name='md-search'
                size={25}
                color='#444'
                style={styles.searchLogo}
              />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => toSettings()}>
            <View style={styles.logo}>
              <SimpleLineIcons
                name='options-vertical'
                size={25}
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

  logoIcon: {
    height:40,
    width:40,
    marginLeft:10,
    marginTop:10,
    marginRight:12
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Constanst.statusBarHeight,
    backgroundColor: '#2a2c7b'
  },
  topBarRight: {
    flexDirection: 'row'
  },
  topBarLeft: {
    flexDirection: 'row'
  },
  bookName: {
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    fontWeight: 'bold'
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookLogo: {
    marginTop: 13,
    marginLeft: 13,
    marginRight: 13,
    color:'#fff'
  },
  searchLogo: {
    color: '#fff',
    marginLeft: 13,
    marginRight: 13
  },
  optionLogo: {
    marginLeft: 13,
    marginRight: 13,
    color: '#fff'
  }
})
