import React from 'react'
import { View, Text } from 'react-native'

import { textExtraProps as tProps } from '../config/system'

export default function Pengingat () {
  return (
    <View>
      <Text {...tProps}>Pengingat</Text>
    </View>
  )
}
