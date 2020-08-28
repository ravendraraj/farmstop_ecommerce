
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { connect } from 'react-redux';

//screens
import HomeScreen from '../component/HomeScreen'
import Header from '../headerComponent/header'
import EditHeader from '../headerComponent/editHeader'
import Mainheader from '../headerComponent/main_screen_header'
import NavigationDrawerStructure from '../headerComponent/NavigationDrawerStructure'
// import productVariation from '../component/PorductVariation'
import knowMoreProd from '../component/KnowMore'
import SignUpScreen from '../component/SignUp'
import LoginScreen from '../component/LoginScreen'
import AboutFarm from '../component/AboutFarm'
import otpVerify from '../component/otpVerify'
import MyCart from '../component/MyCart'
import ContactScreen from '../component/ContactScreen'
import SocialLoginScreen from '../component/SocialLoginScreeen'
// import WishList from '../component/WishList'
import GoogleLoc from '../component/GoogleLoc'
import ShippingAddress from '../component/ShippingAddress'

import HowItWorks from '../component/HowItWorks'
import OrderSuccuess from '../component/OrderSuccuess'

import pageNotFound404 from '../component/pageNotFound404'
import internetError from '../component/internetError'
import PaymentOption from '../component/PaymentOption'
//tab navigation
import TabNavProdvariation from './TabNavProdvariation'
import WishTabNav from './WishTabNav'
import MyOrderTab from './MyOrderTab'
import TrackOrder from '../component/TrackOrder'
import MyProfile from '../component/MyProfile'
import OrderDetails from '../component/OrderDetails'
import EditProfile from '../component/EditProfile'
import Faq from '../component/Faq'
import Notification from '../component/Notification'
import MyOrderList from '../component/MyOrderList'

const RootStack = createStackNavigator();

const HomeStack = ({navigation}) => (
    <RootStack.Navigator initialRouteName="MainHome">
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Mainheader navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
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
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="knowMoreProd" component={knowMoreProd}/>
{/* 
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name="SignUp" component={SignUpScreen}/>

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
                    name="Wish-List" component={WishTabNav}/>

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
            
    </RootStack.Navigator>
);

export default HomeStack;

// const mapStateToProps = (state) => ({
//   // state: state.nav,
// });

// export default connect(mapStateToProps)(RootStackScreen);
