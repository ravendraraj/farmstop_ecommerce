import React, { Component } from 'react'
import { View, Switch, Text, TouchableHighlight, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { PrimaryTextInput, TextHeading } from '../customElement/Input'
import constants from "../constants";
import CustomStyles from "../constants/CustomStyles";

class SellerInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerInfo: '',
            name: '',
            isCertify: false,
            isCertifyYes: constants.Colors.color_grey,
            isCertifyNo: constants.Colors.color_grey
        };
    }

    _submitSellerInfo = () => {
        this.props.saveSellerInfo({ data: 'Ravendra' });
        navigate('Home');
    }

    textInputChange(val) {
        this.setState({ name: val })
    }

    selectYes = () => {
        // if (this.state.isCertify == false) {
        this.setState({ isCertify: true });
        this.setState({ isCertifyYes: constants.Colors.color_BLACK });
        this.setState({ isCertifyNo: constants.Colors.color_grey });
        // }
    }

    selectNo = () => {
        this.setState({ isCertify: false });
        this.setState({ isCertifyNo: constants.Colors.color_BLACK });
        this.setState({ isCertifyYes: constants.Colors.color_grey });
    }

    _continue() {
        console.log(this.state.isCertify)
        if (this.state.isCertify == true) {
            return (
                <View style={[styles.continueBtn]}>
                    <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" activeOpacity={0} onPress={this._submitSellerInfo}>
                        <TextHeading title="Continue" />
                    </TouchableHighlight>
                </View>
            );
        }
    }

    render() {
        return (
            
            <SafeAreaView style={styles.container}>
                <View style={CustomStyles.slide}>
                    
                    <ScrollView >
                        <View style={[styles.emailTextBox]}>
                            <TextHeading title="Seller Information" />
                        </View>
                        <View style={[styles.emailTextBox]}>
                            <PrimaryTextInput
                                // title = {constants.constStrings.LOGIN_BUTTON_TITLE} 
                                autoCapitalize="none"
                                onChangeText={(val) => this.textInputChange(val)}
                                placeholder={'Farmer Name'}
                            />
                        </View>
                        <View style={[styles.emailTextBox]}>
                            <PrimaryTextInput
                                autoCapitalize="none"
                                onChangeText={(val) => this.textInputChange(val)}
                                placeholder={'Farmer Location'}
                            />
                        </View>
                        <View style={[styles.emailTextBox]}>
                            <PrimaryTextInput
                                autoCapitalize="none"
                                onChangeText={(val) => this.textInputChange(val)}
                                placeholder={'Farmer Village'}
                            />
                        </View>
                        <View style={[styles.emailTextBox]}>
                            <PrimaryTextInput
                                autoCapitalize="none"
                                onChangeText={(val) => this.textInputChange(val)}
                                placeholder={'Farmer District'}
                            />
                        </View>
                        <View style={[styles.emailTextBox]}>
                            <PrimaryTextInput
                                autoCapitalize="none"
                                onChangeText={(val) => this.textInputChange(val)}
                                placeholder={'Farmer State'}
                            />
                        </View>
                        <View style={[styles.switchTextBox]}>
                            <Text>Is your farming Certified Organic?</Text>
                        </View>

                        <View style={{ flexDirection: 'row', paddingHorizontal: 60, paddingTop: 30 }} >
                            <TouchableHighlight underlayColor='#6a0912' onPress={this.selectYes} >
                                <Text style={{ fontSize: 20, color: this.state.isCertifyYes }}>Yes</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor='#6a0912' style={{ marginLeft: 40 }} onPress={this.selectNo} >
                                <Text style={{ fontSize: 20, color: this.state.isCertifyNo }}>No</Text>
                            </TouchableHighlight>

                        </View>
                        {this._continue()}
                    </ScrollView>
                </View>
             </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.color_WHITE,
        paddingTop: 30

    },
    emailTextBox: {
        width: '85%', alignSelf: 'center'
    },
    switchTextBox: {
        width: '85%',
        alignSelf: 'center',
        paddingTop: 30,
        alignItems: 'flex-start'
    },
    continueBtn: {
        alignItems: 'center',
        paddingTop: 30,
    },
    heading: {
        width: '90%',
        color: 'green'
    }
});

const mapStateToProps = state => ({
    savedData: state.remeasureProd,
});

const mapDispatchToProps = dispatch => ({
    saveSellerInfo: data => dispatch({ type: 'SAVED_SELLER_INFO', data: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerInfoScreen);
