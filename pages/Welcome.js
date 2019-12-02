import React from 'react'
import Constants from 'expo-constants'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar
} from 'react-native'

const toLogin = (navigation) => {
  navigation.navigate('Login')
}

export default function Welcome (props) {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>
          Lababook
        </Text>
        <Text style={styles.welcome}>
          Selamat datang
        </Text>
        <Text style={styles.welcome}>
          di Aplikasi ini.
        </Text>
        <TouchableNativeFeedback
          onPress={() => toLogin(navigation)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Masuk</Text>
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
    color: '#7f03fc',
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
    backgroundColor: '#7f03fc',
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
