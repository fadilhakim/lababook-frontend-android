import React, { Component, useState } from 'react'
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
  ActivityIndicator, Image, Alert
} from 'react-native'
import { API_URL } from 'react-native-dotenv'

import { textExtraProps as tProps } from '../config/system'
import { updatePhoneNumber, updateUserStatus, loginUser } from '../store/actions/user'
import { GetOTP } from '../api/auth'
import { LOGIN, REGISTER_SUCCESS } from '../utils/images'
import { MaterialIcons } from '@expo/vector-icons'
import LoadingModal from '../helpers/LoadingModal'
import { UPDATE_PHONE_NUMBER } from '../store/actionTypes/user'

// function Login (props) {
class Login extends Component {
  state = {
    user: this.props.user,
    navigation: this.props.navigation,
    phoneNumber: '',
    loading: false,
    phoneNumberFirstType: true,
  }
  updatePhoneNumber = this.props.updatePhoneNumber
  updateUserStatus = this.props.updateUserStatus
  // const { navigation, updatePhoneNumber, login } = props
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [errMsg, setErrMsg] = useState('')
  // const [loading] = useState(false)
  // const [phoneNumberFirstType] = useState(true)

  styleEmptyField = (field) => {
    if (this.state[field] || this.state[field+'FirstType']) return {}
    else return { borderColor: '#ff0000', borderBottomWidth: 2 }
  }

  checkPhoneNumber = (target) => {
    // console.log(target)
    this.setState({
      phoneNumber: target.replace(/^0+/, '').trim(),
      phoneNumberFirstType: false
    })
  }

  nextStep = async () => {
    // console.log("this.state.user: ", this.state.phoneNumber)
    if (this.state.phoneNumber) {
      console.log(this.state.phoneNumber)
      await this.updatePhoneNumber('+62' + this.state.phoneNumber)
      await this.updateUserStatus()
      this.getOtp()
    } else {
      this.setState({
        phoneNumberFirstType: false,
      })
    }
  }

  getOtp = () => {
    this.setState({
      loading: true,
    })
    const errorMessage = 'Terjadi kesalahan saat meminta OTP!'
    const params = {
      phoneNumber: '+62' + this.state.phoneNumber,
    }
    GetOTP(params)
      .then(result => {
        // console.log("result getotp login: ", result)
        if (result.data.status_code === 200 && result.data.status_message == 'OK'){
          // Alert.alert('Success!', 'Kode OTP baru telah berhasil dikirim')
          this.state.navigation.navigate('OTP')
        } else {
          // alert(`${API_URL} => Invalid token! => token:${this.otp.join('')}`)
          Alert.alert('Perhatian!', result.data.data.message ? result.data.data.message : errorMessage)
        }
      })
      .catch(err => {
        // alert(`${API_URL} => ${err} => token:${this.otp.join('')}`)
        Alert.alert('Perhatian!', errorMessage)
      })
      .finally(() => this.setState({ loading: false }))
  }

  render () {
    // console.log("this.state.user: ", this.state.user)
    return (
      <View style={styles.container}>
        <LoadingModal showLoading={this.state.loading} loadingMessage='Meminta OTP...' />
        <View style={styles.logoContainer}>
          <Image source={ LOGIN } style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            LABABOOK
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={[styles.rowField, this.styleEmptyField('phoneNumber')]}>
            <View style={styles.iconField}>
              <MaterialIcons name='phone-iphone' size={30} color='#aaa' />
            </View>
            <View style={styles.labelField}>
              <Text style={styles.labelText}>+62</Text>
            </View>
            <View style={styles.inputGroupNo}>
              <TextInput style={styles.inputField} placeholder='no telepon'
                         keyboardType='number-pad'
                         value={this.state.phoneNumber}
                         onChangeText={(value) => this.checkPhoneNumber(value)}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            // disabled={true}
            onPress={() => this.nextStep()}
          >
            <View style={styles.buttonNext}>
              <Text {...tProps} style={styles.buttonText}>Login</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
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
    },
    updateUserStatus: () => {
      dispatch(updateUserStatus())
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
    // backgroundColor: '#0f0',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  logoContainer: {
    // backgroundColor: 'red',
    marginTop: '20%',
    height: 80,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  logo: {
    height: 80,
  },
  titleContainer: {

  },
  title: {
    color: '#2a2c7b',
    fontWeight: 'bold',
    fontSize: 24,
  },
  formContainer: {
    marginTop: 80,
  },
  rowField: {
    borderBottomWidth: 0.5,
    borderColor: '#aaa',
    margin: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  iconField: {
    marginRight: 10,
    // backgroundColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 30,
  },
  labelField: {
    // backgroundColor: '#dadada',
    justifyContent: 'center',
    // paddingRight: 10,
    borderRightColor: '#aaa',
    borderRightWidth: 0.5,
    borderStyle: 'solid',
  },
  labelText: {
    fontSize: 18,
    width: 40,
    // marginRight: 10,
  },
  inputGroupNo: {
    width: 200,
    marginLeft: 7,
    marginRight: 10,
    // backgroundColor: '#efefef',
  },
  inputField: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    // paddingBottom: 20,
    fontSize: 18,
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
  buttonContainer: {
    marginTop: 40
  }
})
