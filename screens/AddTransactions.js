import React,{ Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage,
  Share
} from 'react-native'
import {
  Container, Header, Content, Form, Item, Input, Label , Left, Body, Right, Button, Icon, Title, Subtitle
} from 'native-base'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import NavigationService from '../helpers/NavigationService';
import BaseStyle from "./../style/BaseStyle"

import * as Font from 'expo-font'

Font.loadAsync({
  
  "Roboto_medium": require('../assets/fonts/Roboto-Medium.ttf')
})

class DetailTransaction extends Component {

  constructor(props) {
    super(props)

    this.state = {
      input:{
        amount:0,
        description:"",
        date:"",
        transactionType:""
      }
    }

    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.addTransaction = this.addTransaction.bind(this)
  }

  componentDidMount() {

    const params = this.props.navigation.state.params
    const trxType = params.transactionType

    alert( trxType )

    this.setState((prevState) => ({
      input:{
        ...prevState.input,
        transactionType:trxType
      }
    }))
  }

  handleAmountChange(value) {
    this.setState((prevState) => ({
      input:{
        ...prevState.input,
        amount:value
      }
    }))
    //console.log( " handle ===> ",this.state.input.amount )
  }

  handleDescriptionChange(value) {
    this.setState((prevState) => ({
      input:{
        ...prevState.input,
        description:value
      }
        
    }))
  }

  handleDateChange(value) {
    this.setState((prevState) => ({
        input:{
          ...prevState.input,
          date:value
        }    
    }))
  }

  addTransaction() {

  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Aan Wiguna ini utang kamu',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { navigation } = this.props

    const signOut = () => {
      AsyncStorage.removeItem('userToken')
        .then(() => navigation.navigate('AuthLoading'))
    }

    return (
      <Container style={BaseStyle.container}>
          <Header style={styles.headerRed}>
            <Left>
            <TouchableNativeFeedback onPress={() => {  navigation.goBack() }}>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </TouchableNativeFeedback>
            </Left>
            <Body>
              <Title style={BaseStyle.fixTitle}>Anda Berikan</Title>
              <Subtitle style={BaseStyle.fixSubtitle}>Aan Siguna</Subtitle>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='trash' />
              </Button>
              <Button onPress={ () => { this.onShare() }} transparent>
                <Icon name='share' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Form style={BaseStyle.formTransaction}>
              <Item style={BaseStyle.inputItem}>
                <Icon style={BaseStyle.inputIcon} active name='md-pricetag' />
                <Input placeholder="Jumlah" onChangeText={(val) => { this.handleAmountChange(val) }} />
              </Item>
              <Item style={BaseStyle.inputItem}>
                <Icon style={BaseStyle.inputIcon} active name='md-text' />
                <Input placeholder="Keterangan" onChangeText={(val) => { this.handleDescriptionChange(val) }} />
              </Item>
              <Item style={BaseStyle.inputItem}>
                <Icon style={BaseStyle.inputIcon} style={{color : '#aaa'}} active name='ios-calendar' />
                <Input placeholder="Tanggal Transaksi" onChangeText={(val) => { this.handleDateChange(val) }} />
              </Item>
              <Item style={BaseStyle.inputItem}>
                <Icon style={BaseStyle.inputIcon} active name='ios-camera' />
                <Input placeholder="Lampiran Gambar" />
              </Item>
  
            </Form>
            <Text>{ JSON.stringify( this.state.input )}</Text>
          </Content>
            <View style={BaseStyle.btnWrap}>
  
              <TouchableNativeFeedback onPress={() => {  NavigationService.navigate("Home") }}>
                <View style={styles.btnBerikan}><Text style={BaseStyle.btnText}>SIMPAN TRANSAKSI</Text></View>
              </TouchableNativeFeedback>
  
            </View>
        </Container>
    )

  }
  
}

export default DetailTransaction

const styles = StyleSheet.create({
  
  headerRed : {
    backgroundColor : '#ce4165',
    height : 85,
    paddingTop:15
  },
  btnBerikan : {
    marginRight:10,
    marginLeft:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ce4165',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff',
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})