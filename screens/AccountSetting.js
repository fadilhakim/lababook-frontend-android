import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

function AccountSetting (props) {
  const { navigation } = props

 
  return (
    <View style={styles.container}>
      <Text style={{ color: '#000'}}>
        Account Setting
      </Text>
    </View>
  )
}

export default AccountSetting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  }
})
