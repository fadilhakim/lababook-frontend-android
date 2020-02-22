import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Button,
  SectionList,
} from 'react-native'
import { ListItem, ButtonGroup } from 'react-native-elements'

import { Accordion } from "native-base"
import TouchableScale from 'react-native-touchable-scale'
import { API_URL } from "react-native-dotenv"

import {
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons'

import { textExtraProps as tProps } from '../config/system'

import ReminderCard from '../components/ReminderCard'
import { getReminderList } from '../api/reminder'
import { numberFormat } from '../helpers/NumberFormat'
import { TimeDiff } from "../helpers/TimeFormat"
import CallNumber from "../helpers/CallNumber"
import { GetReminderList, UpdateReminderStatusAlarm } from '../api/reminder'

export default class Pengingat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 1, // sementara
      bookId: 1, // sementara
      transactions:[],
      dataReminder: [],
      lengthDataGroup: {
        late: 0,
        current: 0,
        incoming: 0,
      },
      onReceivingData: false,
      statusAlarm: {}
    }
  }

  compareDate = (data1, data2) => {
    let comparison = 0
    if (data1.compareDate > data2.compareDate)
      comparison = 1
    else if (data1.compareDate < data2.compareDate)
      comparison = -1

    return comparison
  }

  parseData = (data) => {
    let late = []
    let current = []
    let incoming = []
    let enabledAlarm = {}
    for (let i=0; i < data.length; i++) {
      const currentData = data[i]

      const { value, status, year, month, date, day } = TimeDiff(currentData.dueDate + '00:00:00', true)
      const newData = {
        trxValue: numberFormat(currentData.trxValue),
        contactName: currentData.contactName,
        phoneNumber: currentData.phoneNumber,
        id: currentData.id,
        dueDate: value,
        fullDueDate: date + ' ' + month + ' ' + year,
        dayDueDate: day,
        compareDate: currentData.dueDate,
        alarmStatus: currentData.statusAlarm,
        groupStatus: status,
      }

      if (status == 'late') {
        late.push(newData)
        late.sort(this.compareDate)
      } else if (status == 'current') {
        current.push(newData)
        current.sort(this.compareDate)
      } else if (status == 'incoming') {
        incoming.push(newData)
        incoming.sort(this.compareDate)
      }

      enabledAlarm[currentData.id] = currentData.statusAlarm
    }

    this.setState({
      statusAlarm: enabledAlarm,
      lengthDataGroup: {
        late: late.length,
        current: current.length,
        incoming: incoming.length,
      }
    })

    return [{
      title: 'Terlambat',
      data: late
    },{
      title: 'Hari Ini',
      data: current
    },{
      title: 'Akan Datang',
      data: incoming
    }]
  }

  getData = () => {
    this.setState({ onReceivingData: true })

    const bookId = this.state.bookId
    const params = {
      bookId
    }
    GetReminderList(params)
      .then(result => {
        const dataReturn = result.data
        // console.log(dataReturn)
        if (dataReturn.status_code === 200){
          this.setState({
            dataReminder: this.parseData(dataReturn.data)
          })
        } else {
          alert(`${API_URL} => 'Internal Server Error!' => bookId:${bookId}`)
        }
      })
      .catch(err => {
        alert(`${API_URL} => ${err} => bookId:${bookId}`)
      })
      .finally(() => this.setState({ onReceivingData: false }))
  }

  onExportPDF = () => {
    console.log('exporting')
  }

  statusAlarm = (idData) => {
    return this.state.statusAlarm[idData] === 'Y' ? { color: '#2a2c7b' } : { color: '#aaa' }
  }

  rightIcon = (item) => {
    if(item.groupStatus !== 'incoming'){
      return (
        <>
          <MaterialIcons name='alarm' size={27}
                         style={[styles.iconButton, this.statusAlarm(item.id)]}
                         onPress={() => this.updateAlarm(item.id)} />
          <MaterialIcons name='phone' size={27}
                         style={styles.iconButton} onPress={() => this.callPerson(item.phoneNumber)} />
        </>
      )
    }
  }

  updateAlarm = (idData) => {
    this.setState({ onReceivingData: true })

    const newAlarmStatus = this.state.statusAlarm[idData] === 'Y' ? 'N' : 'Y'
    const params = {
      trxId: idData,
      statusAlarm: newAlarmStatus
    }
    UpdateReminderStatusAlarm(params)
      .then(result => {

        if (result.status === 200){
          const newAllStatus = {}
          Object.assign(newAllStatus, this.state.statusAlarm, {[idData]: newAlarmStatus})

          this.setState({
            statusAlarm: newAllStatus
          })
        } else {
          alert(`${API_URL} => 'Internal Server Error!' => trxId:${idData}`)
        }
      })
      .catch(err => {
        alert(`${API_URL} => ${err} => trxId:${idData}`)
      })
      .finally(() => this.setState({ onReceivingData: false }))
  }

  callPerson = (phoneNumber) => {
    CallNumber(phoneNumber)
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Text style={styles.textHeader}>
              <Text>Terlambat: </Text>
              <Text style={[styles.textColorHeader, styles.boldText]}>{this.state.lengthDataGroup.late} Pelanggan</Text>
            </Text>

            <Text style={styles.textHeader}>
              <Text>Hari ini: </Text>
              <Text>{this.state.lengthDataGroup.current} Pelanggan</Text>
            </Text>
            {/*<Text style={styles.textHeader}>*/}
            {/*  <Text>Akan Datang: </Text>*/}
            {/*  <Text>{this.state.lengthDataGroup.incoming} Pelanggan</Text>*/}
            {/*</Text>*/}
          </View>

          <TouchableWithoutFeedback>
            <View style={styles.pdfContainer}>
              <MaterialIcons name='picture-as-pdf' size={27} style={styles.pdf} onPress={this.onExportPDF} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <SectionList
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          sections={this.state.dataReminder}
          // data={this.state.dataReminder}
          stickySectionHeadersEnabled={true}
          refreshing={this.state.onReceivingData}
          progressViewOffset={100}
          onRefresh={this.getData}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <ListItem
                // key={item.id}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                title={item.contactName}
                subtitle={item.trxValue + ' (' + item.dueDate + ')'}
                leftAvatar={{ title: item.contactName[0] }}
                // rightAvatar={{ title: item.contactName[0] }}
                titleStyle={{ color: '#000' }}
                rightTitle={item.groupStatus === 'incoming' ? item.fullDueDate : ''}
                rightSubtitle={item.groupStatus === 'incoming' ? item.dayDueDate : ''}
                rightTitleStyle={styles.rightTitleStyle}
                rightSubtitleStyle={styles.rightTitleStyle}
                subtitleStyle={item.groupStatus === 'incoming' ? [styles.rightTitleStyle, { color: '#000' }] : [styles.rightTitleStyle, styles.textColorHeader]}
                // chevron={{ color: 'red' }}
                // checkmark={true}
                rightElement={() => this.rightIcon(item)}
                bottomDivider
              />
            )
          }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#f3f3f3',
    paddingBottom: 6
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
    paddingRight: 25,
  },
  iconButton: {
    color: '#444',
    paddingRight: 10,
  },
  borderGray: {
    color: '#000',
    backgroundColor: '#f3f3f3',
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 15,
    fontSize: 15
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  rightTitleStyle: {
    fontSize: 10,
  }
})

