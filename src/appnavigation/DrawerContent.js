import React from 'react';
import { View, StyleSheet } from 'react-native';
import { navigate } from '../appnavigation/RootNavigation'
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import fonts from '../constants/Fonts'
import colors from '../constants/Color'
import constants from 'jest-haste-map/build/constants';

//import{ AuthContext } from '../component/context';

export default function DrawerContent(props) {

    const paperTheme = useTheme();

    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Ravendra</Title>
                                <Caption style={styles.caption}>Singh</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]} onPress={() => {navigate('SignUp')}}>Signup</Paragraph>
                                <Paragraph style={[styles.paragraph, styles.caption,{paddingLeft:2}]} onPress={() => {navigate('LogIn')}} >/ Login</Paragraph>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                          
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {navigate('MainHome')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-badge" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Account"
                            onPress={() => {navigate('SellerInfo')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="heart" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Wish List"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="comment-question" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="FAQ"
                            onPress={() => {props.navigation.navigate('SocialLogin')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bell" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notification"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        <DrawerItem 
                            label="About Us"
                            onPress={() => {props.navigation.navigate('AboutFarm')}}
                        />
                        <DrawerItem 
                            label="Our Farm"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        <View style={styles.row}>
                        <View style={{paddingLeft:20}}>
                                <Entypo name="mail" color={colors.color_intro} size={40} />
                            <Paragraph style={[ styles.contactUs,{paddingLeft:2}]} onPress={() => {navigate('ContactScreen')}} >
                                Contact Us
                            </Paragraph>
                        </View>
                    </View>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    contactUs:{
        fontFamily:fonts.Cardo_Regular,
        fontSize:16,
        marginRight:3,
    }
  });