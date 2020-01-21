import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, FlatList, List, ListItem} from "react-native"
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Input, Icon, Item} from "native-base"
import NavigationService from '../helpers/NavigationService';

import BaseStyle from "../style/BaseStyle"
// import { SafeAreaView } from 'react-navigation';

class SelectContact extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            contacts:[],
            searchInput:""
        }

        this.searchContact = this.searchContact.bind(this)
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
            //     newData.push({
            //         name:item.name,
            //         phoneNumber:item.phoneNumbers[0].number,
            //         lookupKey:item.lookupKey
            //     })
            // } else {
            //     console.log(phone)
            // }
            if (item.phoneNumbers) {
                console.log( "item => ", item.phoneNumbers[0].number)
            }
           
           
        })

        // this.setState({
        //     contacts:this.state.contacts.concat( newData )
        // })  
        // console.log("===>", newData)
    }

    searchContact() {
        
    }

    handleSearchInput(val) {
        this.setState({
            searchInput:val
        })
    }

    render() {

        const { navigation } = this.props
        const params = navigation.state.params

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
                <View style={{marginTop:20}}>
                  
                    <Item>
                        <Input 
                            style={{ paddingLeft:10, fontSize:12 }}
                            placeholder="Search Contact ..."
                            onKeyUp={(event) => { this.handleSearchInput(event.target.value) }}
                            >
                            <Icon active name='search' />
                        </Input>
                    </Item>
                   
                
                </View>
                
               
                    <FlatList
                        data={ this.state.contacts }
                        renderItem= {({ item }) => {

                        
                            return (<ListItem
                                roundAvatar
                                title={`${item.name}`}
                                subtitle={`${item.phoneNumbers.number}`}
                                
                            >

                            </ListItem>)
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
    headerText:{
        color : '#fff',
        paddingTop: 20,
        paddingBottom: 1,
        marginLeft : 50,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:5
    }
})