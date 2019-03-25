import React from 'react';
import {
    Header,
    Body,
    Button,
    Left,
    Right,
    Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
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
const MainAppBar = ({allowBack, title=appName, goBack}) => (
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
        <Body style={styles.body}>
            <Title>{title}</Title>
        </Body>
    </Header>
);
MainAppBar.propTypes = {
    navigation  : PropTypes.object.isRequired,
    title       : PropTypes.string,
    allowBack   : PropTypes.bool,
};

const palette = stylesPalette();
const styles = StyleSheet.create({
    root : {
        backgroundColor : palette.primary.color,
    },
    body : {
        alignItems : "center",
    },
});

export default MainAppBar;