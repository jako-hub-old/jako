import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Thumbnail,
} from 'native-base';
import { StyleSheet } from 'react-native';
import {DEFAULT_USER_IMG} from 'react-native-dotenv';
import { IconButton, } from '../../commons/forms';
import stylesPalette from '../../utils/stylesPalette';

const palette = stylesPalette();

/**
 * This component only renders the profile view.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const Header = ({photo, fullName, alias}) => (
    <View style = { styles.root }>
        <View style = { styles.contentWrapper}>
            <View style = {styles.picWrapper}>
                <View style = { styles.thumbWrapper }>
                    <Thumbnail source={{uri : photo || DEFAULT_USER_IMG}} />
                    <View style={styles.buttonTip}>
                        <IconButton icon = "camera" small color = { "#FFF" } />
                    </View>
                </View>
            </View>
            <View style = { styles.userInfo }>
                <Text>{fullName}</Text>
                {alias && (<Text style = { styles.alias }>({alias})</Text>)}
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flexDirection   : "row",        
    },
    contentWrapper : {
        flex            : 1,
        flexDirection   : "column",
        justifyContent  : "center",
    },
    picWrapper : {
        flexDirection : "row",
        justifyContent  : "center",
    },
    thumbWrapper : {
        padding         : 10,
        backgroundColor : "#e0e0e0",
        borderRadius    : 50,
    },    
    buttonTip : {
        position : "absolute",
        left     : "80%",
        top      : "80%",
        backgroundColor : palette.primary.color,
        borderRadius : 50,
    },
    userInfo : {
        flexDirection   : "row",
        justifyContent  : "center",
        marginTop       : 10,
    },
    alias : {
        marginLeft  : 10,
        color       : "#bdbdbd",
    },
});

Header.propTypes = {
    photo    : PropTypes.string,
    fullName : PropTypes.string,
    alias    : PropTypes.string,
};

export default Header;