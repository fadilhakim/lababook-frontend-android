import React,{ Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  FlatList,
 
  Button
} from 'react-native'

import {
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons'

import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'
import axios from "axios"

import ContactCard from '../components/ContactCard'
import NavigationService from '../helpers/NavigationService';

import ContactAPI from "../api/contact"

import { API_URL } from "react-native-dotenv"

import Modal from "react-native-modal";

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
        console.log(`${ API_URL } => `,data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

class Kontak extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      contacts:[],
      userId:1, // sementara
      bookId:1, // sementara
      contactInput:{
        name:"",
        phoneNumber:"",
        userId:"",
        bookId:""
      }
    }

    this.getContacts = this.getContacts.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.getSWpeopleApi = this.getSWpeopleApi.bind(this)
   
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount(){
    
   this.getContacts()
   //this.getSWpeopleApi()
   
  }

  getSWpeopleApi() {
   

    const testget = axios.get("https://swapi.co/api/people/1",{
      headers: {
          'Content-Type': 'application/json'
      }
    })

    testget.then(res => {
      console.log("Star Wars => ",res.data)
    })
  }

  getContacts() {
    const contactApi = new ContactAPI()

    const _this = this

    const bookId = this.state.bookId

    contactApi.getContacts(bookId)
    .then(res => {

      const data = res.data
      const newData = []

      data.map(item => {
         newData.push({
          id: item.id,
          contactName: item.name,
          contactInitial: item.name[0],
          trxType: 'debit', // hasil join
          trxValue: '2.000.000', // hasil join 
          updatedAt: '3 hari lalu' // hasil join dari trx
        })
      })

      _this.setState({
        contacts: this.state.contacts.concat( newData )
      },function(){
        console.log("contact => ",this.state.contacts)
      })

     
     
    })
    .catch(err => {
      alert(`${ API_URL } => ${err} => bookId:${ bookId }`)
    })
  }

  render() {

    // const data = [{
    
    //   id: 1,
    //   contactName: "Juleha",
    //   contactInitial: "J",
    //   trxType: 'debit',
    //   trxValue: '2.000.000',
    //   updatedAt: '3 hari lalu',
    //   key:"4ururozl"
    // }]

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <View style={styles.personBg}>
              <MaterialIcons name='person' size={32} color='white'/>
            </View>
            <Text style={{ fontSize: 16 }}>
              Anda Berikan: <Text style={{ color: '#ce4165' }}>Rp. 2.000.000</Text>
              {'\n'}
              Anda Dapatkan: <Text style={{ color: '#7dd220' }}>Rp. 3.000.000</Text>
            </Text>
          </View>
  
          <View style={styles.topBarRight}>
            <TouchableWithoutFeedback onPress={() => {this.toggleModal()}} >
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
            data={ this.state.contacts }
            scrollEnabled={true}
            renderItem={({ item, index }) => { 
              return(
                <TouchableNativeFeedback onPress={() => {  NavigationService.navigate("DetailTransaction") }}>
                  <View>
                    <ContactCard {...item} key={index}/>
                  </View>
                </TouchableNativeFeedback>
                
              )
            }}
            keyExtractor={item => item.id}
            style={styles.contactList}
          />
  
        {/* <TouchableNativeFeedback onPress={() => {  NavigationService.navigate("Test") }}>
            <Text> Test Page </Text>
        </TouchableNativeFeedback> */}

        <Modal
         style={BaseStyle.halfModal} 
         isVisible={this.state.isModalVisible}
         animationIn = 'slideInUp'
         animationOut ='slideOutDown'
         >
          <View style={BaseStyle.modalContent}>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={() => {this.toggleModal()}} />
          </View>
        </Modal>

        <TouchableWithoutFeedback onPress={() => showContact()}>
          <View style={styles.addContactBtn}>
            <AntDesign name='plus' size={24} style={{color:'#fff', fontWeight:'bold'}}/>
            <Text style={styles.addContactBtnText}>
             Tambah Kontak
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
 
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
    color:'#fff',
    position:'absolute',
    borderRadius: 6,
    backgroundColor:'#1a1a1a',
    left:-100,
    padding:5
  },
  inputItem : {
  	marginRight: 10,
  	marginBottom : 20
  },

  inputIcon : {
  	color : '#aaa'
  },

  fixTitle : {
  	fontWeight : 'bold'
  },

  fixSubtitle : {
  	fontStyle : "italic"
  }
})
