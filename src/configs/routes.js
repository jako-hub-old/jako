import React from 'react';
import {
    HomeScreen,
    MyGamesScreen,
    CreateGameScreen,
    MyProfileScreen,
    SearchScreen,
    GameDetailScreen,
    LoginScreen,
    RegisterScreen,
    JoinToGameScreen,
    ContactScreen,
} from "../screens";
import Icon from 'react-native-vector-icons/FontAwesome5';

export const tabRoutes = {
    Home : {
        screen : HomeScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"home"} size={24} />)},
    },
    MyGames : {
        screen : MyGamesScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"futbol"} size={24} />) },
    },
    Search : {
        screen : SearchScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"search"} size={24} />) },
    },    
    Profile : {
        screen : MyProfileScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"user"} size={24} />) },
    },
    Contact : {
        screen : ContactScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"question-circle"} size={24} />) },
    },
};

export const GameRoutes = {
    CreateGame : {
        screen : CreateGameScreen,        
    },
    JoinToGame : {
        screen : JoinToGameScreen,
    },    
    GameDetail : {
        screen : GameDetailScreen,
    },    
};

export const AuthRoutes = {
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
};