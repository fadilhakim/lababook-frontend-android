import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback
} from 'react-native'
import {
  Ionicons,
  SimpleLineIcons,
  Foundation
} from '@expo/vector-icons'
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
  const { user } = props

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content'/>
      <View style={styles.topBar}>
        <Foundation
          name='book'
          size={32}
          color='#444'
          style={styles.bookLogo}
        />
        <Text style={styles.bookName}>
          {user.bookName}
        </Text>
        <TouchableNativeFeedback
          onPress={() => console.log('search')}
        >
          <Ionicons
            name='md-search'
            size={32}
            color='#444'
            style={styles.searchLogo}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => console.log('option')}
        >
          <SimpleLineIcons
            name='options-vertical'
            size={32}
            color='#444'
            style={styles.optionLogo}
          />
        </TouchableNativeFeedback>
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
    width: '100%',
    marginTop: Constanst.statusBarHeight
  },
  bookName: {
    color: '#444',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 28,
    fontWeight: 'bold'
  },
  bookLogo: {
    marginTop: 13,
    marginLeft: 13,
    marginRight: 13
  },
  searchLogo: {
    position: 'absolute',
    right: 55,
    top: 13
  },
  optionLogo: {
    position: 'absolute',
    right: 10,
    top: 13
  }
})
