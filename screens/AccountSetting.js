import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

function AccountSetting (props) {
  const { navigation } = props

  const { goBack } = props.navigation;
    return (
      <View>
        <Text style={{ color: '#000', fontSize:30}}>
          Account Setting
        </Text>
        <Text style={{ color: '#000', fontSize:30}}></Text>
        <Button onPress={() => goBack()} title="Go back from this HomeScreen" />
        <Button onPress={() => goBack(null)} title="Go back anywhere" />
        <Button
          onPress={() => goBack('key-123')}
          title="Go back from key-123"
        />
      </View>
    );
 
  // return (
  //   <View style={styles.container}>
  //     <Text style={{ color: '#000', fontSize:30}}>
  //       Account Setting
  //     </Text>
  //   </View>
  // )
}

export default AccountSetting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  }
})
