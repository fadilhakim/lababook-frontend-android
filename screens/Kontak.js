import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native'
import {
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'

import { textExtraProps as tProps } from '../config/system'

async function showContact () {
  try {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers
        ]
      })

      if (data.length > 0) {
        console.log(data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function ContactCard (props) {
  const {
    contactName,
    contactInitial,
    trxValue,
    trxType,
    updatedAt
  } = props

  return (
    <View style={styles.contact}>
      <View style={styles.contactLeft}>
        <View style={styles.nameLetter}>
          <Text {...tProps} style={styles.nameLetterText}>
            {contactInitial}
          </Text>
        </View>

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
}

function Kontak () {
  const data = [
    {
      id: '1',
      contactName: 'Aan Siguna',
      contactInitial: 'A',
      trxType: 'debit',
      trxValue: '2.000.000',
      updatedAt: '3 hari lalu'
    },
    {
      id: '2',
      contactName: 'Sibutar Butar',
      contactInitial: 'S',
      trxType: 'credit',
      trxValue: '3.000.000',
      updatedAt: '4 hari lalu'
    },
    {
      id: '3',
      contactName: 'Aan Siguna',
      contactInitial: 'A',
      trxType: 'debit',
      trxValue: '2.000.000',
      updatedAt: '3 hari lalu'
    },
    {
      id: '4',
      contactName: 'Sibutar Butar',
      contactInitial: 'S',
      trxType: 'credit',
      trxValue: '3.000.000',
      updatedAt: '4 hari lalu'
    },
    {
      id: '5',
      contactName: 'Aan Siguna',
      contactInitial: 'A',
      trxType: 'debit',
      trxValue: '2.000.000',
      updatedAt: '3 hari lalu'
    },
    {
      id: '6',
      contactName: 'Sibutar Butar',
      contactInitial: 'S',
      trxType: 'credit',
      trxValue: '3.000.000',
      updatedAt: '4 hari lalu'
    },
    {
      id: '7',
      contactName: 'Aan Siguna',
      contactInitial: 'A',
      trxType: 'debit',
      trxValue: '2.000.000',
      updatedAt: '3 hari lalu'
    },
    {
      id: '8',
      contactName: 'Sibutar Butar',
      contactInitial: 'S',
      trxType: 'credit',
      trxValue: '3.000.000',
      updatedAt: '4 hari lalu'
    },
    {
      id: '9',
      contactName: 'Aan Siguna',
      contactInitial: 'A',
      trxType: 'debit',
      trxValue: '2.000.000',
      updatedAt: '3 hari lalu'
    },
    {
      id: '10',
      contactName: 'Sibutar Butar',
      contactInitial: 'S',
      trxType: 'credit',
      trxValue: '3.000.000',
      updatedAt: '4 hari lalu'
    }
  ]
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.personBg}>
            <MaterialIcons name='person' size={32} color='white'/>
          </View>
          <Text style={{ fontSize: 16 }}>
            Anda Berikan: <Text style={{ color: 'red' }}>Rp. 2.000.000</Text>
            {'\n'}
            Anda Dapatkan: <Text style={{ color: 'green' }}>Rp. 3.000.000</Text>
          </Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableWithoutFeedback>
            <View style={styles.topBarRightFilter}>
              <MaterialIcons name='filter-list' size={32} color='#444' style={styles.filter} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.topBarRightPdf}>
              <AntDesign name='pdffile1' size={32} color='#444' style={styles.pdf} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <FlatList
        data={data}
        scrollEnabled={true}
        renderItem={({ item, index }) => <ContactCard {...item} key={index}/>}
        keyExtractor={item => item.id}
      />

      <TouchableWithoutFeedback onPress={() => showContact()}>
        <View style={styles.addContactBtn}>
          <AntDesign name='plus'size={22}/>
          <Text style={styles.addContactBtnText}>
            Tambah Kontak
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Kontak

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 10,
    borderBottomColor: '#bbb',
    paddingBottom: 6
  },
  topBarLeft: {
    flexDirection: 'row'
  },
  topBarRight: {
    flexDirection: 'row'
  },
  topBarRightFilter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  topBarRightPdf: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 15
  },
  personBg: {
    backgroundColor: '#444',
    padding: 6,
    borderRadius: 25,
    marginLeft: 13,
    marginRight: 8
  },
  contact: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
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
  },
  filter: {
    color: '#444'
  },
  pdf: {
    color: '#444'
  },
  nameLetter: {
    backgroundColor: '#aaa',
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 3,
    margin: 5,
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 100
  },
  nameLetterText: {
    color: 'white',
    fontSize: 36
  },
  addContactBtn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    right: 25,
    bottom: 25,
    borderWidth: 3,
    borderColor: '#444',
    borderRadius: 50,
    padding: 8
  },
  addContactBtnText: {
    fontSize: 20
  }
})
