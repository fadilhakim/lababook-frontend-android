import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, FlatList, ActivityIndicator , Alert } from "react-native"
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Input, Icon, Item } from "native-base"
import NavigationService from '../helpers/NavigationService';

import BaseStyle from "../style/BaseStyle"

// import { SafeAreaView } from 'react-navigation';

import ContactAPI from "./../api/contact"

class SelectContact extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contacts: [],
            contactBackup:[],
            searchInput: "",
            userId: 0,
            bookId:0,
            token: "",
        }

        //this.searchContact = this.searchContact.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.addContact = this.addContact.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props
        const params = navigation.state.params
        const data = params.contacts
        const newData = []

        data.map(item => {

            // const phone =  item.phoneNumbers

            // if(phone.length > 0){

            // } else {
            //     console.log(phone)
            // }
            if (item.phoneNumbers) {
                //console.log("====================",item.phoneNumbers[0].number.toString(), item.name)
                newData.push({
                    id:item.lookupKey,
                    name: item.name,
                    phoneNumber: item.phoneNumbers[0].number.toString(),
                    lookupKey: item.lookupKey
                })
            }


        })

        this.setState({
            contacts: this.state.contacts.concat(newData),
            contactBackup: this.state.contactBackup.concat( newData ),
            bookId:params.bookId,
            userId:params.userId,
            token:params.token
        })
        // for(i = 0; i < newData.length; i++) {
        //     console.log("===>", newData[i])
        // }



    }

    addContact(item) {
        
        const contactApi = new ContactAPI()
        //const confirmation = confirm("Are you sure want to add "+name+" ?")

        console.log("token addContact => ",this.state.token)

        // Works on both Android and iOS
        Alert.alert(
            'Add Contact',
            `Are you sure want to add ${item.name} ?`,
            [
               
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                    const data = {
                        name:item.name,
                        phoneNumber:item.phoneNumber,
                        userId:this.state.userId,
                        bookId:this.state.bookId,
                        token:this.state.token
                        
                    }
            
                    return contactApi.createContact(data)
                    .then( res => {
                        NavigationService.navigate("Home")
                    })
                    .catch( err => {
                        console.log( err )
                    })
                    //alert("Yes Pressed")
                }},
            ],
            {cancelable: false},
        );
    }

    handleSearchInput(val) {

        // console.log(val)

        if(val === "") {
            console.log("input empty")
            return false
        }
        const newContacts = []
      
        data = this.state.contactBackup
        //console.log(data[10])
        searchText = val.trim().toLowerCase()

        for( var i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(searchText) || data[i].phoneNumber.toLowerCase().includes(searchText)) {
                newContacts.push({
                    id:data[i].id,
                    lookupKey:data[i].lookupKey,
                    name:data[i].name,
                    phoneNumber:data[i].phoneNumber

                })
               
            }
        }

        if(newContacts.length > 0) {
            this.setState({
                contacts:newContacts
            })
            //console.log(" =====> ", newContacts.slice(0,2) )
        }
        
    }

    render() {

        const { navigation } = this.props
        const params = navigation.state.params

        //console.log(this.state.contacts.length, " contacts")

        return (
            <View>

                <View style={BaseStyle.headerBlue}>
                    <TouchableNativeFeedback onPress={() => { NavigationService.navigate("Home") }}>
                        <View style={BaseStyle.divBack}>
                            <Ionicons
                                name='md-arrow-back'
                                size={30}
                                color='#fff'
                                style={BaseStyle.arrowBack}
                            />
                        </View>
                    </TouchableNativeFeedback>

                    <Text style={style.headerText}> Select Contact</Text>



                </View>
                <View style={{ marginTop:5 }}>

                    <Item>
                        <Icon active name='search' style={{ marginLeft:15 }} />
                        <Input
                            style={{ paddingLeft: 10, fontSize: 14 }}
                            placeholder="Search Contact ..."
                            
                            onChangeText={(val) => { this.handleSearchInput(val) }}
                        >
                            
                        </Input>
                    </Item>


                </View>


                <FlatList
                    data={this.state.contacts}
                    scrollEnabled={true}
                    keyExtractor={(item,index) =>  index.toString()  }
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableNativeFeedback onPress={ () => { this.addContact(item) }}>
                               <View style={style.listContact}>
                                    <View style={style.circleName}><Text style={{color:'#fff', fontWeight : 'bold', fontSize : 20}}>{item.name[0]}</Text></View>
                                    <View style={{flexDirection:"column"}}>
                                        <View style={style.nameText}><Text style={{fontSize:16}}>{item.name}</Text></View>
                                        <View style={style.phoneNumber}><Text style={{fontSize:11}}>{item.phoneNumber}</Text></View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    }}
                >

                </FlatList>

                {/* <Text>{ JSON.stringify( params.contacts.slice(2) )}</Text> */}

            </View>
        );
    }
}

export default SelectContact;

const style = StyleSheet.create({
    headerText: {
        color: '#fff',
        paddingTop: 20,
        paddingBottom: 1,
        marginLeft: 50,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5
    },
    listContact :  {
        paddingTop:15,
        paddingBottom:15,
        flexDirection : 'row',
        paddingLeft:15,
        fontWeight : 'bold',
        borderBottomColor:"grey",
        borderBottomWidth:1
    
    },
    circleName : {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        backgroundColor: '#eb5789',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#fff',
        height:42,
        width:42,
        textAlign:'center',
        marginRight : 20
    },
    nameText:{
       
        alignSelf:"flex-start"
    },
    phoneText:{
       
        alignSelf:"flex-end"
    }
})