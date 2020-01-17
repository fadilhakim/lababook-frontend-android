import React, { Component } from 'react';

import { View, Text } from "react-native"

import TestStyle from "./../style/TestStyle"

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

                { dtList }
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