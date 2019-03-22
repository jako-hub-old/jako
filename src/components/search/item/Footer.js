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

const Footer = ({totalComments=0, onAdd, onToggleComments, onLike}) => (
    <View style={styles.root}>
        <Button style={styles.button} transparent onPress={onAdd}>
            <Icon name="user-plus" size={20}/>
        </Button>
        <Button style={styles.button} transparent onPress={onToggleComments}>
            <Icon name="comment" size={20}/>
            <View style={styles.commentsCount}>
                <Text style={styles.commentsCountText}>{totalComments}</Text>
            </View>
        </Button>
        <Button style={styles.button} transparent onPress={onLike}>
            <Icon name="heart" size={20}/>
        </Button>
    </View>
);

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
    totalComments       : PropTypes.number,
    onAdd               : PropTypes.func,
    onToggleComments    : PropTypes.func,
    onLike              : PropTypes.func, 
};

export default Footer;