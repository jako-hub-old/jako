/**
 * In this file we configure all the application navigation routes.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */

import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import {
    HomeScreen,
    FriendsScreen,
} from '../screens';
import { MainDrawer } from "../components/commons";

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
    Drawer : DrawerNavigator,
}, {
    initialRouteName: "Drawer",
});

export default AppNavigator;