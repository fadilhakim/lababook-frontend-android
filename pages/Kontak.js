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
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'

async function showContact () {
  try {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers
        ]
      })

      if (data.length > 0) {
        console.log(data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

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
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                backgroundColor: '#aaa',
                paddingLeft: 14,
                paddingRight: 14,
                paddingBottom: 3,
                margin: 5,
                marginLeft: 15,
                marginRight: 10,
                borderRadius: 100
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 36
                }}
              >
                A
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>Aan Siguna</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign
                  name='clockcircleo'
                  size={12}
                  style={{ marginTop: 3 }}
                />
                <Text> 3 Hari lalu</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 20
            }}
          >
            <Text style={{ color: 'red' }}>
              Anda berikan
            </Text>
            <Text style={{ fontSize: 18, color: 'red' }}>
              Rp. 2.000.000
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                backgroundColor: '#aaa',
                paddingLeft: 14,
                paddingRight: 14,
                paddingBottom: 3,
                margin: 5,
                marginLeft: 15,
                marginRight: 10,
                borderRadius: 100
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 36
                }}
              >
                S
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>Sibutar butar</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign
                  name='clockcircleo'
                  size={12}
                  style={{ marginTop: 3 }}
                />
                <Text> 4 Hari lalu</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 20
            }}
          >
            <Text style={{ color: 'green' }}>
              Anda dapatkan
            </Text>
            <Text style={{ fontSize: 18, color: 'green' }}>
              Rp. 2.000.000
            </Text>
          </View>
        </View>
      </View>

      <TouchableNativeFeedback
        onPress={() => showContact()}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 999,
            right: 25,
            bottom: 25,
            borderWidth: 3,
            borderColor: '#444',
            borderRadius: 50,
            padding: 8
          }}
        >
          <AntDesign
            name='plus'
            size={22}
          />
          <Text
            style={{
              fontSize: 20
            }}
          >
            Tambah Kontak
          </Text>
        </View>
      </TouchableNativeFeedback>
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
