
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import WelcomeScreen from '../component/WelcomeScreen';
import HomeScreen from '../component/HomeScreen';
import SellerInfoScreen from '../component/SellerInfoScreen';
import Header from '../headerComponent/header';
const RootStack = createStackNavigator();


// onPress={() => {navigation.openDrawer()}}

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator>
        <RootStack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>
        {/* <RootStack.Screen options={{ headerLeft:null,headerTintColor: '#fff',headerTitle: props => <Header {...props} /> }}name="Home" component={HomeScreen}/> */}
        <RootStack.Screen options={{
                                headerLeft: null,
                                headerTitle: props => <Header {...props} />,
                                headerStyle: {
                                    backgroundColor: 'white',
                                    shadowStyle:'transparent'
                                },
                                headerTintColor: 'white',
                                headerTransparent:true,
                                headerTitleStyle: {
                                  fontWeight: 'bold',
                                },
                             }}

                            name="Home" component={HomeScreen}/>
        
        <RootStack.Screen name="SellerInfo" component={SellerInfoScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;

// const mapStateToProps = (state) => ({
//   // state: state.nav,
// });

// export default connect(mapStateToProps)(RootStackScreen);
