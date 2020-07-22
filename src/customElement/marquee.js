import React, { Component } from "react";
import PropTypes from "prop-types";

import { StyleSheet, View, Easing, Animated, Text } from "react-native";

class Marquee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
    this.animatedTransformX = new Animated.Value(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.width !== this.state.width) {
      this.runAnimation();
    }
  }
  runAnimation() {
    this.animatedTransformX.setValue(0);
    Animated.timing(this.animatedTransformX, {
      duration: this.props.duration,
      useNativeDriver: true, // <-- Add this
      toValue: -this.state.width/2+100,
      easing: Easing.linear,
    }).start(() => this.runAnimation());
  }

  wrapperOnLayout(e) {
    this.setState({
      width: Math.round(e.nativeEvent.layout.width)
    });
  }

  render() {
    const { children, data } = this.props;

    let contentCom = [];

    if (children) {
      contentCom = children;
    } else if(data){
      contentCom = data.map((item, index) => (
        <View key={`marqueeList${index}`}>
          <Text>{item}</Text>
        </View>
      ));
    }

    const cloneChildren = React.Children.map(contentCom, contentCom =>
      React.cloneElement(contentCom)
    );
    const reactElementArr = [contentCom];

    return (
      <View style={[styles.container, { height: 100}]}>
        <Animated.View
          style={{
            transform: [{ translateX: this.animatedTransformX }]
          }}
        >
          <View onLayout={event => this.wrapperOnLayout(event)}>
            {
              // reactElementArr
              reactElementArr.map(reactEle => reactEle)
              }
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  }
});

Marquee.propTypes = {
  duration: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Marquee.defaultProps = {
  duration: 10000,
//  width: '100%'
};

export default Marquee;