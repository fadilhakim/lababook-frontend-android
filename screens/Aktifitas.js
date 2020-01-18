import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { DatePicker } from "native-base"

import { textExtraProps as tProps } from '../config/system'

export default class Aktifitas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Total \n 5 Transaksi', 'Anda Berikan \n Rp.1.200.000', 'Anda Dapatkan \n Rp.1.200.000'],
      tableData: [
        ['hutang makan bakso', '200.000', ''],
        ['dio puitang', '', '200.000'],
        ['jotaro hutang', '', '3.000.000'],
        ['haula piutang', '100.000', '']
      ]
    }
  }

  render() {
    const state = this.state
    return (
      <View>
        
        <View>
          <Text style={{ fontSize: 16 }}>
              Aktifitas : 
              
          </Text>
          <TextInput></TextInput>
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
              placeHolderText="start date"
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
                placeHolderText="end date"
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
        <Table>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          {
            this.state.tableData.map((rowData, index) => {
              return <Row
                key={index}
                data={rowData}
                textStyle={{ textAlign: "left", borderRightColor: "#f3f3f3", borderRightWidth: 3, paddingLeft: 5 }}
                style={[{ backgroundColor: 'white', minHeight: 20, alignItems: 'center', paddingLeft: 5 }, index % 2 && { backgroundColor: "#F7F6E7", minHeight: 20, alignItems: 'center', paddingLeft: 5 }]}
              ></Row>
            })
          }
          {/* <Rows data={state.tableData} textStyle={styles.text} style={ styles.Rows }/> */}
        </Table>

      </View>
    )
  }

}

const styles = StyleSheet.create({

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
  text: { paddingLeft: 5, textAlign: "left", fontWeight: 'bold' },
  Rows: {

    borderBottomColor: "white",
    backgroundColor: "white",
    borderRightColor: "black"
  }
});
