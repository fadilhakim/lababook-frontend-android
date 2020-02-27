import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import Modal from 'react-native-modal'

export default class LoadingModal extends Component {
  render () {
    return (
      <Modal
        isVisible={this.props.showLoading}
        avoidKeyboard={true}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color='#0000ff' size="large" />
          <Text style={{color: '#fff', marginLeft: 10}}> {this.props.loadingMessage} </Text>
        </View>
      </Modal>
    )
  }
}
