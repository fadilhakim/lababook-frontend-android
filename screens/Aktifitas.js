import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text, TouchableWithoutFeedback, ActivityIndicator,
  SafeAreaView, ScrollView, Alert
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import DatePicker from 'react-native-datepicker'
// import DateTimePickerModal from '@react-native-community/datetimepicker'
// import DateTimePickerModal from "@react-native-community/react-native-datetimepicker"

import TransactionAPI from "./../api/transaction"
import { numberFormat } from "../helpers/NumberFormat"
import { TimeFull, FormatDateFilter, LookUpDate } from '../helpers/TimeFormat'
import LoadingModal from '../helpers/LoadingModal'
import { Icon, Item, Picker } from 'native-base'
import { connect } from 'react-redux'

class Aktifitas extends Component {
  state = {
    bookId: this.props.user.bookId,
    token: this.props.user.token,
    dataTable: null,
    totalDebit: 0,
    totalCredit: 0,
    totalData: 0,
    startDate: new Date(),
    endDate: new Date(),
    selected: 'today'
  }
  objTrx = new TransactionAPI()

  parseData = (dataRows) => {
    let totalDebit = 0
    let totalCredit = 0
    const newRows = dataRows.map((data, index) => {
      let amountDebit = ''
      let amountCredit = ''
      if (data.type === 'debit'){
        totalDebit += data.amount
        amountDebit = numberFormat(data.amount)
      }else{
        totalCredit += data.amount
        amountCredit = numberFormat(data.amount)
      }

      return (
        <View style={styles.rowTotal} key={index}>
          <View style={[styles.row, styles.totalFirst]}>
            <Text>{data.contactName}</Text>
            <Text style={styles.subTitle}>{ TimeFull(data.trx_created_at) }</Text>
          </View>
          <View style={[styles.row, styles.totalCenter]}>
            <Text style={[styles.titleRowDebit]}>{ amountDebit }</Text>
          </View>
          <View style={[styles.row, styles.totalLast]}>
            <Text style={[styles.titleRowCredit]}>{ amountCredit }</Text>
          </View>
        </View>
      )
    })
    this.setState({
      totalDebit: totalDebit,
      totalCredit: totalCredit,
      totalData: dataRows.length,
      dataTable: newRows,
    })
  }

  getData = () => {
    const param = {
      bookId: this.state.bookId, // untuk test = 1
      sort: 'newest', // newest
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      token: this.state.token, // untuk test = 'WUB2eHaJlzSKpdOQdP3RHj14FT1ggX6dqW4wBxs1o0EIdFr7LD8mub6cAFy8VCjAXmyAdGva5sERdVY2'
    }
    console.log('param aktivity: ', param)
    this.objTrx.getTransactionByBook(param)
      .then(result => {
        console.log("result aktivity: ", result)
        // console.log("result aktivity: ", result.data.status_message)
        if(result.data.status_message == "OK"){
          // this.setState({
          //   dataTable: result.data.data
          // })
          this.parseData(result.data.data)
        }else {
          Alert.alert('Perhatian!', 'Terjadi kesalahan saat mengambil data!')
        }
      })
      .catch(err => {
        Alert.alert('Error!', `Terjadi kesalahan saat mengambil data!`)
      })
  }

  handleSelectChange = async (val) => {
    switch ( val ) {
      case 'all':
        await this.setState({
          startDate: '1991-01-01',
          endDate: '2992-12-31',
          selected: val,
        })
        break
      case 'today':
        await this.setState({
          startDate: new Date(),
          endDate: new Date(),
          selected: val,
        })
        break
      case 'lastweek':
        await this.setState({
          startDate: LookUpDate(new Date(), val),
          endDate: new Date(),
          selected: val,
        })
        break
      case 'lastmonth':
        await this.setState({
          startDate: LookUpDate(new Date(), val),
          endDate: new Date(),
          selected: val,
        })
        break
      default:
        this.setState({
          selected: val,
        })
        break
    }
    this.getData()
  }

  handleDateChange = (someDate, type) => {
    console.log(someDate)
    if (type == 'startDate') {
      this.setState({
        startDate: someDate,
        selected: 'other'
      })
    } else {
      this.setState({
        endDate: someDate,
        selected: 'other'
      })
    }
    this.getData()
  }

  onExportPDF = () => {

  }

  componentDidMount () {
    this.getData()
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<ActivityIndicator color='#0000ff' size="large" style={styles.loadingIndicator} />*/}
        <View style={styles.topBar}>
          <View style={[styles.topBarLeft, {paddingLeft: 12, paddingRight: 20}]}>
            <View style={{paddingBottom: 5, height: 40, flexDirection: 'row', borderBottomColor: '#f3f3f3', borderBottomWidth: 2,}}>
              <View style={{justifyContent: 'flex-end', paddingBottom: 3,}}>
                <Text style={{fontSize: 16}}>Aktifitas : </Text>
              </View>
              <View style={{flex: 1,}}>
                <Item picker style={{borderColor: "transparent"}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined, height: 40, fontSize: 12, border: 0 }}
                    placeholder="Urutkan dari"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected}
                    onValueChange={this.handleSelectChange.bind(this)}
                  >
                    <Picker.Item label="Semua" value="all" />
                    <Picker.Item label="Hari ini" value="today" />
                    <Picker.Item label="Minggu lalu" value="lastweek" />
                    <Picker.Item label="Bulan lalu" value="lastmonth" />
                    <Picker.Item label="Lainnya" value="other" />
                  </Picker>
                </Item>
              </View>
            </View>
            <View style={{paddingTop: 5, flexDirection: 'row'}}>
              {/*<View style={{flex: 1, paddingBottom: 5, marginRight: 20, borderBottomColor: '#f3f3f3', borderBottomWidth: 2, }}>*/}
              {/*  <MaterialIcons name='date-range' size={14} />*/}
              {/*</View>*/}
              <View style={{flex: 1, flexDirection: 'row', marginRight: 40, alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 5, paddingTop: 5, borderBottomColor: '#f3f3f3', borderBottomWidth: 2, }}>
                <MaterialIcons name='date-range' size={14} />
                <View style={{ position: 'absolute', marginLeft: 20}} >
                  <Text>{FormatDateFilter(this.state.startDate).toString()}</Text>
                </View>
                <DatePicker date={this.state.startDate}
                            showIcon={false}
                            placeholder=""
                            mode="date"
                            format="YYYY-MM-DD"
                            maxDate={this.state.endDate}
                            customStyles={{
                              dateInput: {
                                borderWidth: 0,
                              },
                              dateText: {
                                marginTop: 0,
                                color: 'white',
                                fontSize: 12,
                              },
                              placeholderText: {
                                marginTop: 0,
                                // right: 10,
                                color: 'white',
                                fontSize: 12,
                              }
                            }
                            }
                            onDateChange={date => this.handleDateChange(date, 'startDate')}
                            placeholderTextColor="white"
                            underlineColorAndroid={'rgba(0,0,0,0)'}
                            style={{
                              height: 20,
                              // width: 170,
                              paddingLeft: 0,
                              backgroundColor: 'rgba(0,0,0,0)'
                            }}
                />

              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 5, paddingTop: 5, borderBottomColor: '#f3f3f3', borderBottomWidth: 2, }}>
                <MaterialIcons name='date-range' size={14} />
                <View style={{ position: 'absolute', marginLeft: 20}} >
                  <Text>{FormatDateFilter(this.state.endDate).toString()}</Text>
                </View>
                <DatePicker date={this.state.endDate}
                            showIcon={false}
                            placeholder=""
                            mode="date"
                            format="YYYY-MM-DD"
                            minDate={this.state.startDate}
                            customStyles={{
                              dateInput: {
                                borderWidth: 0,
                                // height: 50,
                                // width: 170,
                                // right: 30,
                              },
                              dateText: {
                                marginTop: 0,
                                color: 'white',
                                fontSize: 12,
                              },
                              placeholderText: {
                                marginTop: 0,
                                // right: 10,
                                color: 'white',
                                fontSize: 12,
                              }
                            }
                            }
                            onDateChange={date => this.handleDateChange(date, 'endDate')}
                            placeholderTextColor="white"
                            underlineColorAndroid={'rgba(0,0,0,0)'}
                            style={{
                              height: 20,
                              // width: 170,
                              paddingLeft: 0,
                              backgroundColor: 'rgba(0,0,0,0)'
                            }}
                />

              </View>
            </View>
          </View>

          <TouchableWithoutFeedback>
            <View style={styles.pdfContainer}>
              <MaterialIcons name='picture-as-pdf' size={27} style={styles.pdf} onPress={this.onExportPDF} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.rowHeader}>
          <View style={[styles.header, styles.headerFirst]}>
            <Text style={styles.titleText}>Total</Text>
          </View>
          <View style={[styles.header, styles.headerCenter]}>
            <Text style={[styles.titleText, styles.textCenter]}>Anda Berikan</Text>
          </View>
          <View style={[styles.header, styles.headerLast]}>
            <Text style={[styles.titleText, styles.textCenter]}>Anda Dapatkan</Text>
          </View>
        </View>
        <View style={styles.rowTotal}>
          <View style={[styles.total, styles.totalFirst]}>
            <Text style={[styles.titleText]}>{ this.state.totalData } Transaksi</Text>
          </View>
          <View style={[styles.total, styles.totalCenter]}>
            <Text style={[styles.titleText, styles.titleRowDebit]}>{ numberFormat(this.state.totalDebit) }</Text>
          </View>
          <View style={[styles.total, styles.totalLast]}>
            <Text style={[styles.titleText, styles.titleRowCredit]}>{ numberFormat(this.state.totalCredit) }</Text>
          </View>
        </View>

        <ScrollView>
          {/*<View style={styles.loadingContainer}>*/}
          {/*  <ActivityIndicator color='#000' size="large" style={styles.loadingIndicator} />*/}
          {/*</View>*/}
          { this.state.dataTable }
        </ScrollView>
      </View>
  )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Aktifitas)

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {}
    }),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    // alignContent: 'center',
    // backgroundColor: 'red'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
    marginTop: 20,
    position: 'absolute'
  },
  loadingIndicator: {
    // position: 'absolute',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    margin: 'auto'
  },
  topBar: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#f3f3f3',
    paddingBottom: 6,
    // marginBottom: 5,
  },
  topBarLeft: {
    flex: 1,
    flexDirection: 'column',
  },
  textHeader: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 15,
  },
  textColorHeader: {
    color: '#ce4165',
  },
  boldText: {
    fontWeight: 'bold',
  },
  pdfContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  pdf: {
    color: '#aaa',
    paddingRight: 20,
  },

  rowHeader: {
    // flex: 1,
    // height: 40,
    flexDirection: 'row',
    // alignItems: 'stretch',
    // // alignContent: 'stretch',
    // justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  header: {
    // flex: 1,
    // marginTop: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 2,
    borderColor: '#f3f3f3'
  },
  headerFirst: {
    flex: 1,
  },
  headerCenter: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 130,
    textAlign: 'center',
  },
  headerLast: {
    width: 130,
    textAlign: 'center',
  },
  rowTotal: {
    // flex: 1,
    // height: 40,
    flexDirection: 'row',
    // alignItems: 'stretch',
    // // alignContent: 'stretch',
    // justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  totalFirst: {
    flex: 1
  },
  total: {
    // marginTop: 0,
    backgroundColor: '#eee',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    borderTopWidth: 0,
  },
  totalCenter: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 130,
  },
  totalLast: {
    width: 130,
  },
  titleText: {
    fontWeight: 'bold',
  },
  titleRowCredit: {
    color: '#0a0',
    textAlign: 'right',
  },
  titleRowDebit: {
    color: '#a00',
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  rowFirst: {
    flex: 1,
  },
  row: {
    // marginTop: 0,
    padding: 10,
    borderWidth: 2,
    borderColor: '#f3f3f3',
    borderTopWidth: 0,
  },
  rowCenter: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 160,
  },
  rowLast: {
    width: 160,
  },
  subTitle: {
    color: '#aaa',
    fontSize: 12,
  }
});
