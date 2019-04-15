import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, } from 'react-native';
import { 
    View,
    Text,
 } from 'native-base';
import { PrettyButton,} from '../forms';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addMessage, consoleError } from '../../utils/functions';
import { LoadingSpinner } from '../loaders';

class FriendshipButton extends React.Component {
    state = {
        loading : false,
    };

    onRequestFriendship() {
        const {userCode, playerCode, doPost} = this.props;
        this.setState({
            loading : true,
        });
        doPost(endpoints.jugador_solicitud.nuevo, {
            jugador         : userCode,
            jugador_destino : playerCode,
        })
        .then((response) => {
            const {error, error_controlado, validacion} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al enviar la solicitud");
                consoleError(error);
            } else if(validacion){
                addMessage(validacion);
            } else {
                addMessage("Se ha enviado tu solicitud de amistad");
                this.setState({loading : false});
                // Todo: add to pending requests.
            }
            this.setState({
                loading : false,
            });
        })
        .catch(response => {
            consoleError(response);
            addMessage("Ocurrió un error al enviar la solicitud");
            this.setState({
                loading : false,
            });
        });
    }

    render() {
        const {
            loading,
        } = this.state;
        return (
            <View style = { styles.root }>
                <View>
                    <PrettyButton 
                        primary 
                        loading = {loading} 
                        icon = {(<Icon name = "telegram-plane" size={18}  />)}
                        onPress = { () => this.onRequestFriendship() }
                    >
                        Solicitar amistad 
                    </PrettyButton>
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

FriendshipButton.propTypes = {
    playerCode : PropTypes.any,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
};

export default withApi(FriendshipButton);