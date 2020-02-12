import React, { Component } from 'react'
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";
import { textExtraProps as tProps } from '../config/system'
import SwipeRender from "../utils/SwipeRender";
// import SwipeRender from "react-native-swipe-render";
import { CAROUSEL_1, CAROUSEL_2 } from '../utils/images'

const pureHeight = Dimensions.get('window').height
const pureWidth = Dimensions.get('window').width
const width = pureWidth * 90 / 100 // 90 % from width
const height = pureHeight * 50 / 100 // 50 % from width

const carouselData = [{
  desc1: 'Tambahkan Deskripsi singkat di',
  desc2: 'sepanjang tulisan ini',
  uri: 'http://18.139.237.40/images/intro_1.png',
  // uri: 'asset:/intro_1.png' // for android
  // uri: 'intro_1' // for ios
},{
  uri: 'http://18.139.237.40/images/intro_1.png',
  desc1: 'Tambahkan Deskripsi singkat di',
  desc2: 'sepanjang tulisan ini'
},{
  uri: 'http://18.139.237.40/images/intro_1.png',
  desc1: 'Tambahkan Deskripsi singkat di',
  desc2: 'sepanjang tulisan ini'
},{
  desc1: 'Tambahkan Deskripsi singkat di',
  desc2: 'sepanjang tulisan ini',
  uri: 'http://18.139.237.40/images/intro_1.png'
},{
  uri: 'http://18.139.237.40/images/intro_1.png',
  desc1: 'Tambahkan Deskripsi singkat di',
  desc2: 'sepanjang tulisan ini'
},{
  desc1: 'Tambahkan Deskripsi singkat di',
  desc2: 'sepanjang tulisan ini',
  uri: 'http://18.139.237.40/images/intro_1.png'
}]

export default class Intro2 extends Component {
  state = {
    total: carouselData.length,
    index: 0,
    dot: null,
    dotColor: null,
    activeDot: null,
    dotStyle: null,
    activeDotColor: null,
    activeDotStyle: null
  }
  navigation = this.props.navigation

  renderPagination = () => {
    // By default, dots only show when `total` >= 2
    if (this.state.total <= 1) {
      return null;
    }

    let dots = [];
    const ActiveDot = this.props.activeDot || <View style={[{
      backgroundColor: this.props.activeDotColor || "#2a2cbb",
      width: 12,
      height: 12,
      borderRadius: 6,
      margin: 8
    }, this.props.activeDotStyle]} />;
    const Dot = this.props.dot || <View style={[{
      backgroundColor: this.props.dotColor || "rgba(0,0,0,.2)",
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 8
    }, this.props.dotStyle ]} />;
    for (let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ? React.cloneElement(ActiveDot, {key: i})
        : React.cloneElement(Dot, {key: i, onPress: () => console.log("index clicked: ", i) })
      );
    }

    return (
      <View pointerEvents="none" style={[styles.pagination_y]}>
        {dots}
      </View>
    );
  }

  toLogin = () => {
    this.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.introContainer}>
        <View style={styles.topColom}>
          <Text style={styles.title}>
            Selamat Datang
          </Text>
          <Text style={styles.title}>
            di Lababook
          </Text>
        </View>

        <View style={styles.carouselColom}>
          <SwipeRender
            data={carouselData}
            renderItem={({ item, index }) => {
              return (
                <View key={"SwipeRender-slide#" + index} style={{flex: 1}}>
                  <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'justify', color: '#dedede' }}>
                      { item.desc1 }
                    </Text>
                    <Text style={{ textAlign: 'justify', color: '#dedede' }}>
                      { item.desc2 }
                    </Text>
                  </View>
                  <Image
                    source={{ uri: item.uri }}
                    style={{flex: 1}}
                    resizeMode="contain"
                  />
                </View>
              );
            }}

            // OPTIONAL PROP USAGE.
            index={0} // default 0
            loop={false} // default false
            loadMinimal={true} // default false
            loadMinimalSize={2}
            onIndexChanged={ index => this.setState({index}) }
            autoplay={false} // default false
            horizontal={true} // default true
            showsPagination={false}
            enableAndroidViewPager={false} // default ScrollView
            // TO ENABLE AndroidViewPager:
            // react-native >= 0.60 - install @react-native-community/viewpager separately
            // react-native < 0.60 - ready to go!
          />
        </View>
        {this.renderPagination()}

        <View style={styles.buttonColom}>
          <TouchableNativeFeedback
            onPress={() => console.log('do what?')}
          >
            <View style={styles.button}>
              <Text {...tProps} style={styles.buttonText}>Mulai Sekarang</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.bottomColom}>
          <Text>
            Sudah punya akun? <Text style={styles.loginText} onPress={() => this.toLogin()}>Masuk</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 200,
    height: 200,
    marginTop: (pureHeight-200)/2
    // backgroundColor: 'red'
  },
  title: {
    fontSize: 32,
    // backgroundColor: 'blue'
  },
  button: {
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
  loginText: {
    color: '#149914',
    fontWeight: 'bold'
  },
  topColom: {
    marginTop: '5%',
    marginBottom: 15,
    alignItems: 'center',
    // backgroundColor: 'pink'
  },
  buttonColom: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  carouselColom: {
    width: width,
    height: height
  },
  pagination_y: {
    // position: "absolute",
    // right: 15,
    // top: 0,
    // bottom: 0,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    maxHeight: 8,
    marginTop: 25
  },
  bottomColom: {
    marginTop: 15,
    marginBottom: '5%',
    // backgroundColor: 'pink'
  },
});
