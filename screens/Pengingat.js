import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Button,
  SectionList,
  Linking,
  Alert,
} from 'react-native'
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const { ContextMenu, SlideInMenu, Popover } = renderers;
import { ListItem, ButtonGroup } from 'react-native-elements'

import { Accordion } from "native-base"
import TouchableScale from 'react-native-touchable-scale'
import { API_URL } from "react-native-dotenv"
import FileDownload from 'js-file-download'
// import RNFetchBlobFile from 'rn-fetch-blob'
import * as FileSystem from 'expo-file-system'

import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons'

import { textExtraProps as tProps } from '../config/system'

import ReminderCard from '../components/ReminderCard'
import { getReminderList } from '../api/reminder'
import { numberFormat } from '../helpers/NumberFormat'
import { TimeDiff } from "../helpers/TimeFormat"
import CallNumber from "../helpers/CallNumber"
import OpenApp from "../helpers/OpenApp"
import { GetPDFFile, GetReminderList, UpdateReminderStatusAlarm } from '../api/reminder'
import { connect } from 'react-redux'
import { URL } from 'react-native/Libraries/Blob/URL'
// import { FileSystem } from 'expo/build/removed.web'

class Pengingat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.userName || 1, // sementara
      bookId: this.props.user.bookId || 1, // sementara
      token: this.props.user.token,
      transactions:[],
      dataReminder: [],
      lengthDataGroup: {
        late: 0,
        current: 0,
        incoming: 0,
      },
      onReceivingData: false,
      statusAlarm: {},
      renderer: ContextMenu
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
    const token = this.state.token
    const params = {
      bookId,
      token
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
          Alert.alert('Perhatian!',`Terjadi kesalahan saat mengambil data!`)
        }
      })
      .catch(err => {
        Alert.alert('Perhatian!',`Terjadi kesalahan saat mengambil data!`)
      })
      .finally(() => this.setState({ onReceivingData: false }))
  }

  onExportPDF = () => {
    console.log('exporting')
    this.setState({ onReceivingData: true })

    const bookId = this.state.bookId
    const token = this.state.token
    const params = {
      bookId,
      token
    }

    GetPDFFile(params)
      .then(result => {
        console.log("PDF: ", result)
        console.log("PDF data: ", result.data)
        let reader = new FileReader();
        const fileUri = FileSystem.documentDirectory + 'Pengingat.pdf'
        reader.readAsDataURL(result.data);
        reader.onloadend = function() {
          const base64data = reader.result;
          console.log(base64data);

          FileSystem.writeAsStringAsync(
            fileUri,
            base64data,
            {
              encoding: 'base64'
            }
          )
          // FileSystem.downloadAsync(
          //   `data:application/pdf;base64,${base64data}`,
          //   fileUri
          // )
        }
        // const blob = new Blob([result.data], {type: 'application/pdf'})
        // const urlBlob = URL.createObjectURL(blob)
        // console.log("blob: ", blob)
        // console.log("urlBlob: ", urlBlob)
        // FileDownload(urlBlob, 'Pengingat.pdf')
      })
      .catch(err => {
        console.log("PDF: ", err)
        Alert.alert('Perhatian!', `Terjadi kesalahan saat mengunduh file!`)
      })
      .finally(() => this.setState({ onReceivingData: false }))
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
          <Menu
            renderer={Popover}
            // rendererProps={{ anchorStyle: styles.anchorStyle}}
            // style={styles.iconButton, styles.iconMore}
          >
            <MenuTrigger>
              <MaterialCommunityIcons name='dots-vertical' size={27} style={[styles.iconButton, styles.iconMore]} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value='whatsapp'
                          onSelect={() => this.selectMore('whatsapp', item.phoneNumber)}
                          children={
                            <View style={[styles.moreContainer, styles.whatsappContainer]}>
                              <MaterialCommunityIcons name='whatsapp' size={24} style={styles.moreIcon} />
                              <Text style={styles.moreText}>Whatsapp</Text>
                            </View>
                          }
              />
              <MenuOption value='sms'
                          onSelect={() => this.selectMore('sms', item.phoneNumber)}
                          children={
                            <View style={[styles.moreContainer, styles.smsContainer]}>
                              <FontAwesome name='envelope' size={24} style={styles.moreIcon} />
                              <Text style={styles.moreText}>SMS</Text>
                            </View>
                          }
              />
            </MenuOptions>
          </Menu>
        </>
      )
    }
  }

  updateAlarm = (idData) => {
    this.setState({ onReceivingData: true })

    const newAlarmStatus = this.state.statusAlarm[idData] === 'Y' ? 'N' : 'Y'
    const token = this.state.token
    const params = {
      trxId: idData,
      statusAlarm: newAlarmStatus,
      token
    }
    UpdateReminderStatusAlarm(params)
      .then(result => {
        // console.log(result)
        if (result.status === 200 && result.data){
          const newAllStatus = {}
          Object.assign(newAllStatus, this.state.statusAlarm, {[idData]: newAlarmStatus})

          this.setState({
            statusAlarm: newAllStatus
          })
        } else {
          Alert.alert('Perhatian!', `Terjadi kesalahan saat menyimpan data!`)
        }
      })
      .catch(err => {
        Alert.alert('Perhatian!', `Terjadi kesalahan saat mengambil data!`)
      })
      .finally(() => this.setState({ onReceivingData: false }))
  }

  callPerson = (phoneNumber) => {
    CallNumber(phoneNumber)
  }

  selectMore = (type, number = '') => {
    this.setState({ onReceivingData: true })
    if (type === 'whatsapp') {
      OpenApp({ type, number })
        .catch((e) => {
          console.log("e: ", e)
          Alert.alert('Perhatian!', `Terjadi kesalahan saat membuka aplikasi! ${e}`)
        })
    } else {
      const params = {
        type: "sms",
        number,
        message: ''
      }
      OpenApp(params)
    }
    this.setState({ onReceivingData: false })
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

function mapStateToProps (state) {
  return {
    user: state.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Pengingat)

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
    paddingRight: 20,
  },
  iconButton: {
    color: '#444',
    paddingRight: 5,
    paddingLeft: 5,
  },
  iconMore: {
    paddingRight: 0,
    paddingLeft: 0,
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
  },
  moreContainer: {
    flexDirection: 'row'
  },
  whatsappContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    borderStyle: 'solid',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  smsContainer: {
    paddingLeft: 10,
    paddingBottom: 10
  },
  moreIcon: {
    paddingRight: 0,
    paddingLeft: 0,
    color: '#25D366'
  },
  moreText: {
    paddingTop: 3,
    paddingLeft: 10,
    fontSize: 14
  }
})
