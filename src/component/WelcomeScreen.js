import React, {Component} from 'react'
import { connect } from 'react-redux';
import {View, Text, StyleSheet, Image, TouchableHighlight,Dimensions} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import SellerInfoScreen from './SellerInfoScreen'
import image from "../constants/Image";
import {navigate} from '../lib/RootNavigation'

const width =  Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const slides = [
  {
    key: 'one',
    text: 'Your ethical organic e-store',
    image: image.appIntro1,
    brandImg :image.brandImages, 
    backgroundColor: '#F7BB64',
  },
  {
    key: 'two',
    text: 'Are you farmer and want to sell anything "Organic"',
    image: image.appIntro2,
    backgroundColor: '#F7BB64',
  },
  {
    key: 'three',
    text: 'Are you a consumer and want to Buy anything "Organic"',
    image: image.appIntro3,
    backgroundColor: '#F7BB64',
  },
  {
    key: 'sellbuyopt',
    text: 'Are you a consumer and want to Buy anything "Organic"',
    image: require('../images/slider3.png'),
    backgroundColor: '#F7BB64',
  },
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  show_Main_App: false,
	  seller: false,
	  buyer: false,
    };
  }

  _seller = () => {
		console.log("seller");
    this.setState({ seller: true });
    navigate('SellerInfo');
	}

	_buyer = () => {
		console.log("buyer");
    this.setState({ buyer: true });
    // navigate('SellerInfo', { userName: 'Lucy' });
	}

  _renderItem = ({item}) => {
    // console.log("width -"+width);
    // console.log("height -"+ height);
    if (item.key == 'sellbuyopt') {
      return (
        <View style={styles.slide}>
          <View style={{flex: 1, flexDirection: 'row',alignContent:'center',justifyContent: 'center'}}>
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{position: "absolute", left: 30,top:height/3.5, alignItems: "center",height:100,width:100,borderColor:'red',borderWidth:2,paddingTop:30,borderRadius:50}} activeOpacity={0} onPress={this._seller}>
                    <Text style={{fontSize:30 }}> Sell </Text>
                </TouchableHighlight>
                
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{position: "absolute", right: 30,top:height/3.5, alignItems: "center",height:100,width:100,borderColor:'red',borderWidth:2,paddingTop:30,borderRadius:50}} onPress={this._buyer}>
                    <Text style={{fontSize:30}}> Buy </Text>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{position: "absolute",top:height/1.5, alignItems: "center",}} onPress={this._buyer}>
                    <Text style={{fontSize:20,color:'green'}}> Explore More </Text>
                </TouchableHighlight>
            </View>
        </View>
      );
    } else {
      if(item.key === 'one'){
        return (
          <View style={styles.slide}>
            {/* <Text style={styles.title}>{item.title}</Text> */}
            <Image source={item.image} stye={{paddingTop:-18}}/>
            <Text style={styles.text}>{item.text}</Text>
            <Image source={item.brandImg} style={{width:width-20,height:height/3.6,paddingTop:20}} />
          </View>
        );
      }else{
        return (
          <View style={styles.slide}>
            {/* <Text style={styles.title}>{item.title}</Text> */}
            <Image source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
    }
  };

  render() {
    if (this.state.show_Main_App) {
      return (
        // <View style={styles.MainContainer}>
        //   <Text style={{textAlign: 'center', fontSize: 20, color: '#000'}}>
        //     This Main Screen after app Walkthrough screen.
        //   </Text>
        // </View>
        <SellerInfoScreen/>
      );
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          dotStyle={{backgroundColor: 'black'}}
          activeDotStyle={{backgroundColor: '#7F462C'}}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  slide: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 2,
    paddingRight: 2,
    resizeMode: 'cover',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#7F462C',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  buttonCircle: {
    width: 50,
    height: 40,
    // backgroundColor: '#7F462C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const mapStateToProps = state => ({
  // animate : state.indicator
});

const mapDispatchToProps = dispatch => ({
  // verify: data => dispatch(getLotDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

