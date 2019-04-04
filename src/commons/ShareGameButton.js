import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'native-base';
import {
    View,    
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { consoleError } from '../utils/functions';
import { withLoader } from '../providers';
import Share from 'react-native-share';

const shareGame = (code, startLoading, stopLoading) => {
    const text = `jakoapp://juego/${code}`;    
    const url = `whatsapp://send?text=${text}`;
    /*
    startLoading();
    Linking.canOpenURL(url).then(supported => {
        if(supported) {
            Linking.openURL(url);
        } else {
            alert("Instale whatsapp");
        }
        stopLoading();
    })
    .catch( err => {
        consoleError("Validate", err);
        stopLoading();
    });  
     */
    const shareOptions = {
        title: 'Share via',
        message: 'some message',
        url: 'some share url',
        social: Share.Social.WHATSAPP
    };
    Share.shareSingle(shareOptions);
    
}

const ShareGameButton = ({gameCode, startLoading, stopLoading}) => {
    return (
        <Button transparent style={styles.root} onPress = { () => shareGame(gameCode, startLoading, stopLoading) }>
            <Icon
                style= { styles.icon }
                name = "share-alt" 
                size = { 20 }
            />
        </Button>
    );
};

const styles = StyleSheet.create({
    root : {
        width               : 40,
        justifyContent      : "center",
        marginHorizontal    : 5,
    },
    icon : {

    },
});

ShareGameButton.propTypes = {
    gameCode : PropTypes.any,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
};

export default withLoader(ShareGameButton);