import React from 'react';
import {Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SocialLoginScreen from '../component/SocialLoginScreen';
import otpVerify from '../component/otpVerify'
import ForgetPassword from '../component/ForgetPassword'
import SignUpScreen from '../component/SignUp'
import OtpVerification from '../component/OtpVerification'
import ResetPassword from '../component/ResetPassword'
//import LoginScreen from '../component/LoginScreen'
import constants from '../constants'
const AuthStack = createStackNavigator();

const AuthScreenStack = ({navigation}) => (
    <AuthStack.Navigator initialRouteName={"SocialLoginScreen"}>
        <AuthStack.Screen 
        	options={({ navigation }) => ({
                headerTitle: null,
                headerLeft:false,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
        	name={"SocialLoginScreen"} component={SocialLoginScreen}
        />

        <AuthStack.Screen 
        	options={({ navigation }) => ({
                headerTitle: null,
                headerStyle:{shadowOpacity:3,elevation: 5},
                headerTransparent:true,
            })}

        	name={"SignUp"} component={SignUpScreen}
        />

        <AuthStack.Screen 
        	options={({ navigation }) => ({
                //headerTitle: (<Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(20),fontFamily:constants.fonts.Cardo_Bold}}>Forget Password</Text>),
                headerTitle:false,
                headerStyle:{shadowOpacity:3,elevation: 5},
                headerTransparent:true,
            })}
        	name={"ForgetPassword"} component={ForgetPassword}
        />

        <AuthStack.Screen 
        	options={({ navigation }) => ({
                headerTitle: (<Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(20),fontFamily:constants.fonts.Cardo_Bold}}>OTP Verification</Text>),
                headerStyle:{shadowOpacity:3,elevation: 5},
                headerTransparent:false,
            })}
        	name={"otpVerification"} component={otpVerify}
        />

        <AuthStack.Screen 
            options={({ navigation }) => ({
                headerTitle: false,
                headerLeft:null,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:true,
            })}
            name={"OTPScreen"} component={OtpVerification}
        />

        <AuthStack.Screen 
            options={({ navigation }) => ({
                headerTitle: false,
                headerLeft:null,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:true,
            })}
            name={"ResetPassword"} component={ResetPassword}
        />

    </AuthStack.Navigator>
);

export default AuthScreenStack;