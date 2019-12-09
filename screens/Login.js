import React, { useState } from 'react'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import * as Network from 'expo-network'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StatusBar,
  ToastAndroid,
  Keyboard,
  ActivityIndicator
} from 'react-native'

import { textExtraProps as tProps } from '../config/system'
import { updatePhoneNumber, loginUser } from '../store/actions/user'

function Login (props) {
  const { navigation, updatePhoneNumber, login, loading } = props
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [isError, setError] = useState(false)

  const handleRef = (ref) => {
    if (ref && isError) ref.focus()
  }

  const handleChangeText = (text) => {
    setPhoneNumber(text)
    setError(false)
  }

  const doLogin = () => {
    Keyboard.dismiss()

    Network.getNetworkStateAsync()
      .then(stat => {
        if (stat.isInternetReachable) {
          login(phoneNumber, () => {
            navigation.navigate('OTP')
          })
        } else {
          ToastAndroid.showWithGravity(
            'Anda tidak terhubung ke Internet',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
        }
      })
      .catch(error => {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        )
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text {...tProps} style={styles.title}>
          Lababook
        </Text>
        <Text {...tProps} style={styles.phoneLabel}>
          Nomor Handphone
        </Text>
        {
          isError && (
            <Text {...tProps} style={styles.errorPhone}>
              {errMsg}
            </Text>
          )
        }
        <TextInput
          autoFocus={true}
          keyboardAppearance='default'
          keyboardType='number-pad'
          onChangeText={text => handleChangeText(text)}
          style={!isError ? styles.phone : styles.phoneError}
          ref={handleRef}
        />
        {
          loading && <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <ActivityIndicator color='#444' size={16}/>
            <Text {...tProps}> Mengecek nomor handphone</Text>
          </View>
        }
        <TouchableNativeFeedback
          onPress={() => doLogin()}
        >
          <View style={styles.button}>
            <Text {...tProps} style={styles.buttonText}>Verifikasi</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.info}>
          <Text {...tProps} style={styles.infoText}>
            Tidak bisa masuk HP Anda tidak terdaftar
          </Text>
          <Text {...tProps} style={styles.infoLink}>
            Hubungi Kami
          </Text>
        </View>
      </View>
    </View>
  )
}

function mapStateToProps (state) {
  return {
    loading: state.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePhoneNumber: (newPhoneNumber) => {
      dispatch(updatePhoneNumber(newPhoneNumber))
    },
    login: (phoneNumber, cb) => {
      dispatch(loginUser(phoneNumber, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
  phoneLabel: {
    color: '#444',
    fontWeight: '500',
    fontSize: 14
  },
  phone: {
    width: '100%',
    borderBottomColor: '#7f03fc',
    borderBottomWidth: 2,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 18
  },
  phoneError: {
    width: '100%',
    borderBottomColor: '#f25a5a',
    borderBottomWidth: 2,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 18
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
  },
  info: {
    alignItems: 'center',
    paddingTop: 20
  },
  infoText: {
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#444',
    // textDecorationLine: 'underline',
    color: '#444',
    fontWeight: 'bold'
  },
  infoLink: {
    marginTop: 5,
    fontSize: 16,
    color: '#f25a5a',
    fontWeight: 'bold'
  },
  errorPhone: {
    fontSize: 14,
    color: '#f25a5a',
    fontWeight: 'bold'
  }
})
