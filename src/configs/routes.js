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

export const homeRoutes = {
    Posts : { screen : HomeScreen },
}

export const myGameRoutes = {
    MyGames : {screen : MyGamesScreen},
};

export const searchRoutes = {
    Search : {
        screen : SearchScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"search"} size={24} />) },
    },
};

export const profileRoutes = {
    Profile : {
        screen : MyProfileScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"user"} size={24} />) },
    },
};

export const contactRoutes = {
    Contact : {
        screen : ContactScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"question-circle"} size={24} />) },
    },
}

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
    Register : {
        screen : RegisterScreen,
        navigationOptions: {
            headerVisible: false
        }
    },
};

export const createTabOptions = (screen, name) => ({ 
    screen,
    navigationOptions: {
        tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={ name } size={24} />),
        tabBarOptions : {
            inactiveTintColor : "#bdbdbd",
            showLabel : false,
            activeTintColor : "#FFF",
            activeBackgroundColor : "#42a5f5",
            inactiveBackgroundColor : "#42a5f5",
        },
    }
});