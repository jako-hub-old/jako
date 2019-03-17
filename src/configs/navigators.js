/**
 * In this file we configure all the application navigation routes.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import React from 'react';
import {
    createSwitchNavigator,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import {
    HomeScreen,
    FriendsScreen,
    LoginScreen, RegisterScreen,
} from '../screens';
import { MainDrawer} from "../components/commons";
import {tabRoutes} from "./routes";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
//
const BottomNavigator = createMaterialBottomTabNavigator(tabRoutes, {
    shifting            : true,
    initialRouteName    : "Home",
    activeColor         : "white",
    labeled             : false,
    barStyle : {
        backgroundColor: '#42a5f5',
    },
});

const AuthNavigator = createStackNavigator({
    Login : {
        screen : LoginScreen,
        navigationOptions: {
            headerVisible: false
        }
    },
    Register : {
        screen : RegisterScreen,
        navigationOptions: {
            headerVisible: false
        }
    },
}, {
    initialRouteName : "Register",
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
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
    Auth    : AuthNavigator,
    Main    : BottomNavigator,
    Drawer  : DrawerNavigator,
}, {
    initialRouteName: "Auth",
});

export default AppNavigator;