import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight  } from 'react-native'
import { AntDesign, Ionicons, Foundation, SimpleLineIcons } from '@expo/vector-icons'

import NameIcon from './NameIcon'
import { textExtraProps as tProps } from '../config/system'

function ReminderCard (props) {
  const {
    contactName,
    contactInitial,
    trxValue,
    trxType,
    updatedAt
  } = props


  const Component = (
    <View style={styles.contact}>
      <View style={styles.contactLeft}>
        <NameIcon contactInitial={contactInitial}/>
        <View style={styles.contactLeftText}>
          <View>
            <Text {...tProps} style={styles.contactLeftTopText}>
              {contactName}
            </Text>
          </View>
          <View style={styles.contactLeftBottom}>    
            <Text style={{color:'#ce4165'}}>Rp. 2.100.000 (3 hari yang lalu)</Text>
          </View>
        </View>
      </View>

      <TouchableHighlight>
      <View style={styles.contactRight}>
        <View style={styles.divLogo}>
          <Ionicons
            name='md-call'
            size={17}
            color='#fff'
            style={styles.logoCall}
          />
        </View>
      </View>
      </TouchableHighlight>

      <Modal visible={this.state.isModalVisible}>
         <View>
           <Text>Whatsapp</Text>
           <Text>SMS</Text>
         </View>
      </Modal>
    </View>
  )


  return (
    <View>
      { contactName ? Component : <View style={styles.contact}></View>}
    </View>
  )
}



export default ReminderCard

const styles = StyleSheet.create({
  contact: {
    paddingBottom: 5,
    paddingTop: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    minHeight: 20
  },
  divLogo : {
    height:22,
    width:22,
    borderRadius:100,
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:3,
    paddingTop: 3,
    backgroundColor:'#2a2c7b',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  contactLeft: {
    flexDirection: 'row'
  },
  contactLeftText: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  contactLeftTopText: {
    fontSize: 15,
    color:'#000',
    fontWeight:'bold'

  },
  contactLeftBottom: {
    flexDirection: 'row',
    fontSize:13,
    color:'#ddd'
  },
  contactRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
  },
  contactRightTopPaid: {
    color: '#7dd220'
  },
  contactRightTopLent: {
    color: '#ce4165'
  },
  contactRightBottomPaid: {
    fontSize: 15,
    color: '#7dd220'
  },
  contactRightBottomLent: {
    fontSize: 15,
    color: '#ce4165'
  }
})
