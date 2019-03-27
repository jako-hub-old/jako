import React from 'react';
import {
    Header,
    Body,
    Button,
    Left,
    Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, } from 'react-native';
import PropTypes from 'prop-types';
import { displayName as appName } from '../../../app';
import stylesPalette from "../../utils/stylesPalette";



/**
 * This component renders the main application menu bar.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param title
 * @param allowBack
 * @param goBack
 * @returns {*}
 * @constructor
 */
const MainAppBar = ({allowBack, title=appName, goBack, TitleComponent=false}) => (
    <Header
        style={styles.root}
        androidStatusBarColor={palette.primary.variant}
    >
        {allowBack && (
            <Left>            
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
                {title && (<Title>{title}</Title>)}                
            </Body>
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
        backgroundColor : palette.primary.color,
    },
    titleComponent : {
        flex : 1,
        paddingVertical : 4,
    },
    body : {
        alignItems : "center",
    },
});

export default MainAppBar;