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
    gameRoutes,
    AuthRoutes, 
    homeRoutes,
    createTabOptions,
    playerRoutes,
 } from "./routes";

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

const GamesNavigator = createStackNavigator(gameRoutes, {
    initialRouteName : 'CreateGame',
    headerMode       : 'none',
});

const PlayerNavigator = createStackNavigator(playerRoutes, {
    initialRouteName : 'PlayerProfile',
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

const AppNavigator = createStackNavigator({
    Main    : MainNavigator,
    Games   : GamesNavigator,
    Player  : PlayerNavigator,
}, {
    initialRouteName : "Main",
    headerMode       : 'none',
});

const AppNavigatorContainer = createSwitchNavigator({
    Auth : AuthNavigator,
    App  : AppNavigator,
}, {
    initialRouteName : "Auth"
});

export default AppNavigatorContainer;