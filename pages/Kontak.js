import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native'
import {
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons'

function Kontak () {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <View style={styles.personBg}>
          <MaterialIcons
            name='person'
            size={32}
            color='white'
          />
        </View>
        <Text style={{ fontSize: 16 }}>
          Anda Berikan: <Text style={{ color: 'red' }}>Rp. 2.000.000</Text>
          {'\n'}
          Anda Dapatkan: <Text style={{ color: 'green' }}>Rp. 3.000.000</Text>
        </Text>
        <TouchableNativeFeedback
          onPress={() => console.log('filter')}
        >
          <MaterialIcons
            name='filter-list'
            size={32}
            color='#444'
            style={styles.filter}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => console.log('pdf')}
        >
          <AntDesign
            name='pdffile1'
            size={32}
            color='#444'
            style={styles.pdf}
          />
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default Kontak

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 10,
    borderBottomColor: '#bbb',
    paddingBottom: 6
  },
  personBg: {
    backgroundColor: '#444',
    padding: 6,
    borderRadius: 25,
    marginLeft: 13,
    marginRight: 8
  },
  filter: {
    position: 'absolute',
    right: 65,
    top: 5
  },
  pdf: {
    position: 'absolute',
    right: 20,
    top: 5
  }
})
