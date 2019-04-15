import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import { consoleError } from '../../utils/functions';
import { withApi } from '../../providers';
import Share from 'react-native-share';
import endpoints from '../../configs/endpoints';

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
    shareGame() {
        const {gameCode, userCode, startLoading, stopLoading} = this.props;
        startLoading();
        this.props.doPost(endpoints.juego.compartirConAmigos, {
            juego : gameCode,
            jugador : userCode,
        }).then(() => {
            stopLoading();
        })
        .catch( () => {
            stopLoading();
        });
    }

    render = () => {        
        return (
            <Button transparent style={styles.root} onPress = { () => this.shareGame() }>
                <Icon
                    style= { styles.icon }
                    name = "share-alt" 
                    size = { 20 }
                />
            </Button>
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
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    userCode        : PropTypes.any,
    doPost          : PropTypes.func,
};

export default withApi(ShareGameButton);