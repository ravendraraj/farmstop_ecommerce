import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../component/WelcomeScreen';
import HomeScreen from '../component/HomeScreen';
import Header from '../headerComponent/header';
import NavigationDrawerStructure from '../headerComponent/NavigationDrawerStructure'
import DrawerScreen from './DrawerScreen'

const AppIntroStack = createStackNavigator();
const AppIntroScreen = ({navigation}) => (
    <AppIntroStack.Navigator>
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
        {/* <AppIntroStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerTransparent:true,
            })}
            
            name="Home" component={HomeScreen}/> */}
            <AppIntroStack.Screen 
                options={({ navigation }) => ({
                    headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                    headerTitle: () => <Header navigation={navigation} />,
                headerTransparent:true,
                })}
            name="Drawer" component={DrawerScreen}/>
    </AppIntroStack.Navigator>
);

export default AppIntroScreen;