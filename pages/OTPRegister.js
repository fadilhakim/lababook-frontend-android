import React, { useState } from 'react'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Keyboard,
  ActivityIndicator
} from 'react-native'

import { confirmRegister } from '../store/actions/user'

function OTPRegister (props) {
  const { user, confirmOtp, loading, navigation } = props
  const [isError, setError] = useState(false)
  const refs = new Array(4).fill(null)
  const otp = new Array(4).fill(0)

  const phoneNumber = user.phoneNumber
    .replace(
      /(\w{3})(\w{4})(\w{2,4})/,
      '+62-$1-$2-$3'
    )

  const handleChangeOtp = (text, index) => {
    otp[index] = text

    if (text) {
      if (index + 1 < refs.length) {
        setTimeout(
          () => refs[index + 1].focus(),
          100
        )
      } else {
        setTimeout(
          () => {
            Keyboard.dismiss()
            confirmOtp(
              user.phoneNumber,
              otp.join(''),
              () => {
                navigation.navigate('AuthLoading')
              }
            )
          },
          100
        )
      }
    } else {
      if (index - 1 >= 0) {
        refs[index - 1].focus()
      } else {
        refs[0].focus()
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={styles.phoneLabelTop}>
          Masukkan OTP 4 digit yang dikirimkan
        </Text>
        <Text style={styles.phoneLabelBottom}>
          ke <Text style={{ color: '#222' }}>{phoneNumber}</Text>
        </Text>
        {
          isError && (
            <Text style={styles.errorPhone}>
              Harap masukkan nama buku Anda
            </Text>
          )
        }
        <View style={styles.otpView}>
          {
            new Array(4).fill(0).map((val, index) => {
              return (
                <TextInput
                  key={index}
                  maxLength={1}
                  keyboardType='number-pad'
                  secureTextEntry
                  autoFocus={index === 0}
                  ref={ref => { refs[index] = ref }}
                  onChangeText={text => handleChangeOtp(text, index)}
                  style={styles.otpInput}
                />
              )
            })
          }
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>
            Nomor ponsel salah?
          </Text>
          <Text style={styles.infoLink}>
            Minta kode baru
          </Text>
        </View>
        {
          loading && <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <ActivityIndicator color='#444' size={16}/>
            <Text> Mengonfirmasi OTP</Text>
          </View>
        }
      </View>
    </View>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user,
    loading: state.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    confirmOtp: (phoneNumber, otp, cb) => dispatch(confirmRegister(phoneNumber, otp, cb))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPRegister)

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
  phoneLabelTop: {
    color: '#888',
    fontWeight: '500',
    fontSize: 18,
    marginTop: 170
  },
  phoneLabelBottom: {
    color: '#888',
    fontWeight: '500',
    fontSize: 18,
    paddingBottom: 20
  },
  otpView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  otpInput: {
    borderRadius: 2,
    backgroundColor: '#eee',
    margin: 10,
    padding: 10,
    height: 60,
    width: 60,
    textAlign: 'center',
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold'
  },
  errorPhone: {
    fontSize: 14,
    color: '#f25a5a',
    fontWeight: 'bold'
  },
  info: {
    alignItems: 'center',
    marginTop: 50
  },
  infoText: {
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#888',
    color: '#888',
    fontWeight: 'bold'
  },
  infoLink: {
    marginTop: 5,
    fontSize: 16,
    color: '#f25a5a',
    fontWeight: 'bold'
  }
})
