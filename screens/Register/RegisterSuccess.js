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

import { updateUserStatus } from '../../store/actions/user'
import { REGISTER_SUCCESS, REGISTER_THUMB_SUCCESS } from '../../utils/images'

class RegisterSuccess extends Component {
  state = {
    user: this.props.user,
    navigation: this.props.navigation,
  }

  nextStep = () => {
    updateUserStatus()
    this.state.navigation.navigate('App')
  }

  render () {
    console.log("this.state.imageHeight: ", this.state.user)
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={ REGISTER_SUCCESS } resizeMode="contain" />
        </View>
        <View style={[styles.logoContainer, styles.thumb]}>
          <Image source={ REGISTER_THUMB_SUCCESS } resizeMode="contain" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selamat!</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Akun anda berhasil didaftarkan</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            // disabled={true}
            onPress={() => this.nextStep()}
          >
            <View style={styles.buttonNext}>
              <Text style={styles.buttonText}>Ke Beranda</Text>
            </View>
          </TouchableNativeFeedback>
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
    updateUserStatus: () => dispatch(updateUserStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccess)

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
    height: 237,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  thumb: {
    // backgroundColor: 'grey',
    height: 97,
    marginTop: -127
  },
  titleContainer: {
    marginTop: 30
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
  },
  subtitleContainer: {
    marginTop: 20,
    width: 250,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: '#aaa'
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
})
