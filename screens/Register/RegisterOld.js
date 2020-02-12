import React, { useState } from 'react'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StatusBar
} from 'react-native'

import { textExtraProps as tProps } from '../../config/system'
import { updateUserName } from '../../store/actions/user'

function RegisterOld (props) {
  const { navigation, updateUserName, clearStates } = props
  const [username, setUsername] = useState('')
  const [isError, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const handleRef = ref => {
    if (ref & isError) ref.focus()
  }

  const handleChangeText = text => {
    setUsername(text)
    setError(false)
  }

  const inputName = () => {
    if (username.length < 4) {
      setError(true)
      setErrMsg('Nama minimal 4 karakter')
    } else {
      updateUserName(username)
      toBookname()
    }
  }

  const toBookname = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text {...tProps} style={styles.title}>
          Pengguna Baru
        </Text>
        <Text {...tProps} style={styles.phoneLabel}>
          Masukkan Nama Anda
        </Text>
        {
          isError && (
            <Text {...tProps} style={styles.errorPhone}>
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
        <TouchableNativeFeedback
          onPress={() => inputName()}
        >
          <View style={styles.button}>
            <Text {...tProps} style={styles.buttonText}>Masuk</Text>
          </View>
        </TouchableNativeFeedback>
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
    updateUserName: (userName) => dispatch(updateUserName(userName)),
    clearStates: () => dispatch({ type: 'CLEAR_STATES' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOld)

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
    color: '#2a2c7b',
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
    borderBottomColor: '#2a2c7b',
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
    backgroundColor: '#2a2c7b',
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
