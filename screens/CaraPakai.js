import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  WebView
} from 'react-native'


function CaraPakai (props) {
  const { navigation } = props

  const { goBack } = props.navigation;
    return (
      <View style={styles.container}>
        <WebView
         source = {{ uri:
         'https://www.youtube.com/watch?v=aCe0h50hyCc' }}
         />
      </View>
    );
 
}

export default CaraPakai

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

  }
})
