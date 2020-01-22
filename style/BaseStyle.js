import {
   
    StyleSheet,
    
} from 'react-native'

export default style = StyleSheet.create({
	container: {
	flex: 1,
	alignItems: 'stretch'
	// justifyContent: 'space-between'
  },
  
  headerBlue : {
    backgroundColor: '#2a2c7b',
    height : 85,
    paddingTop:15,
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
  }, 
  initialNameCircle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    backgroundColor: '#eb5789',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff',
    height:47,
    width:47,
    textAlign:'center',
    position: 'absolute',
    left:50,
    bottom:8
  },
  headText : {
    color : '#fff',
    paddingTop: 10,
    paddingBottom: 1,
    marginLeft : 110,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop:5
  },
  headPhone : {
    color : '#fff',
    paddingTop: 0,
    paddingBottom: 3,
    marginLeft : 110,
    fontSize: 13,
    fontStyle : "italic"
  },
  divBack: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    height:30,
    width:30,
    position: 'absolute',
    left:10,
    bottom:15
  },
  divLogo: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    height:30,
    width:30,
    position: 'absolute',
    right:20,
    bottom:12
  },
  logoPhone: {
    

  },
  divLogoBtm: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c7b',
    height:30,
    width:30,
    position: 'absolute',
    right:20,
    bottom:12
  },
  headerBtm : {
    height: 70,
    paddingLeft: 17,
    paddingTop: 10,
    paddingBottom:10,
    borderBottomWidth:10,
    borderBottomColor:'#f3f3f3'
  },
  btnWrap : {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row',
    alignSelf : 'center',
    textAlign: 'center',
    flex : 1
  },
  btnBerikan:{
    marginRight:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ce4165',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnDapatkan:{
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#7dd220',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight : 'bold'
  },
  blmWrap : {
    flex : 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  blmAdaText : {
    color : '#f3f3f3',
    fontSize : 30,
    fontWeight : 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign : 'center'
  },

  inputItem : {
  	marginRight: 10,
  	marginBottom : 20
  },

  inputIcon : {
  	color : '#aaa'
  },

  fixTitle : {
  	fontWeight : 'bold'
  },

  fixSubtitle : {
  	fontStyle : "italic"
  },

  halfModal : {
  	height: 120
  },
  modalContent : {
  	height: 220,
  	backgroundColor : '#fff',
  	alignItems: 'stretch',
  	padding : 15
  },
  labelStyleModal : {
  	fontWeight: "bold",
  	fontSize : 15,
  	color : '#2a2c7b'
  }


})