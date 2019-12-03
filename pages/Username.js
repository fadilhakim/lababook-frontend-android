import React, { useState } from 'react'
import Constants from 'expo-constants'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StatusBar
} from 'react-native'

export default function Username (props) {
  const { navigation } = props

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
    } else toBookname()
  }

  const toBookname = () => {
    navigation.navigate('Bookname')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' style={styles.statusBar}/>
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>
          Pengguna Baru
        </Text>
        <Text style={styles.phoneLabel}>
          Masukkan Nama Anda
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
        <TouchableNativeFeedback
          onPress={() => inputName()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Masuk</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

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
