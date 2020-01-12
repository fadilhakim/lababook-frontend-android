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

import ContactCard from '../components/ContactCard'

import { textExtraProps as tProps } from '../config/system'

const dataHariIni = [
  {
    id: '1',
    contactName: 'Aan Siguna',
    contactInitial: 'A',
    trxType: 'debit',
    trxValue: '2.000.000',
    updatedAt: '3 hari lalu'
  },
  {
    id: '4',
    contactName: 'Shasa',
    contactInitial: 'S',
    trxType: 'credit',
    trxValue: '300.000',
    updatedAt: '3 hari lalu'
  }
]

const dataTerlambat = [
  {
    id: '1',
    contactName: 'Amanda Wiguna',
    contactInitial: 'A',
    trxType: 'debit',
    trxValue: '2.000.000',
    updatedAt: '3 hari lalu'
  },
  {
    id: '4',
    contactName: 'Sin Joe',
    contactInitial: 'S',
    trxType: 'credit',
    trxValue: '300.000',
    updatedAt: '3 hari lalu'
  }
]

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

export default function Pengingat () {
  return (
    <View style={{ flex: 1 }}>

      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Text style={{ fontSize: 16 }}>
            <Text>Terlambat:</Text> <Text style={{ color: '#ce4165' }}>2 Pelanggan</Text>
            {'\n'}
           <Text> Hari ini:</Text> <Text style={{ color: '#000' }}>3 Pelanggan</Text>
            {'\n'}
            <Text>Akan Datang:</Text> <Text style={{ color: '#000' }}>5 Pelanggan</Text>
          </Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableWithoutFeedback>
            <View style={styles.topBarRightPdf}>
              <AntDesign name='pdffile1' size={27} color='#aaa' style={styles.pdf} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.borderGray}>
      	<Text>Terlambat</Text>
      </View>

      <FlatList
        data={dataTerlambat}
        scrollEnabled={true}
        renderItem={({ item, index }) => <ContactCard {...item} key={index}/>}
        keyExtractor={item => item.id}
        style={styles.contactList}
      />

      <View style={styles.borderGray}>
      	<Text style={{ fontSize: 12 }}>
      		Hari Ini
      	</Text>
      </View>

      <FlatList
        data={dataHariIni}
        scrollEnabled={true}
        renderItem={({ item, index }) => <ContactCard {...item} key={index}/>}
        keyExtractor={item => item.id}
        style={styles.contactList}
      />
    
    </View>
  )
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
    flexDirection: 'row',
    paddingLeft:15
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
  pdf: {
    color: '#444'
  },
  borderGray: {
    color: '#000',
    backgroundColor:'#f3f3f3',
    paddingBottom:4,
    paddingTop:4,
    paddingLeft:15,
    fontSize:15
  }
})

