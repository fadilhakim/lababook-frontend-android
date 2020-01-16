import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Font from 'expo-font'

Font.loadAsync({
  NexaBold: require('../assets/fonts/NexaBold.otf'),
  NexaLight: require('../assets/fonts/NexaLight.otf'),
  "RobotoMono-Light": require('../assets/fonts/RobotoMono-Light.ttf')
})

function NameIcon(props) {
  const { contactInitial } = props

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {contactInitial}
      </Text>
    </View>
  )
}

export default NameIcon

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    maxWidth: 60,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 2,
    backgroundColor: '#eb5789',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 35,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'RobotoMono-Light'
  }
})
