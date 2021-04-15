import React from 'react'
import {connect} from 'react-redux'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
import constants from '../../constants'
import {setWishListItemOnServer} from '../../lib/api'

const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: constants.Colors.color_statusbar,
  textPrimary: '#515151',
  black: '#000', 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    icon: {
        //paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:4
    },
    animatedIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: 160,
        opacity: 0,
        elevation:4
    },
    text: {
        textAlign: 'center',
        fontSize: 13,
        backgroundColor: colors.transparent,
        color: colors.textPrimary
    },
})

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

class SubProduct extends React.Component<props>{
  constructor(props) {
    super(props)

    this.state = {
      liked: this.props.liked
    }

    this.lastPress = 0
  }


  _addinWishList = prodData =>{
    if(this.props.data.token !="" && this.props.data.authUserID !=""){
      var data = [];
      data["id"] = prodData.id;
      data["screen"] = this.props.screen_name;
      this.props.dispatch(setWishListItemOnServer(data));
    }else{
      this.props.navigation.navigate("SocialLogin");
    }
  };

  handleLargeAnimatedIconRef = (ref) => {
    this.largeAnimatedIcon = ref
  }

  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref
  }

  animateIcon = () => {
    const { liked } = this.state
    this.largeAnimatedIcon.stopAnimation()

    if (liked) {
      this.largeAnimatedIcon.bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut())
      this.smallAnimatedIcon.pulse(200)
    } else {
      this.largeAnimatedIcon.bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut()
          this.smallAnimatedIcon.bounceIn()
        })
        .then(() => {
          if (!liked) {
            this.setState(prevState => ({ liked: !prevState.liked }))
          }
        })
    }
  }

  handleOnPress = () => {
    const time = new Date().getTime()
    const delta = time - this.lastPress
    const doublePressDelay = 400

    //if (delta < doublePressDelay) {
      this.animateIcon()
    //}
    this.lastPress = time
    this._addinWishList(this.props.item);
    console.log("like button 1")
  }

  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn()
    this.setState(prevState => ({ liked: !prevState.liked }))
    this._addinWishList(this.props.item);
    console.log("like button 2")
  }

  render(){
    const { liked } = this.state;
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={this.handleOnPress}
        >
            <AnimatedIcon
                ref={this.handleLargeAnimatedIconRef}
                name="heart"
                color={colors.white}
                size={22}
                style={styles.animatedIcon}
                duration={500}
                delay={200}
            />
                <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.handleOnPressLike}
                    >
                    <AnimatedIcon
                        ref={this.handleSmallAnimatedIconRef}
                        name={liked ? 'heart' : 'hearto'}
                        color={liked ? colors.heartColor : colors.textPrimary}
                        size={22}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            
        </TouchableOpacity>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state){
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        indicator,data,error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubProduct);