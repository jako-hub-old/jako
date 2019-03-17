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
import { MainDrawer} from "../components/commons";
import {tabRoutes} from "./routes";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
//
const BottomNavigator = createMaterialBottomTabNavigator(tabRoutes, {
    shifting            : true,
    initialRouteName    : "MyGames",
    activeColor         : "white",
    labeled             : false,
    barStyle : {
        backgroundColor: '#42a5f5',
    },
});
//
// const BottomNavigator = createBottomTabNavigator(tabRoutes, {
//     tabBarOptions : {
//         showLabel : false,
//         showIcon : true,
//     },
//     initialRouteName    : "BottomHome",
//     animationEnabled    : true,
//     // tabBarComponent     : MainTabs,
//     swipeEnabled        : true,
//     shifting            : true,
// });

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