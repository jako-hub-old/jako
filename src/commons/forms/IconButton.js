import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * This component renders a simple icon button.
 * @param {*} param0 
 */
const IconButton = ({icon, size=25, disabled, onPress}) => {
    const button = (    
        <View style={{...styles.root, ...(disabled? styles.disabled : {})}}>
            <Icon name={icon} size={size} />
        </View>
    );
    if(disabled) return button;
    return (
        <TouchableOpacity onPress={!disabled? onPress : null}>
            {button}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root : {
        alignItems      : "center",
        justifyContent  : "center",
        borderRadius    : 50,
        height          : 60,
        width           : 60,
    },
    disabled : {
        opacity : 0.3,
    },
});

IconButton.propTypes = {
    icon : PropTypes.string,
    size : PropTypes.number,
    disabled : PropTypes.bool,
    onPress  : PropTypes.func,
};

export default IconButton;