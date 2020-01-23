import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, FlatList, ListItem } from "react-native"
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Input, Icon, Item } from "native-base"
import NavigationService from '../helpers/NavigationService';

import BaseStyle from "../style/BaseStyle"
// import { SafeAreaView } from 'react-navigation';

class SelectContact extends Component {

    constructor() {
        super()

        this.state = {
            contacts: [],
            contactBackup:[],
            searchInput: ""
        }

        //this.searchContact = this.searchContact.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
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
                    name: item.name,
                    phoneNumber: item.phoneNumbers[0].number.toString(),
                    lookupKey: item.lookupKey
                })
            }


        })

        this.setState({
            contacts: this.state.contacts.concat(newData),
            contactBackup: this.state.contactBackup.concat( newData )
        })
        // for(i = 0; i < newData.length; i++) {
        //     console.log("===>", newData[i])
        // }



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
            if (data[i].name.toLowerCase().includes(searchText) ) {
                newContacts.push( data[i] )
               
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
                    keyExtractor={(item,index) => { item.lookupKey }}
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableNativeFeedback key={index} onPress={() => { NavigationService.navigate(" ",{ item }) }}>
                                <View key={index}>
                                    <Item
                                        style={style.listContact}
                                        // title={`${item.name}`}
                                        // subtitle={`${item.phoneNumber}`}
                                        key={index}

                                    >
                                        <View style={style.circleName}><Text style={{color:'#fff', fontWeight : 'bold', fontSize : 20}}>{item.name[0]}</Text></View>
                                        <View><Text style={{fontSize:16}}>{item.name}</Text></View>
  
                                    </Item>
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
        fontWeight : 'bold'
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
    }
})