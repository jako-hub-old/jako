import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import defaultImage from '../../assets/images/game-default-image.png'

/**
 * This component renders the image preview.
 * @param {*} param0 
 */
const GameImagePreview = ({imageUrl}) => {
    return (
        <View style={styles.root}>
            {!imageUrl && (
                <Image style = { styles.image } source = { defaultImage } />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        padding : 5,
        borderRadius : 10,
    },
    icon : {
        color : '#bdbdbd',
    },
    image : {
        width : 80,
        height : 80,
    },
});

GameImagePreview.propTypes = {
    imageUrl    : PropTypes.string,
    onPress     : PropTypes.func,
};

export default GameImagePreview;