import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function NameIcon (props) {
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

    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: '#aaa',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 35,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'RobotoMonoLight'
  }
})
