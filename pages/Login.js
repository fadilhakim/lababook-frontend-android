import React, { useState } from 'react'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StatusBar
} from 'react-native'

import { login } from '../libs/request'
import { updatePhoneNumber } from '../store/actions/user'

function Login (props) {
  const { navigation, updatePhoneNumber, user } = props

  console.log(user)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [isError, setError] = useState(false)

  const handleRef = function (ref) {
    if (ref && isError) ref.focus()
  }

  const doLogin = async function () {
    try {
      await login(phoneNumber)
    } catch (error) {
      const { response: { data } } = error

      if (data.isJoi) {
        setError(true)
      } else {
        setError(false)
        updatePhoneNumber(phoneNumber)
        navigation.navigate('Username')
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>
          Lababook
        </Text>
        <Text style={styles.phoneLabel}>
          Nomor Handphone
        </Text>
        {
          isError && (
            <Text style={styles.errorPhone}>
              Harap masukkan nomor handphone
            </Text>
          )
        }
        <TextInput
          autoFocus
          keyboardAppearance='default'
          keyboardType='number-pad'
          onChangeText={text => setPhoneNumber(text)}
          style={!isError ? styles.phone : styles.phoneError}
          ref={handleRef}
        />
        <TouchableNativeFeedback
          onPress={() => doLogin()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Masuk</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.info}>
          <Text style={styles.infoText}>
            Tidak bisa masuk HP Anda tidak terdaftar
          </Text>
          <Text style={styles.infoLink}>
            Hubungi Kami
          </Text>
        </View>
      </View>
    </View>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePhoneNumber: (newPhoneNumber) => {
      dispatch(updatePhoneNumber(newPhoneNumber))
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
