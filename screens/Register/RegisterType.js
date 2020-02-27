import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native'

import {
  TYPE_1,
  TYPE_2,
  TYPE_3,
  TYPE_4
} from '../../utils/images'
import { textExtraProps as tProps } from '../../config/system'
import { connect } from 'react-redux'
import { updateBookType } from '../../store/actions/user'
// import { textExtraProps as tProps } from '../../config/system'
// import { Image } from 'react-native-web'


const dataType = [{
    image: TYPE_1,
    text: 'Toko Kelontong/ Mini Market'
  },{
    image: TYPE_2,
    text: 'Kafe/Restoran'
  },{
    image: TYPE_3,
    text: 'Bengkel/ Reparasi'
  }, {
    image: TYPE_4,
    text: 'Lainnya'
}]

class RegisterType extends Component {
  state = {
    selected: null,
    selectedType: '',
    user: this.props.user,
    // updateBookType: this.props.updateBookType
  }
  navigation  = this.props.navigation
  updateBookType  = this.props.updateBookType
  // navigation = this.props.navigation

  selectedStyle = (index) => {
    if(this.state.selected == index) {
      return {
        borderColor: '#4b34bb',
        borderWidth: 1,
      }
    }else{
      return {}
    }
  }

  selectBookType = (index) => {
    this.setState({
      selected: index,
      selectedType: dataType[index].text
    })
  }

  nextStep = () => {
    // console.log("this.state.selected: ", this.state.selected)
    // console.log("this.state.selectedType: ", this.state.selectedType)
    if(this.state.selectedType){
      // console.log("this.state.user: ", this.state.user)
      this.updateBookType(this.state.selectedType)
      this.navigation.navigate('Register02')

      // console.log("this.state.user: ", this.state.user)
    }else{
      Alert.alert("Perhatian!", 'Harap pilih salah satu jenis usaha Anda!')
    }
  }

  render () {
    // console.log("this.state.selected: ", this.state.selected)
    // console.log("this.state.user: ", this.state.user)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Pilih Jenis Usaha Anda :
        </Text>
        <View style={styles.containerRow}>
          <View style={styles.containerIcon}>
            <TouchableNativeFeedback
              onPress={() => this.selectBookType(0)}
            >
              <View style={[styles.iconBox, this.selectedStyle(0)]}>
                <Image
                  source={dataType[0].image}
                />
                <Text style={[styles.iconText, styles.iconText0]}>
                  {dataType[0].text}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.containerIcon}>
            <TouchableNativeFeedback
              onPress={() => this.selectBookType(1)}
            >
              <View style={[styles.iconBox, styles.iconBox1, this.selectedStyle(1)]}>
                <Image
                  source={dataType[1].image}
                />
                <Text style={[styles.iconText, styles.iconText1]}>
                  {dataType[1].text}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.containerIcon}>
            <TouchableNativeFeedback
              onPress={() => this.selectBookType(2)}
            >
              <View style={[styles.iconBox, this.selectedStyle(2)]}>
                <Image
                  source={dataType[2].image}
                />
                <Text style={[styles.iconText, styles.iconText2]}>
                  {dataType[2].text}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.containerIcon}>
            <TouchableNativeFeedback
              onPress={() => this.selectBookType(3)}
            >
              <View style={[styles.iconBox, styles.iconBox3, this.selectedStyle(3)]}>
                <Image
                  source={dataType[3].image}
                />
                <Text style={[styles.iconText, styles.iconText3]}>
                  {dataType[3].text}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            onPress={() => this.nextStep()}
          >
            <View style={styles.buttonNext}>
              <Text {...tProps} style={styles.buttonText}>Selanjutnya</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    loading: state.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateBookType: (bookType) => dispatch(updateBookType(bookType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterType)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'top',
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: 'lightgray',
  },
  title: {
    marginTop: '20%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'cyan',
    maxHeight: 150
  },
  containerIcon: {
    height: 130,
    width: 130,
    margin: 10,
  },
  iconBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingLeft: 50,
    // paddingRight: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 13
    },
  },
  iconText: {
    textAlign: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    marginTop: 10
  },
  iconBox1: {
    paddingTop: 7,
  },
  iconBox3: {
    paddingTop: 30,
    // backgroundColor: 'red'
  },
  iconText0: {
    width: 110,
    // backgroundColor: 'red'
  },
  iconText1: {
    marginTop: 15
  },
  iconText2: {
    // backgroundColor: 'red',
    width: 80
  },
  iconText3: {
    // backgroundColor: 'red',
    marginTop: 25
  },
  buttonNext: {
    backgroundColor: '#2a2cbb',
    // padding: 12,
    width: 270,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20
  }
})
