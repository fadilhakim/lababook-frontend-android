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
  ActivityIndicator, Image
} from 'react-native'
import { API_URL } from 'react-native-dotenv'

import { textExtraProps as tProps } from '../config/system'
import { updatePhoneNumber, loginUser } from '../store/actions/user'
import { GetOTP } from '../api/auth'
import { LOGIN, REGISTER_SUCCESS } from '../utils/images'
import { MaterialIcons } from '@expo/vector-icons'
import LoadingModal from '../helpers/LoadingModal'

function Login (props) {
  state = {
    loading: false
  }
  const { navigation, updatePhoneNumber, login } = props
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [isError, setError] = useState(false)

  const styleEmptyField = (field) => {
    if (this.state[field] || this.state[field+'FirstType']) return {}
    else return { borderColor: '#ff0000', borderBottomWidth: 2 }
  }

  const handleRef = (ref) => {
    if (ref && isError) ref.focus()
  }

  const handleChangeText = (text) => {
    setPhoneNumber(text)
    setError(false)
  }

  const doLogin = () => {
    Keyboard.dismiss()

    updatePhoneNumber(phoneNumber)
    // return navigation.navigate('OTP')
    console.log(phoneNumber)
    // shoould be below
    GetOTP({ phoneNumber })
      .then(result => {
        console.log(result)
        if (result.status === 200){
         // update detail user here
        } else {
          setError(true)
        }
      })
      .catch(err => {
        alert(`${API_URL} => ${err} => token:${phoneNumber}`)
      })
    // Network.getNetworkStateAsync()
    //   .then(stat => {
    //     if (stat.isInternetReachable) {
    //       login(phoneNumber, () => {
    //         navigation.navigate('OTP')
    //       })
    //     } else {
    //       ToastAndroid.showWithGravity(
    //         'Anda tidak terhubung ke Internet',
    //         ToastAndroid.LONG,
    //         ToastAndroid.BOTTOM
    //       )
    //     }
    //   })
    //   .catch(error => {
    //     ToastAndroid.showWithGravity(
    //       error.message,
    //       ToastAndroid.LONG,
    //       ToastAndroid.BOTTOM
    //     )
    //   })
  }

  return (
    <View style={styles.container}>
      <LoadingModal showLoading={this.state.loading} loadingMessage='Menyimpan data...' />
      <View style={styles.logoContainer}>
        <Image source={ LOGIN } style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          LABABOOK
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={[styles.rowField, styleEmptyField('phoneNumber')]}>
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
      {/*<View style={{ width: '100%' }}>*/}

      {/*  <Text {...tProps} style={styles.phoneLabel}>*/}
      {/*    Nomor Handphone*/}
      {/*  </Text>*/}
      {/*  {*/}
      {/*    isError && (*/}
      {/*      <Text {...tProps} style={styles.errorPhone}>*/}
      {/*        {errMsg}*/}
      {/*      </Text>*/}
      {/*    )*/}
      {/*  }*/}
      {/*  <TextInput*/}
      {/*    autoFocus={true}*/}
      {/*    keyboardAppearance='default'*/}
      {/*    keyboardType='number-pad'*/}
      {/*    onChangeText={text => handleChangeText(text)}*/}
      {/*    style={!isError ? styles.phone : styles.phoneError}*/}
      {/*    ref={handleRef}*/}
      {/*  />*/}
      {/*  <TouchableNativeFeedback*/}
      {/*    onPress={() => doLogin()}*/}
      {/*  >*/}
      {/*    <View style={styles.button}>*/}
      {/*      <Text {...tProps} style={styles.buttonText}>Verifikasi</Text>*/}
      {/*    </View>*/}
      {/*  </TouchableNativeFeedback>*/}
      {/*  <View style={styles.info}>*/}
      {/*    <Text {...tProps} style={styles.infoText}>*/}
      {/*      Tidak bisa masuk HP Anda tidak terdaftar*/}
      {/*    </Text>*/}
      {/*    <Text {...tProps} style={styles.infoLink}>*/}
      {/*      Hubungi Kami*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*</View>*/}
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
})
