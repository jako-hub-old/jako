/**
 * In this file we configure all the application navigation routes.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import {
    createSwitchNavigator,
    createStackNavigator,
} from 'react-navigation';
import { tabRoutes, GameRoutes, AuthRoutes } from "./routes";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
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

const AuthNavigator = createStackNavigator(AuthRoutes, {
    initialRouteName : "Register",
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const GeneralNavigator = createStackNavigator({
    ...GameRoutes,
}, {
    initialRouteName : "GameDetail",
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AppNavigator = createSwitchNavigator({
    Auth    : AuthNavigator,
    Main    : BottomNavigator,
    General : GeneralNavigator,
}, {
    initialRouteName: "Auth",
});

export default AppNavigator;