import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Button,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from "../../../utils/stylesPalette";
import {
    ShareGameButton,
} from '../../../commons';


const RenderIcon = ({iconName}) => (
    <Icon 
        name    = {iconName}
        size    = {20}
        style   = {styles.defaultIcon}
    />
);

/**
 * This component renders the footer of an item
 * @param {*} param0 
 */
const Footer = ({onAdd, onLike, liked}) => {
    const likeButtonStyles = {
        ...styles.defaultIcon,
        ...(liked? styles.buttonLikePressed : {}),
    };
    return (
        <View style={styles.root}>
            <Button style={styles.button} transparent onPress={onAdd}>
                <RenderIcon iconName={"user-plus"} />
            </Button>
            <Button style={styles.button} transparent onPress={onLike}>
                <Icon 
                    name="heart" 
                    size={20}
                    style={likeButtonStyles}
                />
            </Button>
            <ShareGameButton />
        </View>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flex            : 1,
        flexDirection   : 'row',
        justifyContent  : 'flex-end',
    },
    button : {
        width               : 40,
        justifyContent      : "center",
        marginHorizontal    : 5,
    },
    defaultIcon : {
        color : '#bdbdbd',
    },
    buttonLikePressed : {
        color : '#ef5350',
    },
    commentsCount : {
        position            : "absolute",
        top                 : "75%",
        left                : "80%",
        backgroundColor     : palette.primary.color,
        paddingHorizontal   : 5,
        borderRadius        : 50,
    },
    commentsCountText : {
        color : "#FFF",
    },
});

Footer.propTypes = {
    onAdd               : PropTypes.func,
    onLike              : PropTypes.func, 
    liked               : PropTypes.bool,
};

export default Footer;