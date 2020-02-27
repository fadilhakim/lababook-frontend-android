import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback, ActivityIndicator
} from 'react-native'
import Modal from 'react-native-modal'

import { textExtraProps as tProps } from '../../config/system'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import LoadingModal from '../../helpers/LoadingModal'
// import BaseStyle from '../../style/BaseStyle'
// import { textExtraProps as tProps } from '../../config/system'
// import { Image } from 'react-native-web'
import { Register } from '../../api/auth'
import { registerSuccess } from '../../store/actions/user'
// import { checkOtp } from '../../libs/request'
// import syncActions from '../../libs/syncActions'
// import { USER_CONFIRMED } from '../../store/actionTypes/user'
// import { HIDE_LOADING } from '../../store/actionTypes/loading'
// import { showErrorBottom } from '../../libs/errorHandler'

class RegisterName extends Component {
  state = {
    selected: null,
    loading: false,
    phoneNumber: '',
    name: '',
    bookName: '',
    bookType: this.props.user.bookType,
    phoneNumberFirstType: true,
    bookNameFirstType: true,
    nameFirstType: true,
    user: this.props.user,
  }
  navigation = this.props.navigation
  registerSuccess = this.props.registerSuccess

  registerUser = () => {
    const errorMessage = 'Terjadi kesalahan saat menyimpan data!'
    this.setState({ loading: true })
    // console.log(this.state)
    const params = {
      phoneNumber: '+62' + this.state.phoneNumber,
      name: this.state.name,
      bookName: this.state.bookName,
      bookType: this.state.bookType,
    }

    Register(params)
      .then(data => {
        console.log("data: ", data.data)
        if(data.data.status_message == 'OK') {
          const response = data.data.result
          this.registerSuccess({...params,
            bookId: response.book.id,
            id: response.user.id,
          })
          this.navigation.navigate('OTP')
        } else {
          Alert.alert('Perhatian!', data.data.data.message ? data.data.data.message : errorMessage)
        }
      })
      .catch(error => {
        console.log("error: ", error)
        Alert.alert('Perhatian!', errorMessage)
      })
      .finally(() => this.setState({ loading: false }))
  }

  nextStep = () => {
    // console.log("this.state.phoneNumber: ", !!this.state.phoneNumber)
    if (this.state.phoneNumber && this.state.bookName && this.state.name) {
      this.registerUser()
    } else {
      this.setState({
        phoneNumberFirstType: false,
        bookNameFirstType: false,
        nameFirstType: false,
      })
    }
  }

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

  onValueChange = (field, value) => {
    switch (field) {
      case 'name':
        this.setState({
          name: value,
          nameFirstType: false
        })
        break
      case 'bookName':
        this.setState({
          bookName: value,
          bookNameFirstType: false
        })
        break
      default:
        this.setState({
          [field]: value,
          [field+'FirstType']: false,
        })
    }
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   })
    // }, 5000)
  }

  render () {
    // console.log("loading: ", this.state.user)
    return (
      <SafeAreaView style={styles.container}>
        <LoadingModal showLoading={this.state.loading} loadingMessage='Menyimpan data...' />

        <Text style={styles.title}>
          Buat Akun Baru
        </Text>

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
          <View style={[styles.rowField, this.styleEmptyField('name')]}>
            <View style={styles.iconField}>
              <Ionicons name='ios-person' size={30} color='#aaa' />
            </View>
            <View style={styles.inputGroup}>
              <TextInput style={styles.inputField} placeholder='nama pengguna'
                         value={this.state.name}
                         onChangeText={(value) => this.onValueChange('name', value)}
              />
            </View>
          </View>
          <View style={[styles.rowField, this.styleEmptyField('bookName')]}>
            <View style={styles.iconField}>
              <MaterialIcons name='store' size={30} color='#aaa' />
            </View>
            <View style={styles.inputGroup}>
              <TextInput style={styles.inputField} placeholder='nama toko'
                         value={this.state.bookName}
                         onChangeText={(value) => this.onValueChange('bookName', value)}
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
              <Text {...tProps} style={styles.buttonText}>Selanjutnya</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </SafeAreaView>
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
    registerSuccess: (userDetail) => dispatch(registerSuccess(userDetail)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterName)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'top',
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: 'lightgray',
  },
  title: {
    marginTop: '20%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  formContainer: {
    marginTop: 20,
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
  inputGroup: {
    width: 247,
    marginRight: 10,
    // backgroundColor: '#ababab',
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
