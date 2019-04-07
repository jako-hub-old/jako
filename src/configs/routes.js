import React from 'react';
import {
    HomeScreen,
    MyGamesScreen,
    CreateGameScreen,
    MyProfileScreen,
    SearchScreen,
    GameDetailScreen,
    RegisterScreen,
    JoinToGameScreen,
    ContactScreen,
    PlayerProfileScreen,
} from "../screens";
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * Home tab view routes.
 */
export const homeRoutes = {
    Posts : { screen : HomeScreen },
}

/**
 * My Games tab view routes.
 */
export const myGameRoutes = {
    MyGames : {screen : MyGamesScreen},
    GameDetail      : { screen : GameDetailScreen },    
    JoinToGame      : { screen : JoinToGameScreen },
};

/**
 * Search tab view routes.
 */
export const searchRoutes = {
    Search : {
        screen : SearchScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"search"} size={24} />) },
    },    
    GameDetail      : { screen : GameDetailScreen },
    JoinToGame      : { screen : JoinToGameScreen },    
};

/**
 * Profile tab view routes.
 */
export const profileRoutes = {
    Profile : {
        screen : MyProfileScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"user"} size={24} />) },
    },
};

/**
 * Contact tab view routes.
 */
export const contactRoutes = {
    Contact : {
        screen : ContactScreen,
        navigationOptions : { tabBarIcon : ({tintColor}) => (<Icon color={tintColor} name={"question-circle"} size={24} />) },
    },
}
/**
 * Games tab view routes.
 */
export const gameRoutes = {    
    CreateGame      : { screen : CreateGameScreen },    
};

export const playerRoutes = {
    PlayerProfile   : { screen : PlayerProfileScreen },
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