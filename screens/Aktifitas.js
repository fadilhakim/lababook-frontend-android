import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

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
        <Text> Aktifitas :  </Text>
        <TextInput></TextInput>
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 50, backgroundColor: '#f1f8ff', paddingLeft: 5 },
  text: { paddingLeft: 5, textAlign: "left", fontWeight: 'bold' },
  Rows: {

    borderBottomColor: "white",
    backgroundColor: "white",
    borderRightColor: "black"
  }
});
