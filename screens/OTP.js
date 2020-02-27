import React, { Component, useState } from 'react'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Keyboard,
  ActivityIndicator,
  Animated,
  SafeAreaView,
  Image, TouchableNativeFeedback, Alert,
} from 'react-native'
import { API_URL } from 'react-native-dotenv'

import { textExtraProps as tProps } from '../config/system'
import { confirmOTP, loginSuccess } from '../store/actions/user'
import { LoginUser, GetOTP } from '../api/auth'
import { OTP_LOGO, } from '../utils/images'
import LoadingModal from '../helpers/LoadingModal'

// function OTP (props) {
refs = new Array(4).fill(null)
class OTP extends Component {
  // constructor (props) {
  //   super()
    state = {
      user: this.props.user,
      confirmOtp: this.props.confirmOtp,
      loading: false,
      navigation: this.props.navigation,
      loginSuccess: this.props.loginSuccess,
      imageHeight: new Animated.Value(180),
      loadingMessage: 'Verifikasi data...'
      // refs: new Array(4).fill(0)
    }
    // const phoneNumber = user.phoneNumber
    //   .replace(
    //     /(\w{3})(\w{4})(\w{2,4})/,
    //     '+62-$1-$2-$3'
    //   )
  // }
  // refs = new Array(4).fill(null)
  otp = new Array(4).fill(0)
  phoneNumber = this.state.user.phoneNumber

  IMAGE_HEIGHT = 180
  IMAGE_HEIGHT_SMALL = 50

  handleChangeOtp = (text, index) => {
    this.otp[index] = text

    if (text) {
      if (index + 1 < refs.length) {
        setTimeout(
          () => refs[index + 1].focus(),
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

  nextStep = () => {
    this.setState({
      loading: true,
      loadingMessage: 'Verifikasi data...'
    })
    const errorMessage = 'Terjadi kesalahan saat verifikasi data!'
    const params = {
      phoneNumber: this.phoneNumber,
      otp: this.otp.join('')
    }
    LoginUser(params)
      .then(result => {
        console.log("result: ", result)
          /*
          * "data": Object {
              "result": Object {
                "message": "OK",
                "token": "WUB2eHaJlzSKpdOQdP3RHj14FT1ggX6dqW4wBxs1o0EIdFr7LD8mub6cAFy8VCjAXmyAdGva5sERdVY2",
                "user": Object {
                  "created_at": "2020-02-27 11:02:53",
                  "id": 11,
                  "name": "Wawan 2",
                  "phoneNumber": "+6282125516876",
                  "profilePic": null,
                  "tokenId": "WUB2eHaJlzSKpdOQdP3RHj14FT1ggX6dqW4wBxs1o0EIdFr7LD8mub6cAFy8VCjAXmyAdGva5sERdVY2",
                  "updated_at": "2020-02-27 11:09:40",
                },
              },
              "status_code": 200,
              "status_message": "OK",
            },

          * */
        if (result.data.status_message === "OK" && result.data.result && result.data.result.token !== ''){
          const response = result.data.result
          const userDetail = {
            userName: response.user.name,
            bookName: response.book.bookName,
            phoneNumber: response.user.phoneNumber,
            bookId: response.book.id,
            token: response.token,
            isNew: this.state.user.isNew,
            isLoggedIn: true,
          }
          loginSuccess(userDetail)
          if(this.state.user.isNew)
            this.state.navigation.navigate('Register03')
          else
            this.state.navigation.navigate('App')
        } else {
          // alert(`${API_URL} => Invalid token! => token:${this.otp.join('')}`)
          Alert.alert('Perhatian!', data.data.data.message ? data.data.data.message : errorMessage)
        }
      })
      .catch(err => {
        console.log("err: ", err)
        // alert(`${API_URL} => ${err} => token:${this.otp.join('')}`)
        Alert.alert('Perhatian!', errorMessage)
      })
      .finally(() => this.setState({ loading: false }))
  }

  resendOTP = () => {
    this.setState({
      loading: true,
      loadingMessage: 'Mengirim OTP...'
    })
    const errorMessage = 'Terjadi kesalahan saat meminta OTP!'
    const params = {
      phoneNumber: this.phoneNumber,
    }
    GetOTP(params)
      .then(result => {
        console.log("result: ", result.data)
        if (result.data.status_code === 200 && result.data.status_message == 'OK'){
          Alert.alert('Success!', 'Kode OTP baru telah berhasil dikirim')
        } else {
          // alert(`${API_URL} => Invalid token! => token:${this.otp.join('')}`)
          Alert.alert('Perhatian!', data.data.data.message ? data.data.data.message : errorMessage)
        }
      })
      .catch(err => {
        // alert(`${API_URL} => ${err} => token:${this.otp.join('')}`)
        Alert.alert('Perhatian!', errorMessage)
      })
      .finally(() => this.setState({ loading: false }))
  }

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove()
    this.keyboardDidShowListener.remove()
  }

  _keyboardWillShow = (event) => {
    Animated.timing(this.state.imageHeight, {
      duration: 200,
      toValue: this.IMAGE_HEIGHT_SMALL,
    }).start()
  }

  _keyboardWillHide = (event) => {
    Animated.timing(this.state.imageHeight, {
      duration: 200,
      toValue: this.IMAGE_HEIGHT,
    }).start()
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide)
  }

  render () {
    console.log("this.state.imageHeight: ", this.state.user)
    return (
      <View style={styles.container}>
        <LoadingModal showLoading={this.state.loading} loadingMessage={this.state.loadingMessage} />
        <View style={styles.logoContainer}>
          {/*<Image source={ OTP_LOGO } resizeMode="contain" />*/}
          <Animated.Image source={OTP_LOGO} resizeMode="contain" style={{ height:  this.state.imageHeight }}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Kode Verifikasi</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Kode verifikasi telah terkirim. Mohon periksa kotak masuk SMS anda</Text>
        </View>
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
                  onChangeText={text => this.handleChangeOtp(text, index)}
                  style={styles.otpInput}
                />
              )
            })
          }
        </View>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            // disabled={true}
            onPress={() => this.nextStep()}
          >
            <View style={styles.buttonNext}>
              <Text {...tProps} style={styles.buttonText}>Verifikasi Kode</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.moreContainer}>
          <Text>Tidak menerima kode verifikasi? <Text style={styles.textResend} onPress={() => this.resendOTP()}>Kirim ulang</Text></Text>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // confirmOtp: (phoneNumber, otp, cb) => dispatch(confirmOTP(phoneNumber, otp, cb)),
    loginSuccess: (userDetail) => dispatch(loginSuccess(userDetail)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTP)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0f0',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    // verticalAlign: 'middle',
    // justifyContent: 'space-between',
    // padding: Constants.statusBarHeight
  },
  logoContainer: {
    // backgroundColor: 'red',
    marginTop: '20%',
  },
  titleContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  subtitleContainer: {
    marginTop: 10,
    width: 300,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#aaa'
  },
  otpView: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  otpInput: {
    borderRadius: 2,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10,
    height: 50,
    width: 50,
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 30
  },
  buttonNext: {
    backgroundColor: '#2a2cbb',
    // padding: 12,
    width: 270,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  errorPhone: {
    fontSize: 14,
    color: '#f25a5a',
    fontWeight: 'bold'
  },
  moreContainer: {
    marginTop: 15
  },
  textResend: {
    color: '#149914',
    fontWeight: 'bold'
  }
})
