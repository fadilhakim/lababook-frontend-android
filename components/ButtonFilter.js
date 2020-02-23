import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import * as Font from 'expo-font'
import BaseStyle from '../style/BaseStyle'

function ButtonFilter(props) {
  const { name, id, selectedButtonStyle, handleFilterChange, selectedTextStyle } = props

  return (
    <View style={[BaseStyle.buttonContainerStyleModal, selectedButtonStyle(id)]}>
      <TouchableNativeFeedback onPress={() => handleFilterChange(id)} >
        <Text style={[selectedTextStyle(id)]}>
          {name}
        </Text>
      </TouchableNativeFeedback>
    </View>
  )
}

export default ButtonFilter
