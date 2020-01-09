import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

function Settings (props) {
  const { navigation } = props

  const signOut = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => navigation.navigate('AuthLoading'))
  }

  const toAccountSetting = () => {
    navigation.navigate('AccountSetting')
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingTop}>
        <TouchableNativeFeedback>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FontAwesome
                name='user-o'
                size={20}
                color='#444'
              />

              <TouchableNativeFeedback onPress={() => toAccountSetting()}>
                <Text style={styles.settingItemLeftText}>
                  Pengaturan Akuns
                </Text>
               </TouchableNativeFeedback>

            </View>
            <View style={styles.settingItemRight}>
              <FontAwesome
                name='angle-right'
                size={20}
              />
            </View>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FontAwesome
                name='list-alt'
                size={20}
                color='#444'
              />
              <Text style={styles.settingItemLeftText}>
                Cara Pakai
              </Text>
            </View>
            <View style={styles.settingItemRight}>
              <FontAwesome
                name='angle-right'
                size={20}
              />
            </View>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FontAwesome
                name='whatsapp'
                size={20}
                color='#444'
              />
              <Text style={styles.settingItemLeftText}>
                Hubungi Kami
              </Text>
            </View>
            <View style={styles.settingItemRight}>
              <FontAwesome
                name='angle-right'
                size={20}
              />
            </View>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <FontAwesome
                name='share-square-o'
                size={20}
                color='#444'
              />
              <Text style={styles.settingItemLeftText}>
                Bagikan Aplikasi
              </Text>
            </View>
            <View style={styles.settingItemRight}>
              <FontAwesome
                name='angle-right'
                size={20}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={styles.settingBottom}>
        <TouchableNativeFeedback onPress={() => signOut()}>
          <View style={styles.logOutBtn}>
            <FontAwesome
              name='power-off'
              color='#444'
              size={16}
            />
            <Text style={styles.logOutText}>
              Log Out
            </Text>
          </View>
        </TouchableNativeFeedback>

        <View style={styles.creditBlock}>

        </View>
      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  settingTop: {
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  settingItemLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  settingItemLeftText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#444'
  },
  settingItemRight: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingBottom: {
    justifyContent: 'center'
  },
  logOutBtn: {
    borderTopColor: '#aaa',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  logOutText: {
    fontSize: 20,
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 10
  },
  creditBlock: {
    minHeight: 200,
    backgroundColor: '#bbb'
  }
})
