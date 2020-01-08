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
        ['hutang makan bakso', '200000', ''],
        ['dio puitang', '', '200000'],
        ['gegege no kitaro', '', '3000000'],
        ['haula piutang', '100000', '']
      ]
    }
  }
  
  render(){
    const state = this.state
    return (
      <View>
        
        <Table borderStyle={{borderWidth: 0}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            this.state.tableData.map((rowData, index) => {
              return <Row 
                key={index}
                data={ rowData }
                textStyle={ {textAlign:"right" }}
                style={[{backgroundColor:'white', height:40, padding:10 }, index%2 && { backgroundColor:"#F7F6E7", height:40, padding:10} ]}
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
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign:"right" },
  Rows: {
   
    borderBottomColor:"white",
    backgroundColor:"white",
    borderRightColor:"black"
  }
});
