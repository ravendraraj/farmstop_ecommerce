import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import constants from "../constants";
import Icon from 'react-native-vector-icons/Entypo';

export const MyPopUp = (props) => {
  //const [modalVisible, setModalVisible] = useState(false);
  const { modalVisible } = props;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.modalView}>
              <View style={{flex:1}}>
                {props.children}
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const ErrorMyPopUp = (props) => {
  const { modalVisible } = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.modalMsgView}>          
              <View style={{flex:1,width:'100%',alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:constants.vh(10)}}>
                <View style={{width:'100%',height:constants.vh(100),backgroundColor:constants.Colors.color_youtube,justifyContent:'center',alignItems:'center',alignSelf:'center',borderTopLeftRadius:constants.vh(10),borderTopRightRadius:constants.vh(10)}}>
                  <Icon name="circle-with-cross" color={constants.Colors.color_WHITE} size={constants.vh(40)}/>
                </View>
                <View style={{width:'100%',backgroundColor:constants.Colors.color_WHITE}}>
                  <Text style={{marginTop:constants.vh(20),fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(22),textAlign:'center'}}>{props.msg}</Text>
                </View>
                <View>
                  {props.children}
                </View>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const WarnMyPopUp = (props) => {
  const { modalVisible } = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.modalView}>
              <View style={{flex:1}}>
                {props.children}
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalViewContainer:{
    flex: 1,
    justifyContent: "center",
    backgroundColor:'rgba(0,0,0,0.7)'
  },
  modalView: {
    //marginTop: 20,
    //marginBottom: 20,
    width:'80%',
    height:'60%',
    //marginRight: 20,
    //marginLeft: 20,
    alignSelf:'center',
    backgroundColor: constants.Colors.color_WHITE,
    borderRadius:constants.vh(10),
    paddingTop: 0,
    //paddingBottom: 35,
    //paddingLeft: 15,
    //paddingRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalMsgView: {
    width:'80%',
    height:'30%',
    alignSelf:'center',
    backgroundColor: constants.Colors.color_WHITE,
    borderRadius:constants.vh(10),
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontFamily:constants.fonts.Cardo_Bold,
    textAlign: "center"
  },
  modalText: {
    marginBottom:constants.vh(10),
    fontFamily:constants.fonts.Cardo_Bold,
    fontSize:constants.vh(20),
    color:constants.Colors.color_WHITE,
  }
});
