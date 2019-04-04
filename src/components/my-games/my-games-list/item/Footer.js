import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from '../../../../utils/stylesPalette';
import {
    ShareGameButton,
} from '../../../../commons/buttons';

/**
 * This component renders the footer of an item
 * @param {*} param0 
 */
const Footer = ({onLike, liked, gameCode}) => {
    const likeButtonStyles = {
        ...styles.defaultIcon,
        ...(liked? styles.buttonLikePressed : {}),
    };
    return (
        <View style={styles.root}>
            <Button style={styles.button} transparent onPress={onLike}>
                <Icon 
                    name="heart" 
                    size={20}
                    style={likeButtonStyles}
                />
            </Button>
            <ShareGameButton gameCode = { gameCode }/>
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
    onLike              : PropTypes.func, 
    liked               : PropTypes.bool,
    gameCode            : PropTypes.any,
};

export default Footer;