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
import BaseStyle from "./../style/BaseStyle"

function DetailTransaction(props) {
  const { navigation } = props
  const params = props.navigation.state.params

  const signOut = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => navigation.navigate('AuthLoading'))
  }


  return (
    <View style={BaseStyle.container}>
      <View style={BaseStyle.headerBlue}>
        <TouchableNativeFeedback onPress={() => { NavigationService.navigate("Home") }}>
          <View style={BaseStyle.divBack}>
            <Ionicons
              name='md-arrow-back'
              size={30}
              color='#fff'
              style={BaseStyle.arrowBack}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={BaseStyle.initialNameCircle}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25 }}>{params.contactInitial}</Text></View>
        <Text style={BaseStyle.headText}>{params.name}</Text>
        <Text style={BaseStyle.headPhone}>{params.phoneNumber} </Text>
        <View style={BaseStyle.divLogo}>
          <Ionicons
            name='md-call'
            size={25}
            color='#fff'
            style={BaseStyle.logoPhone}
          />
        </View>
      </View>
      <View style={BaseStyle.headerBtm}>
        <Text>Total :- </Text>
        <Text>Pengingat : - </Text>
      </View>

      <View style={BaseStyle.blmWrap}>
        <Text style={BaseStyle.blmAdaText}>Belum Anda Transaksi</Text>

      </View>

      <View style={BaseStyle.btnWrap}>

        <TouchableNativeFeedback onPress={() => { NavigationService.navigate("AddTransactions") }}>
          <View style={BaseStyle.btnBerikan}><Text style={BaseStyle.btnText}>ANDA BERIKAN</Text></View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => { NavigationService.navigate("AddTransactions") }}>
          <View onPress={() => { NavigationService.navigate("Home") }} style={BaseStyle.btnDapatkan}><Text style={BaseStyle.btnText}>ANDA DAPATKAN</Text></View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default DetailTransaction

const styles = StyleSheet.create({


})
