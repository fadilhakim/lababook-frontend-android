import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
  Button,
  TextInput,
} from 'react-native'
import {
  Content, Icon, Picker, Form, Label, Item
} from 'native-base'

import {
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons'
import Modal from "react-native-modal";

import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'
import axios from "axios"

import ContactCard from '../components/ContactCard'
// import SelectContact from "./components/SelectContact"
import NavigationService from '../helpers/NavigationService';
import { numberFormat } from "../helpers/NumberFormat";

import ContactAPI from "../api/contact"

import { API_URL } from "react-native-dotenv"

import { timeInfo } from "../helpers/TimeFormat"

import BaseStyle from "./../style/BaseStyle"

import ButtonFilter from '../components/ButtonFilter'

// import {SelectContact} from 'react-native-select-contact'

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

        //alert("you have "+data.length+" contacts ")
        NavigationService.navigate("SelectContact", {
          contacts: data
        })
        // screen select contact
        //console.log(`${API_URL} => `, data)
      } else {
        alert("you have no contacts")
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
      contacts: [],
      userId: 1, // sementara
      bookId: 1, // sementara
      contactInput: {
        name: "",
        phoneNumber: "",
        userId: "",
        bookId: ""
      },
      sort: "",
      filter: "",
      totalCredit: 0,
      totalDebit: 0,
      // screenWidth: Dimensions.get('window').width,
    }

    this.getContacts = this.getContacts.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.getSWpeopleApi = this.getSWpeopleApi.bind(this)
    this.getPhoneNumber = this.getPhoneNumber.bind(this)

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  getPhoneNumber() {
    return SelectContact.openContactSelection()
      .then(selection => {
        if (!selection) {
          return null;
        }

        let { contact, selectedPhone } = selection;
        console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
        return selectedPhone.number;
      })
      .catch(err => {
        alert("err => ", err)
      });
  }



  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount() {

    this.getContacts()
    //this.getSWpeopleApi()

  }

  getSWpeopleApi() {


    const testget = axios.get("https://swapi.co/api/people/1", {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    testget.then(res => {
      console.log("Star Wars => ", res.data)
    })
  }

  getContacts() {
    const contactApi = new ContactAPI()

    const _this = this

    this.setState({
      contacts: [],
      totalCredit: 0,
      totalDebit: 0
    })
    const bookId = this.state.bookId
    const filter = this.state.filter
    const sort = this.state.sort

    const params = { bookId, filter, sort }

    contactApi.getContacts(params)
      .then(res => {

        const data = res.data
        const newData = []

        data.map(item => {

          var trxType = "credit"

          if (item.totalTransaction > 0) {
            trxType = "debit"
          }

          _this.setState({
            totalCredit: this.state.totalCredit + item.totalCredit,
            totalDebit: this.state.totalDebit + item.totalDebit,
          })

          newData.push({
            id: item.id,
            contactName: item.name,
            contactInitial: item.name[0],
            phoneNumber: item.phoneNumber,
            trxType: trxType, // hasil join
            trxValue: numberFormat(item.totalTransaction), // hasil join
            updatedAt: timeInfo(item.created_at) // hasil join dari trx
          })
        })

        _this.setState({
          contacts: this.state.contacts.concat(newData),

        }, function () {
          //console.log("contact => ", this.state.contacts)
        })



      })
      .catch(err => {
        alert(`${API_URL} => ${err} => bookId:${bookId}`)
      })
  }

  selectedButtonStyle = (value) => {
    if(this.state.filter == value) {
      return {
        backgroundColor: '#7dd220',
        borderColor: '#7dd220',
        borderWidth: 1,
      }
    }else{
      return {}
    }
  }

  selectedTextStyle = (value) => {
    if(this.state.filter == value) {
      return {
        fontWeight: 'bold',
        color: '#fff',
      }
    }else{
      return {}
    }
  }

  handleFilterChange(value) {
    this.setState({
      filter: value
    }, () => {
      this.getContacts()
    });
  }

  handleSortChange(value) {
    this.setState({
      sort: value
    }, () => {
      this.getContacts()
    });
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
              <MaterialIcons name='person' size={32} color='white' />
            </View>
            <Text style={{ fontSize: 16 }}>
              Anda Berikan: <Text style={{ color: '#ce4165' }}> {numberFormat(this.state.totalCredit)} </Text>
              {'\n'}
              Anda Dapatkan: <Text style={{ color: '#7dd220' }}> {numberFormat(this.state.totalDebit)} </Text>
            </Text>
          </View>

          <View style={styles.topBarRight}>
            <TouchableWithoutFeedback onPress={() => { this.toggleModal() }} >
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
          data={this.state.contacts}
          scrollEnabled={true}
          renderItem={({ item, index }) => {
            return (
              <TouchableNativeFeedback onPress={() => {
                NavigationService.navigate("DetailTransaction", {

                  name: item.contactName,
                  phoneNumber: item.phoneNumber,
                  contactInitial: item.contactInitial,
                  contactId: item.id,
                  userId: this.state.userId,
                  totalTransaction: item.trxValue

                })
              }}>
                <View>
                  <ContactCard {...item} />
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
          onBackButtonPress={() => { this.toggleModal() }}
          onBackdropPress={() => { this.toggleModal() }}
          // swipeDirection={['up', 'left', 'right', 'down']}
          // animationIn='slideInUp'
          // animationOut='slideOutDown'
          // onModalShow={() => setTimeout(() => this.toggleModal(), 2000)}
          avoidKeyboard={true}
        >
              <View style={BaseStyle.modalContent}>
                <View style={BaseStyle.rowFilterModal}>
                  <View style={BaseStyle.fieldSortContainerStyleModal}>
                    <Text style={BaseStyle.labelStyleModal}>Urutkan</Text>
                  </View>
                  <View style={BaseStyle.listContainerStyleModal}>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Urutkan dari"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.sort}
                        onValueChange={this.handleSortChange.bind(this)}
                      >
                        <Picker.Item label="Terbaru" value="newest" />
                        <Picker.Item label="Terlama" value="oldest" />
                        <Picker.Item label="Terbanyak" value="key2" />
                        <Picker.Item label="Nama A-Z" value="ascName" />
                      </Picker>
                    </Item>
                  </View>
                </View>
                <View style={BaseStyle.rowFilterModal}>
                  <View style={BaseStyle.fieldFilterContainerStyleModal}>
                    <Text style={BaseStyle.labelStyleModal}>Filter</Text>
                  </View>
                  <View style={BaseStyle.filterContainerStyleModal}>
                    <ButtonFilter
                      selectedButtonStyle={(value) => this.selectedButtonStyle(value)}
                      handleFilterChange={(value) => this.handleFilterChange(value)}
                      selectedTextStyle={(value) => this.selectedTextStyle(value)}
                      name='Semua'
                      id='Semua'
                    />
                    <ButtonFilter
                      selectedButtonStyle={(value) => this.selectedButtonStyle(value)}
                      handleFilterChange={(value) => this.handleFilterChange(value)}
                      selectedTextStyle={(value) => this.selectedTextStyle(value)}
                      name='Lunas'
                      id='paidOff'
                    />
                    <ButtonFilter
                      selectedButtonStyle={(value) => this.selectedButtonStyle(value)}
                      handleFilterChange={(value) => this.handleFilterChange(value)}
                      selectedTextStyle={(value) => this.selectedTextStyle(value)}
                      name='Berikan'
                      id='credit'
                    />
                    <ButtonFilter
                      selectedButtonStyle={(value) => this.selectedButtonStyle(value)}
                      handleFilterChange={(value) => this.handleFilterChange(value)}
                      selectedTextStyle={(value) => this.selectedTextStyle(value)}
                      name='Dapatkan'
                      id='debit'
                    />
                  </View>
                </View>
              </View>
        </Modal>

        <TouchableWithoutFeedback onPress={() => showContact()}>
          <View style={styles.addContactBtn}>
            <AntDesign name='plus' size={24} style={{ color: '#fff', fontWeight: 'bold' }} />
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
    color: '#fff',
    position: 'absolute',
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
    left: -100,
    padding: 5
  },
  inputItem: {
    marginRight: 10,
    marginBottom: 20
  },

  inputIcon: {
    color: '#aaa'
  },

  fixTitle: {
    fontWeight: 'bold'
  },

  fixSubtitle: {
    fontStyle: "italic"
  }
})
