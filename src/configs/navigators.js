/**
 * In this file we configure all the application navigation routes.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import { 
    myGameRoutes,
    searchRoutes,
    profileRoutes,
    contactRoutes,
    GameRoutes, 
    AuthRoutes, 
    homeRoutes,
    createTabOptions,
 } from "./routes";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const AuthNavigator = createSwitchNavigator(AuthRoutes, {
    initialRouteName : "Register",
});

const HomeNavigator = createStackNavigator(homeRoutes, {
    initialRouteName : 'Posts',
    headerMode       : 'none',
});

const MyGameNavigator = createStackNavigator(myGameRoutes, {
    initialRouteName : 'MyGames',
    headerMode       : 'none',
});

const SearchNavigator = createStackNavigator(searchRoutes, {
    initialRouteName : 'Search',
    headerMode        : 'none',
});

const ProfileNavigator = createStackNavigator(profileRoutes, {
    initialRouteName : 'Profile',
    headerMode       : 'none',
});

const ContactNavigator = createStackNavigator(contactRoutes, {
    initialRouteName : 'Contact',
    headerMode       : 'none',
});

const MainNavigator = createBottomTabNavigator({
    HomeTab     : createTabOptions(HomeNavigator, 'home'),
    MyGamesTab  : createTabOptions(MyGameNavigator, 'futbol'),
    SearchTab   : createTabOptions(SearchNavigator, 'search'),
    ProfileTab  : createTabOptions(ProfileNavigator, 'user'),
    ContactTab  : createTabOptions(ContactNavigator, 'question-circle'),
}, {
    shifting            : true,
    initialRouteName    : "MyGamesTab",
    activeColor         : "white",
    labeled             : false,
    barStyle : {
        backgroundColor: '#42a5f5',
    },
    style: {
        backgroundColor: '#42a5f5',
    }
}); 

const AppNavigator = createSwitchNavigator({
    Auth : AuthNavigator,
    Main : MainNavigator,
}, {
    initialRouteName : "Auth"
});

export default AppNavigator;