import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  SafeAreaView,
  Alert,
  Image,
  AsyncStorage,
  FormLabel,
  FormInput,
  FormValidationMessage,
  TextInput,
  StatusBar,
  YellowBox,
} from 'react-native'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase'
import _ from 'lodash'

import { updateUserProfile } from '../store/actions/user'
import { textExtraProps as tProps } from '../config/system'
import LoadingModal from '../helpers/LoadingModal'
import { UpdateProfile } from '../api/auth'
import Constants from 'expo-constants'
import { firebaseConfig } from '../config/firebaseConfig'
// import Image from 'react-native-web/src/exports/Image'
// import AccForm from '../components/AccForm'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
}

class AccountSetting extends Component {
  state = {
    selected: null,
    loading: false,
    phoneNumber: this.props.user.phoneNumber,
    name: this.props.user.userName,
    bookName: this.props.user.bookName,
    nameIsEditable: false,
    bookNameIsEditable: false,
    user: this.props.user,
    urlImage: '',
    loadingMessage: 'Menyimpan data...'
  }

  refName = null
  refBookName = null
  goBack = this.props.navigation
  updateUserProfile = this.props.updateUserProfile
  registerSuccess = this.props.registerSuccess

  styleEmptyField = (field) => {
    if (this.state[field] || this.state[field+'FirstType']) return {}
    else return { borderColor: '#ff0000', borderBottomWidth: 2 }
  }

  activateField = async (field) => {
    await this.setState({
      [field + 'IsEditable']: true,
    })

    this.focusField()
  }

  saveField = (field) => {
    if(this.state.name && this.state.bookName){
      this.setState({
        loading: true,
        loadingMessage: 'Menyimpan data...'
      })

      const params = {
        userId: this.state.user.id,
        name: this.state.name,
        bookId: this.state.user.bookId,
        bookName: this.state.bookName,
        token: this.state.user.token
      }
      UpdateProfile(params)
        .then(async (result) => {
          if(result.data && result.data.status_message == "OK"){
            await this.setState({
              nameIsEditable: false,
              bookNameIsEditable: false,
            })
            await this.updateUserProfile({
              bookName: this.state.bookName,
              userName: this.state.name,
            })
            // console.log(this.state)
          }else {
            Alert.alert('Perhatian!', 'Terjadi kesalahan saat menyimpan data!')
          }
        })
        .catch((err) => {
          Alert.alert('Perhatian!', 'Terjadi kesalahan saat menyimpan data!')
        })
        .finally(() => this.setState({ loading: false }))
    }

    // console.log('save: ', field)
    // this.setState({
    //   [field + 'IsEditable']: false,
    // })
    // console.log("this.state.nameIsEditable: ", this.state.nameIsEditable)
  }

  focusField = () => {
    if(this.state.nameIsEditable) {
      this.refName.focus()
    }else{
      this.refBookName.focus()
    }
  }

  lastIcon = (field) => {
    if(this.state[field+'IsEditable']) {
      return (
        <MaterialIcons name='save' size={30} color='#aaa' onPress={() => this.saveField(field)}/>
      )
    }else {
      return (
        <MaterialIcons name='edit' size={30} color='#aaa' onPress={() => this.activateField(field)}/>
      )
    }
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  showImagePicker = async () => {
    let result = await ImagePicker.launchCameraAsync()

    if(!result.cancelled) {
      this.setState({
        loading: true,
        loadingMessage: 'Menyimpan foto...'
      })
      this.uploadImage(result.uri)
        .then((res) => {
          this.loadImageURL()
        })
        .catch((err) => {
          Alert.alert('Perhatian', 'Terjadi kesalahan saat menyimpan gambar!\n' + err)
        })
        .finally(() => this.setState({ loading: false }))
    }
  }

  uploadImage = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    let ref = firebase.storage().ref().child('img-users/users_' + this.state.user.id )
    return ref.put(blob)
  }

  loadImageURL = () => {
    const ref = firebase.storage().ref().child('img-users/users_' + this.state.user.id)

    ref.getDownloadURL()
      .then(data => {
        this.setState({ urlImage: data })
      })
      .catch(err => {
        console.log("Error fetching image: ", err)
      })
  }

  showImageUser = () => {
    if(this.state.urlImage) {
      return (
        <Image style={{
          width: 150,
          height: 150,
          borderRadius: 150,
          // flex: 1,
          // resizeMode: 'cover',
        }} source={{ uri: this.state.urlImage }}/>
      )
    }else{
      return (
        <Text style={{color:'#fff', fontWeight:'bold', fontSize: 70}}>
          {this.state.name[0]}
        </Text>
      )
    }
  }

  async componentDidMount () {
    if(!firebase.apps.length){
      await firebase.initializeApp(firebaseConfig)
      this.loadImageURL()
    }
  }

  render (){
    return (
      <SafeAreaView style={styles.container}>
        {/*<StatusBar barStyle='dark-content' style={{height: Constants.statusBarHeight}}/>*/}
        <LoadingModal showLoading={this.state.loading} loadingMessage={this.state.loadingMessage} />
        <View style={styles.formDiv}>
          <View style={styles.initialNameCircle}>
            { this.showImageUser() }
            <View style={styles.divLogo}>
              <Ionicons
                name='md-camera'
                size={20}
                color='#fff'
                style={styles.logoCamera}
                onPress={() => this.showImagePicker()}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={[styles.rowField, this.styleEmptyField('name')]}>
              <View style={styles.iconField}>
                <Ionicons name='ios-person' size={30} color='#aaa' />
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Nama Anda</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput style={styles.inputField} placeholder='Nama Anda'
                           value={this.state.name}
                           editable={this.state.nameIsEditable}
                           ref={ref => this.refName = ref }
                           onChangeText={(value) => this.onValueChange('name', value)}
                />
              </View>
              <View>
                { this.lastIcon('name')}
              </View>
            </View>
            <View style={[styles.rowField, this.styleEmptyField('bookName')]}>
              <View style={styles.iconField}>
                <MaterialIcons name='store' size={30} color='#aaa' />
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Nama Toko Anda</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput style={styles.inputField} placeholder='Nama Toko Anda'
                           value={this.state.bookName}
                           editable={this.state.bookNameIsEditable}
                           ref={ref => this.refBookName = ref }
                           onChangeText={(value) => this.onValueChange('bookName', value)}
                />
              </View>
              <View>
                { this.lastIcon('bookName')}
              </View>
            </View>
            <View style={[styles.rowField, this.styleEmptyField('phoneNumber')]}>
              <View style={styles.iconField}>
                <MaterialIcons name='phone-iphone' size={30} color='#aaa' />
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Nomor HP yang terdaftar</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput style={styles.inputField} placeholder='Nomor HP yang terdaftar'
                           keyboardType='number-pad'
                           value={this.state.phoneNumber}
                           editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateUserProfile: (userDetail) => dispatch(updateUserProfile(userDetail)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting)
// export default AccountSetting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'stretch',
    // justifyContent: 'center',
    marginTop: '20%',
    paddingLeft : 60,
    paddingRight : 60
  },
  formDiv: {
    alignSelf : 'stretch'
  },
  formInput: {
    alignSelf : 'stretch',
    fontSize: 17,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    marginBottom:15
  },
  divLogo: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    borderRadius: 150,
    height:30,
    width:30,
    position: 'absolute',
    right:1,
    bottom:5
  },
  logoCamera: {


  },
  initialNameCircle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 2,
    backgroundColor: '#eb5789',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff',
    height:150,
    width:150,
    textAlign:'center',
    marginBottom:20,
    marginLeft:'auto',
    marginRight:'auto'
  },
  formContainer: {
    marginTop: 20,
  },
  rowField: {
    borderBottomWidth: 0.5,
    borderColor: '#aaa',
    margin: 10,
    // paddingBottom: 10,
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
  labelContainer: {
    position: 'absolute',
    left: 40,
    top: -5,
  },
  labelText: {
    fontSize: 10,
    // width: 40,
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
    paddingTop: 7,
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
