import React, { Component } from 'react';

import { View, Text } from "react-native"

import TestStyle from "./../style/TestStyle"

import { API_URL } from "react-native-dotenv"

class Test extends Component {

    render() {

        const dt = ["apple", 'banana', "orange"]

        const dtList = dt.map(item => {
            return (
                <View key={ item }>
                    <Text> { item }</Text>
                </View>
            )
        })

        return (
            <View style={ TestStyle.container }>

                <Text> Test </Text>
                <Text> { API_URL } </Text>

                { dtList }
                <Text> hello </Text>
            </View>
        );
    }
}
// function Test(props) {
//     return(<View>
//         <Text> Hello </Text>
//     </View>)
// }

export default Test;