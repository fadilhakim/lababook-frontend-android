import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  FlatList,
  TouchableHighlight
} from 'react-native'
import {
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'
// import { withNavigation } from 'react-navigation';

import ContactCard from '../components/ContactCard'

import NavigationService from '../helpers/NavigationService';

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
    contactName: 'Dimas Arya',
    contactInitial: 'D',
    trxType: 'debit',
    trxValue: '700.000',
    updatedAt: '1 hari lalu'
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

async function showContact() {
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

function Kontak(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.personBg}>
            <MaterialIcons name='person' size={32} color='white' />
          </View>

          <Text style={{ fontSize: 16 }}>
            Anda Berikan: <Text style={{ color: '#ce4165' }}>Rp. 2.000.000</Text>
            {'\n'}
            Anda Dapatkan: <Text style={{ color: '#7dd220' }}>Rp. 3.000.000</Text>
          </Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableWithoutFeedback>
            <View style={styles.topBarRightFilter}>
              <MaterialIcons name='filter-list' size={27} color='#2a2c7b' style={styles.filter} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.topBarRightPdf}>
              <AntDesign name='pdffile1' size={27} color='#2a2c7b' style={styles.pdf} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <FlatList
        data={data}
        scrollEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <TouchableNativeFeedback onPress={() => { NavigationService.navigate("DetailTransaction") }}>
              <View>
                <ContactCard {...item} key={index} />
              </View>
            </TouchableNativeFeedback>

          )
        }}
        keyExtractor={item => item.id}
        style={styles.contactList}
      />

      <TouchableNativeFeedback onPress={() => { NavigationService.navigate("Test") }}>
        <Text> Test Page </Text>
      </TouchableNativeFeedback>

      <TouchableWithoutFeedback onPress={() => showContact()}>
        <View style={styles.addContactBtn}>
          <AntDesign name='plus' size={24} style={{ color: '#fff', fontWeight: 'bold' }} />
          <Text style={styles.addContactBtnText}>
            Tambah Kontak
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View >
  )
}

export default Kontak

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
    backgroundColor: '#eb5789',
    padding: 6,
    borderRadius: 25,
    marginLeft: 13,
    marginRight: 8
  },
  filter: {
    color: '#2a2c7b'
  },
  pdf: {
    color: '#2a2c7b'
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
    borderRadius: 100,
    padding: 15,
    backgroundColor: '#2a2c7b',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  contactList: {
    marginTop: 5,
    paddingBottom: 100
  },
  addContactBtnText: {
    fontSize: 12,
    color: '#fff',
    position: 'absolute',
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
    left: -100,
    padding: 5
  }
})
