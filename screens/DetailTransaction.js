import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage,
  Button,
  ScrollView
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Table, Row, Rows } from 'react-native-table-component'

import NavigationService from '../helpers/NavigationService';
import { numberFormat } from "../helpers/NumberFormat";
import BaseStyle from "./../style/BaseStyle"

import TransactionAPI from "./../api/transaction"

class DetailTransaction extends Component {

  constructor() {
    super()

    this.state = {
      contactTransactions: [],
      userId: "",
      totalDebit: 0,
      totalCredit: 0,
      totalTransaction: 0,
      tableHead: [],
      tableData: [

      ],
    }
  }

  componentDidMount() {

    const transactionApi = new TransactionAPI()

    const { navigation } = this.props
    const params = this.props.navigation.state.params

    this.setState({
      userId: params.userId
    })

    transactionApi.getTransactionByContact(params)
      .then(res => {


        const dtHeader = ["Total"]
        const dtTable = []

        res.data.map((item) => {
          var row = []

          if (item.type === "debit") {
            row.push(item.description, "", numberFormat(item.amount))

            this.setState({
              totalDebit: this.state.totalDebit + item.amount,
              totalTransaction: this.state.totalTransaction + item.amount
            })
          } else {
            row.push(item.description, numberFormat(item.amount), "")
            this.setState({
              totalCredit: this.state.totalCredit + item.amount,
              totalTransaction: this.state.totalTransaction - item.amount

            })
          }


          dtTable.push(row)
        })

        dtHeader.push(`Anda Berikan \n ${numberFormat(this.state.totalCredit)}`, `Anda Dapatkan \n ${numberFormat(this.state.totalDebit)}`)
        this.setState({
          contactTransactions: this.state.contactTransactions.concat(res.data),
          tableHead: this.state.tableHead.concat(dtHeader),
          tableData: this.state.tableData.concat(dtTable),

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

    var dataTransaction = <View style={BaseStyle.blmWrap}>
      <Text style={BaseStyle.blmAdaText}>Belum Anda Transaksi</Text>
    </View>

    if (this.state.contactTransactions.length > 0) {
      dataTransaction = <ScrollView ><Table>
        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
        {
          this.state.tableData.map((rowData, index) => {
            return <Row
              key={index}
              data={rowData}
              textStyle={{ textAlign: "left", borderRightColor: "#f3f3f3", borderRightWidth: 3, paddingLeft: 5 }}
              style={[{ backgroundColor: 'white', minHeight: 20, alignItems: 'center', paddingLeft: 5, paddingTop: 8, paddingBottom: 8 }, index % 2 && { backgroundColor: "#F7F6E7", minHeight: 20, alignItems: 'center', paddingLeft: 5, paddingTop: 8, paddingBottom: 8 }]}
            ></Row>
          })
        }
        {/* <Rows data={state.tableData} textStyle={styles.text} style={ styles.Rows }/> */}
      </Table></ScrollView>

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
          <Text>Total : {numberFormat(this.state.totalTransaction)} </Text>
          <Text>Pengingat : - </Text>
        </View>

        {dataTransaction}

        <View style={BaseStyle.btnWrap}>

          <TouchableNativeFeedback onPress={() => {
            NavigationService.navigate("AddTransactions", {

              transactionType: "credit",
              name: params.name,
              phoneNumber: params.phoneNumber,
              contactInitial: params.contactInitial,
              contactId: params.contactId,
              userId: this.state.userId,
              totalTransaction: params.totalTransaction
            })
          }}>
            <View style={BaseStyle.btnBerikan}><Text style={BaseStyle.btnText}>ANDA BERIKAN</Text></View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => {
            NavigationService.navigate("AddTransactions", {
              transactionType: "debit",
              name: params.name,
              phoneNumber: params.phoneNumber,
              contactInitial: params.contactInitial,
              contactId: params.contactId,
              userId: params.userId,
              totalTransaction: params.totalTransaction,
              userId: this.state.userId
            })
          }}>
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

  head: { height: 50, backgroundColor: '#f1f8ff', paddingLeft: 5 },
  text: { paddingLeft: 5, textAlign: "left" },
  Rows: {

    borderBottomColor: "white",
    backgroundColor: "white",
    borderRightColor: "black"
  }

})
