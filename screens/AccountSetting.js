import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  AsyncStorage,FormLabel,FormInput, FormValidationMessage
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import AccForm from '../components/AccForm'

function AccountSetting (props) {
  const { navigation } = props

  const { goBack } = props.navigation;
    return (
      <View style={styles.container}>
        <AccForm />
      </View>
    );
 
}

export default AccountSetting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft : 60,
    paddingRight : 60
  }
})
