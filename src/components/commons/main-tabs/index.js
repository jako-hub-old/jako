import React from 'react';
import {
    Header,
} from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import stylesPalette from "../../../utils/stylesPalette";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const RenderButton = ({icon, active, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={active? styles.actionButtonActive : styles.actionButton}>
            <Icon style={styles.icon} name={icon} size={25}/>
        </View>
    </TouchableOpacity>
);

class MainTabs extends React.Component {
    state = {
        currentRoute : 0,
    };

    icons = [
        'home',
        'futbol',
        'user-friends',
        'search',
        'plus-circle',
    ];

    render() {
        const {navigation} = this.props;
        const {currentRoute} = this.state;
        return (
            <Header style={styles.root}>
                {/*{navigation.state.routes.map((item, key) => (*/}
                    {/*<RenderButton*/}
                        {/*active  = {currentRoute === key}*/}
                        {/*icon    = {"home"}*/}
                        {/*key     = {`unique-id-key-for-route-${key}`}*/}
                    {/*/>*/}
                {/*))}*/}
                <RenderButton icon={"home"} active />
                <RenderButton icon={"futbol"} />
                <RenderButton icon={"user-friends"} />
                <RenderButton icon={"search"} />
                <RenderButton icon={"plus-circle"} />
            </Header>
        );
    }
}

const palette = stylesPalette();
const styles = StyleSheet.create({
    root : {
        backgroundColor : palette.primary.color,
        justifyContent: "space-between",
        alignItems: "center",
    },
    body : {
        alignItems : "center",
    },
    icon : {
        color : "#FFF",
    },
    actionButton : {
        flexGrow : 1,
        flexBasis : 0,
        height : "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    actionButtonActive : {
        flexGrow : 1,
        flexBasis : 0,
        height : "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor : palette.secondary.color,
        borderBottomWidth : 3,
    },
});

export default MainTabs;