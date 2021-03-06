import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import NameIcon from './NameIcon'
import { textExtraProps as tProps } from '../config/system'

function ContactCard(props) {
  const {
    contactName,
    contactInitial,
    trxValue,
    trxType,
    updatedAt
  } = props

  var textDesc = ""
  if (trxValue === 0) {
    textDesc = ""
  } else {
    textDesc = trxType === 'debit' ? 'Anda dapatkan' : 'Anda berikan'

  }

  const Component = (
    <View style={styles.contact}>
      <View style={styles.contactLeft}>
        <NameIcon contactInitial={contactInitial} />
        <View style={styles.contactLeftText}>
          <View>
            <Text {...tProps} style={styles.contactLeftTopText}>
              {contactName}
            </Text>
          </View>
          <View style={styles.contactLeftBottom}>
            <AntDesign name='clockcircleo' size={12} style={{ marginTop: 3 }} />
            <Text {...tProps}> {updatedAt}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contactRight}>
        <Text {...tProps} style={trxType === 'debit' ? styles.contactRightTopPaid : styles.contactRightTopLent}>
          {textDesc}
        </Text>
        <Text {...tProps} style={trxType === 'debit' ? styles.contactRightBottomPaid : styles.contactRightBottomLent}>
          {trxValue}
        </Text>
      </View>
    </View>
  )

  return (
    <View>
      {contactName ? Component : <View style={styles.contact}></View>}
    </View>
  )
}

export default ContactCard

const styles = StyleSheet.create({
  contact: {
    paddingBottom: 5,
    paddingTop: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    minHeight: 20
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
    color: '#000',
    fontWeight: 'bold'

  },
  contactLeftBottom: {
    flexDirection: 'row',
    fontSize: 13,
    color: '#ddd'
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
