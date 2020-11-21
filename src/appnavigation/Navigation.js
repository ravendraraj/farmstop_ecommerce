// import React,{useEffect,useState} from 'react';
// import { connect } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { navigationRef } from './RootNavigation';
// import DrawerScreen from './DrawerScreen';
// import NoneValidate from './NoneValidate';
// import AppIntroScreen from './AppIntroScreen';
// import WelcomeScreen from '../component/WelcomeScreen'

// const Navigation = ({navigation,introDoneProps}) => {

//   const RootAppStack = createStackNavigator();
//   return (
//     <NavigationContainer ref={navigationRef}>
//       <RootAppStack.Navigator initialRouteName="AppInroduction">
//         { { appIntro === 'introHadDone' ? (<RootAppStack.Screen  options={{headerShown: false}} name="DrawerScreen" component={DrawerScreen}/>):<RootAppStack.Screen  options={{headerShown: false}} name="AppInroduction" component={AppIntroScreen}/>}}
//           <RootAppStack.Screen  options={{headerShown: false}} name="DrawerScreen" component={DrawerScreen}/>
//           <RootAppStack.Screen  options={{headerShown: false}} name="AppInroduction" component={WelcomeScreen}/>
//           <RootAppStack.Screen  options={{headerShown: false}} name="NotLogin" component={NoneValidate}/>
//       </RootAppStack.Navigator>
//     </NavigationContainer>
//   )
//   };

//   const mapStateToProps = state => ({
//       introDoneProps : state.appIntro
//   });
  
//   const mapDispatchToProps = dispatch => ({
//     // introDone: data => dispatch({ type: 'APP_INTRO_DONE', data: data }),
//   });
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Navigation);