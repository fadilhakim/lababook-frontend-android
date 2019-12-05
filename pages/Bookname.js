import React, { useState } from 'react'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StatusBar,
  Image
} from 'react-native'

import { updateBookName, registerUser } from '../store/actions/user'

function Bookname (props) {
  const {
    navigation,
    user,
    updateBookName,
    register,
    loading
  } = props
  const [bookName, setBookName] = useState('')
  const [isError, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const handleRef = ref => {
    if (ref & isError) ref.focus()
  }

  const handleChangeText = text => {
    setBookName(text)
    updateBookName(text)
    setError(false)
  }

  const registerUser = () => {
    if (bookName.length < 4) {
      setError(true)
      setErrMsg('Nama buku minimal 4 karakter')
    } else {
      register(user)
      setTimeout(
        () => navigation.navigate('OTPRegister'),
        300
      )
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>
          Pengguna Baru
        </Text>
        <Text style={styles.phoneLabel}>
          Masukkan Nama Buku Anda
        </Text>
        {
          isError && (
            <Text style={styles.errorPhone}>
              {errMsg}
            </Text>
          )
        }
        <TextInput
          autoFocus
          keyboardAppearance='default'
          keyboardType='name-phone-pad'
          onChangeText={text => handleChangeText(text)}
          style={!isError ? styles.phone : styles.phoneError}
          ref={handleRef}
        />
        {
          loading && <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Image
              source={require('../assets/loading-roll.gif')}
              style={{ height: 20, width: 20, marginRight: 5 }}
            />
            <Text>Membuatkan akun Anda</Text>
          </View>
        }
        <TouchableNativeFeedback
          onPress={() => registerUser()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Masuk</Text>
          </View>
        </TouchableNativeFeedback>
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
    updateBookName: (bookName) => dispatch(updateBookName(bookName)),
    register: (user) => dispatch(registerUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookname)

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
  errorPhone: {
    fontSize: 14,
    color: '#f25a5a',
    fontWeight: 'bold'
  }
})
