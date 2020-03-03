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

import { timeInfo, TimeDiff } from "../helpers/TimeFormat"

import BaseStyle from "./../style/BaseStyle"

import ButtonFilter from '../components/ButtonFilter'
// import { confirmOTP, loginSuccess } from '../store/actions/user'
import { connect } from 'react-redux'
import SearchBar from 'react-native-searchbar'
import { getStatusBarHeight } from "react-native-status-bar-height"

// import {SelectContact} from 'react-native-select-contact'


const filterList = [{
  id: 'all',
  name: 'Semua'
},{
  id: 'paidOff',
  name: 'Lunas'
},{
  id: 'credit',
  name: 'Berikan'
},{
  id: 'debit',
  name: 'Dapatkan'
}]

class Kontak extends Component {

  /*
  * phoneNumber: '',
  userName: '',
  bookName: '',
  bookType: '',
  bookId: '',
  id: '',
  token: '',
  isNew: true,
  isLoggedIn: false,
  * */
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      contacts: [],
      searchContacts: [],
      userId: props.user.id,
      bookName: props.user.bookName,
      bookId: props.user.bookId,
      token: props.user.token,
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
      statusBarHeight: 0,
      // screenWidth: Dimensions.get('window').width,
    }

    this.searchBar = null
    this.getContacts = this.getContacts.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.getSWpeopleApi = this.getSWpeopleApi.bind(this)
    this.getPhoneNumber = this.getPhoneNumber.bind(this)
    this.showContact = this.showContact.bind(this)

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  async showContact() {

    console.log("token showContact => ", this.state.token)

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
            userId: this.state.userId,

            bookId: this.state.bookId,
            token: this.state.token,
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
    const newHeight = getStatusBarHeight() || 32
    this.setState({
      statusBarHeight: newHeight
    })

    this.getContacts()
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
    const token = this.state.token

    const params = { bookId, filter, sort, token }

    contactApi.getContacts(params)
      .then(res => {
        console.log('res contact: ', res)

        const data = res.data.data
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
            updatedAt: TimeDiff(item.created_at) // hasil join dari trx
          })
        })

        _this.setState({
          contacts: this.state.contacts.concat(newData),
          searchContacts: this.state.contacts.concat(newData),

        }, function () {
          //console.log("contact => ", this.state.contacts)
        })



      })
      .catch(err => {
        console.log('error contact', err)
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

  handlerSearchBar = values => {
    // console.log("Values: ", values)
    this.setState({
      searchContacts: values
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
      <View style={{ flex: 1, marginTop: this.state.statusBarHeight}}>

        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={this.state.contacts}
          handleResults={(results) => this.handlerSearchBar(results)}
          onBack={() => NavigationService.navigate('Home')}
          placeholder={'Cari'}
          showOnLoad={true}
          allDataOnEmptySearch={true}
        />

        <FlatList
          data={this.state.searchContacts}
          scrollEnabled={true}
          renderItem={({ item, index }) => {
            //console.log("item ==> ", item, "state ==> ", this.state)
            return (
              <TouchableNativeFeedback onPress={() => {
                NavigationService.navigate("DetailTransaction", {

                  name: item.contactName,
                  phoneNumber: item.phoneNumber,
                  contactInitial: item.contactInitial,
                  contactId: item.id,
                  userId: this.state.userId,
                  totalTransaction: item.trxValue,
                  token:this.state.token

                })
              }}>
                <View>
                  <ContactCard {...item} />
                </View>
              </TouchableNativeFeedback>

            )
          }}
          keyExtractor={item => item.id}
          style={[styles.contactList, {marginTop: this.state.statusBarHeight+40}]}
        />
      </View>
    )
  }

}

// export default Kontak
function mapStateToProps (state) {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Kontak)

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
