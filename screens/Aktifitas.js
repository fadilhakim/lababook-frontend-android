import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback,ScrollView } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { DatePicker, Content, Icon, Picker, Form } from "native-base"

import TransactionAPI from "./../api/transaction"
import {numberFormat} from "../helpers/NumberFormat"

import { textExtraProps as tProps } from '../config/system'

export default class Aktifitas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId:1, // sementara
      userId:1, // sementara,
      totalDebit:0,
      totalCredit:0,
      tableHead: [],
      tableData: [
   
      ],
      selected : "key1"
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }  

  componentDidMount() {

    const { navigation } = this.props
    const params = this.props.navigation.state.params
    const _this = this

    const objTrx = new TransactionAPI() 

    bookId = this.state.bookId 

    objTrx.getTransactionByBook(bookId)
    .then(res => {

      const resultdata = []

      res.data.contacts.map(contact => {
          contact.transactions.map(transaction => {
            resultdata.push(transaction)
          })
      })

      const dtHeader= ["Total"]
      const dtTable = []

      resultdata.map((item) => {
        var row = []

        if( item.type === "debit") {
          row.push(item.description,numberFormat(item.amount),"")
          
          this.setState({
            totalDebit: this.state.totalDebit + item.amount,
            totalTransaction: this.state.totalTransaction + item.amount
          })
        } else{
          row.push(item.description,"",numberFormat(item.amount))
          this.setState({
            totalCredit: this.state.totalCredit + item.amount,
            totalTransaction: this.state.totalTransaction + item.amount
          })
        }
        
        dtTable.push(row)
      })

      dtHeader.push(`Anda Berikan \n ${ numberFormat(this.state.totalDebit)}`, `Anda Dapatkan \n ${numberFormat(this.state.totalCredit)}`)
      this.setState({
      
        tableHead:this.state.tableHead.concat(dtHeader),
        tableData:this.state.tableData.concat(dtTable)
      })
      
    })
    .catch(err => {
      console.log( err )
    })
  }

  render() {
    const state = this.state
    return (
      <View>
        
     
        <View style  = {styles.topAct}>
          <Text style={{ fontSize: 16, paddingLeft : 8 , fontWeight : 'bold'}}>
              Aktifitas : 
          </Text>
          <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ posisiton : 'absolute', left : 10, top : -14  }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Terbaru" value="key0" />
              <Picker.Item label="Terlama" value="key1" />
              <Picker.Item label="Terbanyak" value="key2" />
              <Picker.Item label="A-Z" value="key3" />
            </Picker>
        </View>
     
        <View style={styles.topBar}>
          
          <View style={styles.topBarLeft}>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              // minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date()}
              locale={"id"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="start date :"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#2a2c7b" }}
              onDateChange={ () => {console.log("date change") }}
              disabled={false}
              />
          
          </View>

          <View style={styles.topBarRight}>
          
              <View style={styles.topBarRightPdf}>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  // minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date()}
                  locale={"id"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="end date :"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#2a2c7b" }}
                  onDateChange={ () => {console.log("date change") }}
                  disabled={false}
                />
              </View>
            
          </View>
        </View>


     
            {/* <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text> */}
        <View>
            <ScrollView >
              <Table style={{marginBottom:100}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                {
                  this.state.tableData.map((rowData, index) => {
                    return <Row
                      key={index}
                      data={rowData}
                      textStyle={{ textAlign: "left", borderRightColor: "#f3f3f3", borderRightWidth: 3, paddingLeft: 5 }}
                      style={[{ backgroundColor: 'white', minHeight: 20, alignItems: 'center', paddingLeft: 5, paddingTop : 8, paddingBottom : 8 }, index % 2 && { backgroundColor: "#F7F6E7", minHeight: 20, alignItems: 'center', paddingLeft: 5, paddingTop : 8, paddingBottom : 8 }]}
                    ></Row>
                  })
                }
                {/* <Rows data={state.tableData} textStyle={styles.text} style={ styles.Rows }/> */}
              </Table>
            </ScrollView>
        </View>
       
      </View>
    )
  }

}

const styles = StyleSheet.create({
  topAct : {
    flexDirection : 'row',
    justifyContent: 'flex-end'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#f3f3f3',
    paddingBottom: 6
  },
  topBarLeft: {
    flexDirection: 'row'
  },
  topBarRight: {
    flexDirection: 'row'
  },

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 50, backgroundColor: '#f1f8ff', paddingLeft: 5 },
  text: { paddingLeft: 5, textAlign: "left"},
  Rows: {

    borderBottomColor: "white",
    backgroundColor: "white",
    borderRightColor: "black"
  }
});
