import React, { Component } from 'react'
import {
  // Animated,
  Text,
  View,
  Image,
  StyleSheet,
  // Button,
  Dimensions,
  SafeAreaView,
  TouchableNativeFeedback, Alert
} from 'react-native'
import { textExtraProps as tProps } from '../config/system'
import SwipeRender from "../utils/SwipeRender";
// import SwipeRender from "react-native-swipe-render";
import {
  CAROUSEL_1,
  CAROUSEL_2,
  CAROUSEL_3,
  CAROUSEL_4,
  CAROUSEL_5,
  CAROUSEL_6
} from '../utils/images'

const pureHeight = Dimensions.get('window').height
const pureWidth = Dimensions.get('window').width
const width = pureWidth * 90 / 100 // 90 % from width
const height = 350 //pureHeight * 50 / 100 // 50 % from width

const carouselData = [{
  desc1: 'Jalan jalan ke Jakarta, Berhenti kita di panti jompo',
  desc2: 'Hari ini jatuh cinta, Besok lusa jatuh tempo',
  uri: CAROUSEL_1
},{
  uri: CAROUSEL_2,
  desc1: 'Balonku ada lima, Rupa-rupa warnanya',
  desc2: 'Uang mu sudah ku terima, Hati mu masih tanda tanya'
},{
  uri: CAROUSEL_3,
  desc1: 'Harimau mati tinggal belangnya, Si tupai panjat pohon kelapa',
  desc2: 'Tiap hari catat hutangnya, Supaya kita tak pernah lupa'
},{
  desc1: 'Selamat datang di Lababook.',
  desc2: 'Selamatkan diri dari harapan kosong mereka yang berhutang padamu',
  uri: CAROUSEL_4
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

  nextStep = () => {
    this.navigation.navigate('Register01')
  }

  render() {
    return (
      <SafeAreaView style={styles.introContainer}>
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
                <View key={"SwipeRender-slide#" + index} style={styles.carouselItem}>
                  <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.carouselText, {paddingTop: 10}]}>
                      { item.desc1 }
                    </Text>
                    <Text style={[styles.carouselText, { paddingBottom: 10}]}>
                      { item.desc2 }
                    </Text>
                  </View>
                  <Image
                    source={ item.uri }
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
            onPress={() => this.nextStep()}
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
      </SafeAreaView>
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
  carouselItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 350,
    // backgroundColor: 'gray'
  },
  carouselText: {
    textAlign: 'center',
    color: '#2a2cbb',
    fontSize: 15
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
