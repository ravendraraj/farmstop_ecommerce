
import React from 'react';
import {Text} from 'react-native';
import constants from '../constants'
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';

//screens
import HomeScreen from '../component/HomeScreen'
import Header from '../headerComponent/header'
import EditHeader from '../headerComponent/editHeader'
import Mainheader from '../headerComponent/main_screen_header'
import NavigationDrawerStructure from '../headerComponent/NavigationDrawerStructure'
import MainNavigationDrawerStructure from '../headerComponent/MainNavigationDrawerStructure'
// import productVariation from '../component/PorductVariation'
import knowMoreProd from '../component/KnowMore'
import SignUpScreen from '../component/SignUp'
import LoginScreen from '../component/LoginScreen'
import AboutFarm from '../component/AboutFarm'
import otpVerify from '../component/otpVerify'
import MyCart from '../component/MyCart'
import ContactScreen from '../component/ContactScreen'

//import SocialLoginScreen from '../component/SocialLoginScreeen'
import SocialLoginScreen from '../appnavigation/AuthScreenStack'

import GoogleLoc from '../component/GoogleLoc'
import ShippingAddress from '../component/ShippingAddress'

import HowItWorks from '../component/HowItWorks'
import OrderSuccuess from '../component/OrderSuccuess'

import pageNotFound404 from '../component/pageNotFound404'
import internetError from '../component/internetError'
import PaymentOption from '../component/PaymentOption'
//tab navigation
import TabNavProdvariation from './TabNavProdvariation'

import TrackOrder from '../component/TrackOrder'
import MyProfile from '../component/MyProfile'
import OrderDetails from '../component/OrderDetails'
import EditProfile from '../component/EditProfile'
import Faq from '../component/Faq'
import Notification from '../component/Notification'
import MyOrderList from '../component/MyOrderList'
import ForgetPassword from '../component/ForgetPassword'

import OrganicCertificate from '../component/OrganicCertificate'
import ImageViewerScreen from '../component/ImageViewerScreen'

import BasketScreen from '../component/BasketScreen'

const RootStack = createStackNavigator();

const HomeStack = ({navigation}) => (
    <RootStack.Navigator initialRouteName="MainHome" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
    >
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <MainNavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Mainheader navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 10},
                headerTransparent:false,
            })}
            
            name="MainHome" component={TabNavProdvariation}/>

            <RootStack.Screen 
                    options={({ navigation }) => ({
                        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="ForgetPassword" component={ForgetPassword}/>
                    
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="Notification" component={Notification}/>
            
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="Faq" component={Faq}/>

        
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            
            // name="ProductType" component={productVariation}/>
            name="ProductType" component={TabNavProdvariation}/>

        
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            
            // name="ProductType" component={productVariation}/>
            name="HowItWorks" component={HowItWorks}/>

            <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="OrderDetails" component={OrderDetails}/>

            <RootStack.Screen 
            options={({ navigation }) => ({
                // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                // headerTitle: () => <Header navigation={navigation} />,
                headerTitle: null,
                headerLeft:false,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="OrderSuccuess" component={OrderSuccuess}/>

        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="TrackOrder" component={TrackOrder}/>

        <RootStack.Screen 
            options={({ navigation }) => ({
                // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                // headerTitle: () => <Header navigation={navigation} />,
                headerTitle: null,
                headerLeft:false,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="pageNotFound" component={pageNotFound404}/>


            <RootStack.Screen 
            options={({ navigation }) => ({
                // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: (route) => (<EditHeader navigation={navigation} title={route}/>),
                headerStyle:{shadowOpacity:0.1,elevation: 0},
                headerTransparent:false,
            })}
            name="MyProfile" component={MyProfile}/>

            <RootStack.Screen 
            options={({ navigation }) => ({
                // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: (route) => (<EditHeader navigation={navigation} title={route}/>),
                headerStyle:{shadowOpacity:0.1,elevation: 0},
                headerTransparent:false,
            })}
            name="EditProfile" component={EditProfile}/>

            <RootStack.Screen 
            options={({ navigation }) => ({
                // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                // headerTitle: () => <Header navigation={navigation} />,
                headerTitle: null,
                headerLeft:false,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="internetError" component={internetError}/>

        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="ShippingAddress" component={ShippingAddress}/>

        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:1,elevation: 10},
                headerTransparent:false,
            })}
            name="knowMoreProd" component={knowMoreProd}/>

        <RootStack.Screen
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:1,elevation: 10},
                headerTransparent:false,
            })}
        name="BasketScreen" component={BasketScreen}/>
 
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="SignUp" component={SignUpScreen}/>
        {/*
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="LogIn" component={LoginScreen}/> */}
        
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: null,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="AboutFarm" component={AboutFarm}/>

        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="MyCart" component={MyCart}/>

        <RootStack.Screen 
                    options={({ navigation }) => ({
                        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="otpVerification" component={otpVerify}/>
                    
        <RootStack.Screen 
                    options={({ navigation }) => ({
                        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="ContactScreen" component={ContactScreen}/>
        <RootStack.Screen
                    options={({ navigation }) => ({
                        // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        // headerTitle: () => <Header navigation={navigation} />,
                        headerShown:false,
                        headerTitle: null,
                        headerLeft:false,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="SocialLogin" component={SocialLoginScreen}/> 
        <RootStack.Screen 
                    options={({ navigation }) => ({
                        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="Wish-List" component={TabNavProdvariation}/>

        <RootStack.Screen 
                    options={({ navigation }) => ({
                        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="MyOrderTab" component={MyOrderList}/>
                    
        <RootStack.Screen 
                    options={({ navigation }) => ({
                        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle:{shadowOpacity:0,elevation: 0},
                        headerTransparent:false,
                    })}
                    name="GoogleLocation" component={GoogleLoc}/>
            

        <RootStack.Screen 
            options={({ navigation }) => ({
                headerTitle: null,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="PaymentOption" component={PaymentOption}/>

        <RootStack.Screen
            options={({ navigation }) => ({
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTitleStyle:{
                    color:constants.Colors.color_heading,
                    fontFamily:constants.fonts.Cardo_Regular,
                },
                headerTransparent:false,
        })}
        name="Organic Certification" component={OrganicCertificate}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerTitle: null,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="ImageViewerScreen" component={ImageViewerScreen}/>

            
    </RootStack.Navigator>
);

export default HomeStack;

// const mapStateToProps = (state) => ({
//   // state: state.nav,
// });

// export default connect(mapStateToProps)(RootStackScreen);
