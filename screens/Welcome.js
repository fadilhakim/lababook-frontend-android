import React from 'react'
import Constants from 'expo-constants'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar
} from 'react-native'

import { textExtraProps as tProps } from '../config/system'

const toLogin = (navigation) => {
  navigation.navigate('Login')
}

export default function Welcome (props) {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text {...tProps} style={styles.title}>
          Lababook
        </Text>
        <Text {...tProps} style={styles.welcome}>
          Selamat datang
        </Text>
        <Text {...tProps} style={styles.welcome}>
          di Aplikasi ini.
        </Text>
        <TouchableNativeFeedback
          onPress={() => toLogin(navigation)}
        >
          <View style={styles.button}>
            <Text {...tProps} style={styles.buttonText}>Masuk</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Constants.statusBarHeight
  },
  statusBar: {
    backgroundColor: 'white'
  },
  title: {
    color: '#2a2c7b',
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 20,
    paddingTop: 200
  },
  welcome: {
    color: '#444',
    fontWeight: '500',
    fontSize: 34,
    letterSpacing: 1
  },
  button: {
    backgroundColor: '#2a2c7b',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 150
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
