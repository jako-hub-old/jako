import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const SimpleTouch = ({children, onPress, wrapType="center"}) => (
    <TouchableOpacity onPress = { onPress } style = { {alignSelf : wrapType} }>
        {children}
    </TouchableOpacity>
);

SimpleTouch.propTypes = {
    onPress : PropTypes.func,
};

export default SimpleTouch;