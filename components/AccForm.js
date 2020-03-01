import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  AsyncStorage,FormLabel,FormInput, FormValidationMessage
} from 'react-native'

import { Ionicons, Foundation, SimpleLineIcons } from '@expo/vector-icons'
import NavigationService from '../helpers/NavigationService';

export default class AccForm extends React.Component {
	render(){
		return(
			<View style={styles.formDiv}>
				<View style={styles.initialNameCircle}> 
					<Text style={{color:'#fff', fontWeight:'bold', fontSize: 70}}>A</Text>
					<View style={styles.divLogo}>
		              <Ionicons
		                name='md-camera'
		                size={20}
		                color='#fff'
		                style={styles.logoCamera}
		              />
		       </View>
				</View>
				<Text style={styles.formLabel}>Nama Anda :</Text>
				<TextInput style={styles.formInput} placeholder="nama"> Andre </TextInput>
				<Text style={styles.formLabel}>Nama Buku Anda :</Text>
				<TextInput style={styles.formInput} placeholder="nama buku"> Warung Mira </TextInput>
				<Text style={styles.formLabel}>No Hp Yang Terdaftar :</Text>
				<TextInput style={styles.formInput} placeholder="no hp"> +6281-3103-1231 </TextInput>
				<Button onPress={() => {}} title="Edit" />
			</View>
		); 
	}
}

const styles = StyleSheet.create({
  formDiv: {
    alignSelf : 'stretch'
  },
  formLabel: {
    alignSelf : 'stretch',
    fontSize: 13,
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

})