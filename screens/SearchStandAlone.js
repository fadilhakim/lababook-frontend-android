import React, { Component } from 'react'
import {
  View,
  StyleSheet, StatusBar, Animated, Text, ScrollView
} from 'react-native'
import SearchBar from 'react-native-searchbar'
// import { useScreens } from 'react-native-screens'
import Constants from 'expo-constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import Kontak from './Kontak'

// useScreens()

class Search extends Component {
  state = {
    statusBarHeight: 0,
  }

  navigation = this.props.navigation
  searchBar = null

  items = [
    1337,
    'janeway',
    {
      lots: 'of',
      different: {
        types: 0,
        data: false,
        that: {
          can: {
            be: {
              quite: {
                complex: {
                  hidden: [ 'gold!' ],
                },
              },
            },
          },
        },
      },
    },
    [ 4, 2, 'tree' ],
  ]

  _handleResults(results) {
    console.log(results)
    this.handlerValue()
    // this.setState({ results });
  }

  handlerValue = () => {
    const value = this.searchBar.getValue()
    console.log("value: ", value)
  }

  componentDidMount () {
    const newHeight = getStatusBarHeight() || 32
    this.setState({
      statusBarHeight: newHeight
    })
  }

  render () {
    return (
      <View style={[styles.container, {marginTop: this.state.statusBarHeight}]}>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          // data={this.items}
          handleResults={(results) => this._handleResults(results)}
          onBack={() => this.navigation.navigate('Home')}
          placeholder={'Cari'}
          showOnLoad
        />
        <ScrollView style={{marginTop: 60}}>
          {/*<Kontak />*/}
        </ScrollView>
      </View>
    )
  }
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
