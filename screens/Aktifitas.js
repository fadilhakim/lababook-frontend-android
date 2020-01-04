import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Table, Row, Rows} from 'react-native-table-component'

import { textExtraProps as tProps } from '../config/system'

export default class Aktifitas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Total \n Rp.1200000', 'Anda Berikan \n Rp.1200000', 'Anda Dapatkan \n Rp.1200000'],
      tableData: [
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c']
      ]
    }
  }
  
  render(){
    const state = this.state
    return (
      <View>
        <Text {...tProps}>Aktifitas</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
       
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
