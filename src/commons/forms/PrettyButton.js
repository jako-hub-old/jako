import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import stylesPalette from "../../utils/stylesPalette";
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loaders';

const PrettyButton = ({children, small, disabled, primary, icon, loading, ...otherProps}) => {
    const buttonStyles = [
        styles.btnRoot, 
        (disabled? styles.disabled : null),
        (primary? styles.btnPrimary : null),
        (small? styles.small : null),
    ];
    const textStyles = [
        styles.btnText,
        (primary? styles.btnPrimaryText : {}),
    ];
    return (
        <Button style={buttonStyles} {...otherProps} rounded disabled  = { disabled } >
            <Text style={ textStyles }>
                {children} {!loading && (icon)}
            </Text>
            {loading && (<LoadingSpinner />)}
        </Button>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    btnRoot : {
        elevation : 0,
        borderColor : palette.primary.color,
        borderWidth : 2,
        backgroundColor : "transparent",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 20,
        marginHorizontal : 5,
    },
    btnPrimary : {
        backgroundColor : palette.primary.color,
    },
    btnPrimaryText : {
        color : "#fff",
    },
    btnText : {
        color : palette.primary.color,
    },
    disabled : {
        backgroundColor : "#b0bec5",
        color : "#cfd8dc"
    },
    small : {
        paddingVertical : 2,
        paddingTop : 2,
        paddingBottom : 2,
        paddingHorizontal : 15,
        height : 35,
    },
});

PrettyButton.propTypes = {
    label       : PropTypes.string,
    disabled    : PropTypes.bool,
    small       : PropTypes.bool,
};

export default PrettyButton;