import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage
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

function DetailTransaction (props) {
  const { navigation } = props

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
            <Title>Anda Berikan</Title>
            <Subtitle>Aan Siguna</Subtitle>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='trash' />
            </Button>
            <Button transparent>
              <Icon name='share' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form style={BaseStyle.formTransaction}>
            <Item stackedLabel>
              <Label>Jumlah</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Keterangan</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Tanggal Transaksi</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Lampirkan Gambar</Label>
              <Input />
            </Item>

          </Form>
        </Content>
          <View style={BaseStyle.btnWrap}>

            <TouchableNativeFeedback onPress={() => {  NavigationService.navigate("Home") }}>
              <View style={styles.btnBerikan}><Text style={BaseStyle.btnText}>SIMPAN TRANSAKSI</Text></View>
            </TouchableNativeFeedback>

          </View>
      </Container>
  )
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