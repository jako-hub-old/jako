/**
 * In this file we configure all the application navigation routes.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import React from 'react';
import {
    createSwitchNavigator,
    createDrawerNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import {
    HomeScreen,
    FriendsScreen,
} from '../screens';
import { MainDrawer, MainTabs } from "../components/commons";
import Icon from 'react-native-vector-icons/FontAwesome5';

const BottomNavigator = createBottomTabNavigator({
    BottomHome : {
        screen : HomeScreen,
        navigationOptions : {
            drawerLabel : 'Inicio',
            icon        : 'home',
            tabBarIcon  : ({tintColor}) => (
                <Icon name="home" color={tintColor} size={24} />
            ),
        },
    },
}, {
    tabBarOptions : {
        showLabel : false,
        showIcon : true,
    },
    initialRouteName : "BottomHome",
    tabBarComponent : MainTabs,
});

const DrawerNavigator = createDrawerNavigator({
    DrawerHome : {
        screen : HomeScreen,
        navigationOptions : {
            drawerLabel : 'Inicio',
        },
    },
    DrawerFriends : {
        screen : FriendsScreen,
        navigationOptions : {
            drawerLabel : 'Mis amigos',
        },
    },
}, {
    initialRouteName    : "DrawerHome",
    contentComponent    : MainDrawer,
});

const AppNavigator = createSwitchNavigator({
    Bottom : BottomNavigator,
    Drawer : DrawerNavigator,
}, {
    initialRouteName: "Bottom",
});

export default AppNavigator;