import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import Share from 'react-native-share';

const shareGame = (code, startLoading, stopLoading) => {
    const text = `jakoapp://juego/${code}`;    
    const url = `whatsapp://send?text=${text}`;
    const shareOptions = {
        title: 'Share via',
        message: 'some message',
        url: 'some share url',
        social: Share.Social.WHATSAPP
    };
    Share.shareSingle(shareOptions);
    
}

class ShareGameButton extends React.PureComponent {

    render = () => { 
        return (
            <>
            <Button transparent style={styles.root} onPress = { () => this.props.onPress? this.props.onPress(this.props.gameCode) : null }>
                <Icon
                    style= { styles.icon }
                    name = "share-alt" 
                    size = { 20 }
                />
            </Button>
            </>
        );
    };
}

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
    onPress : PropTypes.func,
};

export default ShareGameButton;