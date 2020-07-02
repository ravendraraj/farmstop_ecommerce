import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../component/WelcomeScreen';
import HomeScreen from '../component/HomeScreen';
import Header from '../headerComponent/header';

const AppIntroStack = createStackNavigator();
const AppIntroScreen = ({navigation}) => (
    <AppIntroStack.Navigator initialRouteName="AppInroduction">
        {/* <AppIntroStack.Screen options={{
                                headerLeft: null,
                                headerTitle: props => <Header {...props} />,
                                headerStyle: {
                                    backgroundColor: 'white',
                                },
                                headerTintColor: 'white',
                                headerTransparent:true,
                                headerTitleStyle: {
                                  fontWeight: 'bold',
                                },
                             }}

                            name="Home" component={HomeScreen}/> */}
        
        <AppIntroStack.Screen  options={{headerShown: false}} name="AppInroduction" component={WelcomeScreen}/>
        <AppIntroStack.Screen 
            options={({ navigation }) => ({
                headerTitle: () => <Header navigation={navigation} />,
                headerTransparent:true,
            })}
            
            name="Home" component={HomeScreen}/>
    </AppIntroStack.Navigator>
);

export default AppIntroScreen;