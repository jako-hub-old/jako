import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, } from 'react-native';
import { 
    View,
    Text,
 } from 'native-base';
import { Button, PrettyButton,} from '../forms';
import { withApi } from '../../providers';

class CancelFriendshipButton extends React.PureComponent {
    render() {
        return (
            <View style = { styles.root }>
                <View>
                <PrettyButton primary>Amigos (Remover)</PrettyButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        marginTop : 10,
        alignItems : "center"
    },
});

CancelFriendshipButton.propTypes = {
    playerCode : PropTypes.any,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
};

export default withApi(CancelFriendshipButton);