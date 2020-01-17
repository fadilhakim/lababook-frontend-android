import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage,
  Button
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import NavigationService from '../helpers/NavigationService';

function DetailTransaction (props) {
  const { navigation } = props

  const signOut = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => navigation.navigate('AuthLoading'))
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBlue}>
        <TouchableNativeFeedback onPress={() => {  NavigationService.navigate("Home") }}>
          <View style={styles.divBack}>
              <Ionicons
                name='md-arrow-back'
                size={30}
                color='#fff'
                style={styles.arrowBack}
              />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.initialNameCircle}><Text style={{color:'#fff', fontWeight:'bold', fontSize: 25}}>A</Text></View> 
        <Text style={styles.headText}>Aan Wiguna</Text>
        <Text style={styles.headPhone}>+62 9310 8810</Text>
        <View style={styles.divLogo}>
          <Ionicons
            name='md-call'
            size={25}
            color='#fff'
            style={styles.logoPhone}
          />
        </View>
      </View>
      <View style={styles.headerBtm}>
        <Text>Total : <Text>Rp. 3.000.000(Anda berikan)</Text></Text>
        <Text>Pengingat : <Text>Kam, 22 Nov 2019</Text></Text>
      </View>

      <View style={styles.btnWrap}>
        <Button title="Anda Berikan" style={styles.btnBerikan}/>
        <Button title="Anda Dapatkan" style={styles.btnDapatkan}/>
      </View>
    </View>
  )
}

export default DetailTransaction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
    // justifyContent: 'space-between'
  },
  headerBlue : {
    backgroundColor: '#2a2c7b',
    height : 85,
    paddingTop:15,
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
  }, 
  initialNameCircle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    backgroundColor: '#eb5789',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff',
    height:47,
    width:47,
    textAlign:'center',
    position: 'absolute',
    left:50,
    bottom:8
  },
  headText : {
    color : '#fff',
    paddingTop: 10,
    paddingBottom: 1,
    marginLeft : 110,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop:5
  },
  headPhone : {
    color : '#fff',
    paddingTop: 0,
    paddingBottom: 3,
    marginLeft : 110,
    fontSize: 13,
    fontStyle : "italic"
  },
  divBack: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    height:30,
    width:30,
    position: 'absolute',
    left:10,
    bottom:15
  },
  divLogo: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    height:30,
    width:30,
    position: 'absolute',
    right:20,
    bottom:12
  },
  logoPhone: {
    

  },
  divLogoBtm: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    height:30,
    width:30,
    position: 'absolute',
    right:20,
    bottom:12
  },
  headerBtm : {
    height: 70,
    paddingLeft: 17,
    paddingTop: 10,
    paddingBottom:10,
    borderBottomWidth:10,
    borderBottomColor:'#f3f3f3'
  },
  btnWrap : {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBerikan : {

  },
  btnDapatkan : {
    
  }

})
