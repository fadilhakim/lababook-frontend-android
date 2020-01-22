import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, FlatList, ListItem } from "react-native"
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Input, Icon, Item } from "native-base"
import NavigationService from '../helpers/NavigationService';

import BaseStyle from "../style/BaseStyle"
// import { SafeAreaView } from 'react-navigation';

class SelectContact extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contacts: [],
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
            contacts: this.state.contacts.concat(newData)
        })
        // for(i = 0; i < newData.length; i++) {
        //     console.log("===>", newData[i])
        // }



    }


    handleSearchInput(val) {

        console.log(val)

        // this.setState({
        //     searchInput: val
        // }, () => {
        //     // const contacts = this.state.contacts

        //     // contacts.map(item => {
        //     //     if (item.name.include(val) || item.phoneNumber.include(val)) {
        //     //         return item
        //     //     }
        //     // })
        // })
    }

    render() {

        const { navigation } = this.props
        const params = navigation.state.params

        console.log(this.state.contacts.length, " contacts")

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
                <View style={{ marginTop: 20 }}>

                    <Item>
                        <Input
                            style={{ paddingLeft: 10, fontSize: 12 }}
                            placeholder="Search Contact ..."
                            onKeyUp={(event) => { this.handleSearchInput(event.target.value) }}
                        >
                            <Icon active name='search' />
                        </Input>
                    </Item>


                </View>


                <FlatList
                    data={this.state.contacts}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableNativeFeedback onPress={() => { }}>
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
                    keyExtractor={item => { item.lookupKey }}

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