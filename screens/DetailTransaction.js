import React, { Component } from 'react'
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

import TransactionAPI from "./../api/transaction"

class DetailTransaction extends Component {

  constructor() {
    super()

    this.state = {
      contactTransactions:[],
      userId:""
    }
  }

  componentDidMount() {

    const transactionApi = new TransactionAPI()

    const { navigation } = this.props
    const params = this.props.navigation.state.params

    this.setState({
      userId:params.userId
    })

    transactionApi.getTransactionByContact(params.contactId)
    .then(res => {
      console.log( " res =====> ",res.data)
      this.setState({
        contactTransactions:this.state.contactTransactions.concat(res.data)
      })
    })
    .catch(err => {
      alert(err)
    })

  }

  signOut() {
    AsyncStorage.removeItem('userToken')
    .then(() => navigation.navigate('AuthLoading'))
  }

  render() {
    const { navigation } = this.props
    const params = this.props.navigation.state.params
    
    var dataTransaction =   <View style={BaseStyle.blmWrap}>
      <Text style={BaseStyle.blmAdaText}>Belum Anda Transaksi</Text>
    </View>

    if( this.state.contactTransactions.length > 0) {
      dataTransaction = this.state.contactTransactions.map(item => {
        return (
          <View key={ item.trxId }>
            <Text>{ JSON.stringify(item)  }</Text>
          </View>
        )
      })
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
          <Text>Total : Rp. { params.totalTransaction } </Text>
          <Text>Pengingat : - </Text>
        </View>
        
        { dataTransaction }
        
        <View style={BaseStyle.btnWrap}>
  
          <TouchableNativeFeedback onPress={() => { NavigationService.navigate("AddTransactions",{
          
            transactionType:"credit",
            name: params.name,
            phoneNumber: params.phoneNumber,
            contactInitial: params.contactInitial,
            contactId:params.contactId,
            userId:this.state.userId,
            totalTransaction:params.totalTransaction
          }) }}>
            <View style={BaseStyle.btnBerikan}><Text style={BaseStyle.btnText}>ANDA BERIKAN</Text></View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => { NavigationService.navigate("AddTransactions",{
            transactionType:"debit",
            name: params.name,
            phoneNumber: params.phoneNumber,
            contactInitial: params.contactInitial,
            contactId:params.contactId,
            userId:params.userId,
            totalTransaction:params.totalTransaction,
            userId:this.state.userId
          }) }}>
            <View onPress={() => { NavigationService.navigate("Home") }} style={BaseStyle.btnDapatkan}>
              <Text style={BaseStyle.btnText}>ANDA DAPATKAN</Text></View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }

  
}

export default DetailTransaction

const styles = StyleSheet.create({


})
