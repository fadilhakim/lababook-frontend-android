import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage,
  Share,
  Alert
} from 'react-native'
import {
  Container, Header, Content, Form, Item, Input, Label, Left, Body,
  Right, Button, Icon, Title, Subtitle, DatePicker
} from 'native-base'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import NavigationService from '../helpers/NavigationService';
import BaseStyle from "./../style/BaseStyle"

import TransactionAPI from "./../api/transaction"

import * as Font from 'expo-font'

Font.loadAsync({

  "Roboto_medium": require('../assets/fonts/Roboto-Medium.ttf')
})

class DetailTransaction extends Component {

  constructor(props) {
    super(props)

    this.state = {
      input: {
        amount: 0,
        description: "",
        // date:"",
        dueDate: "",
        transactionType: "",
        contactId: "",
        userId: ""
      }
    }

    this.handleAmountChange = this.handleAmountChange.bind(this)
    //this.handleDateChange = this.handleDateChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.addTransaction = this.addTransaction.bind(this)
    this.onShare = this.onShare.bind(this)
  }

  componentDidMount() {

    const params = this.props.navigation.state.params
    const trxType = params.transactionType

    this.setState((prevState) => ({
      input: {
        ...prevState.input,
        transactionType: trxType,
        userId: params.userId,
        contactId: params.contactId
      }
    }))
  }

  handleAmountChange(value) {
    this.setState((prevState) => ({
      input: {
        ...prevState.input,
        amount: value
      }
    }))
    //console.log( " handle ===> ",this.state.input.amount )
  }

  handleDescriptionChange(value) {
    this.setState((prevState) => ({
      input: {
        ...prevState.input,
        description: value
      }

    }))
  }

  handleDueDateChange(value) {

    const thisDate = new Date(value)
    const year = thisDate.getFullYear()
    const month = thisDate.getMonth() + 1
    const date = thisDate.getDate()

    this.setState((prevState) => ({
      input: {
        ...prevState.input,
        dueDate: `${year}-${month}-${date}`
      }
    }))
  }

  addTransaction() {

    const transactionApi = new TransactionAPI()
    const input = this.state.input
    const params = this.props.navigation.state.params

    const data = {
      type: input.transactionType,
      amount: input.amount,
      description: input.description,
      userId: input.userId,
      contactId: input.contactId,
      dueDate: input.dueDate
      //date:input.date
    }

    console.log("addTrx data => ", data)

    if (!data.amount || !data.userId || !data.contactId) {

      console.log(" failed ==> ", data)
      Alert.alert(
        'Tambah transaksi gagal',
        `lengkapi semua data`,
        [
          {
            text: 'Ok', onPress: () => {

            }
          },
        ],
        { cancelable: false },
      );

      return false
    }

    return transactionApi.createTransactions(data)
      .then(res => {

        // Works on both Android and iOS
        Alert.alert(
          'Tambah Transaksi berhasil',
          `anda berhasil menambah transaksi`,
          [
            {
              text: 'Ok', onPress: () => {
                NavigationService.navigate("DetailTransaction", {

                  name: params.name,
                  phoneNumber: params.phoneNumber,
                  contactInitial: params.contactInitial,
                  contactId: params.contactId,
                  userId: this.state.input.userId,
                  totalTransaction: params.totalTransaction

                })
              }
            },
          ],
          { cancelable: false },
        );
      })
      .catch(err => {
        console.log(err)
        Alert.alert(
          'Error',
          `terjadi kesalahan`,
          [
            {
              text: 'Ok', onPress: () => {

              }
            },
          ],
          { cancelable: false },
        )

      })

  }

  onShare = async () => {

    const params = this.props.navigation.state.params
    var trxType = params.transactionType === "debit" ? "hutang" : "piutang"

    try {
      const result = await Share.share({
        message:
          params.name + ' ini ' + trxType + ' kamu',
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

  signOut = () => {
    AsyncStorage.removeItem('userToken')
      .then(() => navigation.navigate('AuthLoading'))
  }

  render() {
    const { navigation } = this.props
    const params = this.props.navigation.state.params

    var dueDateElement = <Item style={BaseStyle.inputItem}>
      <Icon style={BaseStyle.inputIcon} style={{ color: '#aaa' }} active name='ios-calendar' />
      <DatePicker
        defaultDate={new Date()}
        minimumDate={new Date()}

        locale={"id"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"}
        placeHolderText="Tenggat Waktu"
        format="YYYY-MM-DD"
        placeHolderTextStyle={{ color: "#2a2c7b" }}
        onDateChange={(value) => { this.handleDueDateChange(value) }}
        disabled={false}
      />

    </Item>

    if (params.transactionType === "debit") {
      dueDateElement = <Text>{""}</Text>
    }

    var headerBackground = styles.headerRed
    var btnSave = styles.btnBerikan

    if (params.transactionType === "debit") {
      headerBackground = styles.headerGreen
      btnSave = styles.btnDapatkan
    }


    return (
      <Container style={BaseStyle.container}>
        <Header style={headerBackground}>
          <Left>
            <TouchableNativeFeedback onPress={() => {
              //console.log('BAAAACK')
              NavigationService.navigate("DetailTransaction", {
                name: params.name,
                phoneNumber: params.phoneNumber,
                contactInitial: params.contactInitial,
                contactId: params.contactId,
                userId: this.state.userId,
                totalTransaction: params.totalTransaction
              })
            }}>
              <View>
                <Ionicons
                  name='md-arrow-back'
                  size={30}
                  color='#fff'
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableNativeFeedback>
          </Left>
          <Body>
            <Title style={BaseStyle.fixTitle}>{params.transactionType === "debit" ? "Anda Dapatkan" : "Anda Berikan"}</Title>
            <Subtitle style={BaseStyle.fixSubtitle}>{params.name}</Subtitle>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='trash' />
            </Button>
            <Button onPress={() => { this.onShare() }} transparent>
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
              <Icon style={BaseStyle.inputIcon} style={{ color: '#aaa' }} active name='ios-calendar' />
              <Input placeholder="Tanggal Transaksi" disabled value={new Date().toISOString().split('T')[0]} />

            </Item>
            {dueDateElement}
            <Item style={BaseStyle.inputItem}>
              <Icon style={BaseStyle.inputIcon} active name='ios-camera' />
              <Input placeholder="Lampiran Gambar" />
            </Item>

            <Text>{this.state.input.dueDate}</Text>

          </Form>

        </Content>
        <View style={BaseStyle.btnWrap}>

          <TouchableNativeFeedback onPress={() => { this.addTransaction() }}>
            <View style={btnSave}>
              <Text style={BaseStyle.btnText}>SIMPAN TRANSAKSI</Text>
            </View>
          </TouchableNativeFeedback>

        </View>
      </Container>
    )

  }

}

export default DetailTransaction

const styles = StyleSheet.create({

  headerRed: {
    backgroundColor: '#ce4165',
    height: 85,
    paddingTop: 15
  },
  headerGreen: {
    backgroundColor: '#7dd220',
    height: 85,
    paddingTop: 15
  },
  btnBerikan: {
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ce4165',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnDapatkan: {
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#7dd220',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
