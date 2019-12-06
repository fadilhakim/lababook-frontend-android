import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import NameIcon from './NameIcon'
import { textExtraProps as tProps } from '../config/system'

function ContactCard (props) {
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
            <AntDesign name='clockcircleo' size={12} style={{ marginTop: 3 }}/>
            <Text {...tProps}> {updatedAt}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contactRight}>
        <Text {...tProps} style={trxType === 'debit' ? styles.contactRightTopLent : styles.contactRightTopPaid}>
          {
            trxType === 'debit'
              ? 'Anda berikan'
              : 'Anda dapatkan'
          }
        </Text>
        <Text {...tProps} style={trxType === 'debit' ? styles.contactRightBottomLent : styles.contactRightBottomPaid}>
          Rp. {trxValue}
        </Text>
      </View>
    </View>
  )

  return (
    <View>
      { contactName ? Component : <View style={styles.contact}></View>}
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
    minHeight: 50
  },
  contactLeft: {
    flexDirection: 'row'
  },
  contactLeftText: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  contactLeftTopText: {
    fontSize: 18
  },
  contactLeftBottom: {
    flexDirection: 'row'
  },
  contactRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
  },
  contactRightTopPaid: {
    color: 'green'
  },
  contactRightTopLent: {
    color: 'red'
  },
  contactRightBottomPaid: {
    fontSize: 18,
    color: 'green'
  },
  contactRightBottomLent: {
    fontSize: 18,
    color: 'red'
  }
})
