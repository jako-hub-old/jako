import React from 'react';
import {
    Header,
    Body,
    Button,
    Left,
    Right,
    Title,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, } from 'react-native';
import PropTypes from 'prop-types';
import stylesPalette from "../utils/stylesPalette";
import NotifiesList from './notifies-list';
import FriendshipNotifier from './notifies/FriendshipNotifier';



/**
 * This component renders the main application menu bar.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param title
 * @param allowBack
 * @param goBack
 * @returns {*}
 * @constructor
 */
const MainAppBar = ({allowBack, disableNotify, navigation, title="Jako", goBack, TitleComponent=false}) => (
    <Header
        style={styles.root}
        noShadow
        androidStatusBarColor={palette.primary.variant}
    >
        {allowBack && (
            <Left style = { styles.left }>        
                <Button transparent onPress={() => goBack()}>
                    <Icon name="arrow-left" size={18}/>
                </Button>
            </Left>
        )}
        {TitleComponent !== false && (
            <View style={styles.titleComponent}>
                {TitleComponent}
            </View>
        )}
        {!TitleComponent && (
            <Body style={styles.body}>
                <View style = { { flexDirection : "row" } }>
                    <Icon name="coins" size={18} style = { {marginRight : 10,} } />
                    <Text>
                        100
                    </Text>
                </View>
            </Body>
        )}
        {!disableNotify && (
            <Right style = { styles.right }>
                <FriendshipNotifier navigation = { navigation } />
                <NotifiesList navigation = { navigation } />
            </Right>
        )}
    </Header>
);
MainAppBar.propTypes = {
    navigation  : PropTypes.object.isRequired,
    title       : PropTypes.any,
    allowBack   : PropTypes.bool,
    TitleComponent : PropTypes.any,
};

const palette = stylesPalette();
const styles = StyleSheet.create({
    root : {
        backgroundColor : "#FFF",
    },
    left : {
        flex : 1,
    },
    titleComponent : {
        flex : 1,
        paddingVertical : 4,
    },
    body : {
        flex : 6,
        alignItems : "flex-start",
        paddingLeft : 20,
    },
    right : {
        flex : 2,
        justifyContent : "center",
        alignItems : "center",
    },
});

export default MainAppBar;