import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import {HomeScreen} from '../screens';
import {MainDrawer} from "../components/commons";

const DrawerNavigator = createDrawerNavigator({
    DrawerHome : {
        screen : HomeScreen,
        navigationOptions : {
            drawerLabel : 'Home',
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