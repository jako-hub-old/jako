import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../commons/modals';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage } from '../../utils/functions';
import { LoadingSpinner } from '../../commons/loaders';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NewContainer = ({date, text, onPress}) => (
    <View style = { styles.rootContainer }>
        <View style = { styles.iconWrapper }>
            <Icon name = "futbol" size = {35} />
        </View>
        <View style = { styles.textWrapper }>
            <TouchableOpacity onPress = {onPress}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

class MyInvitations extends React.Component {
    state = {
        invitations : [],
        loading : false,
    };

    componentDidMount() {
        this.fetchInvitations();
    }

    async fetchInvitations() {
        this.setState({loading : true});
        const {doPost, userCode} = this.props;
        const response = await doPost(endpoints.juego.invitaciones, {
            jugador : userCode,
        });
        try {
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al listar las publicaciones del jugador");
            } else {
                this.setState({
                    invitations : response,
                });
            }
        } catch(err) {
            addMessage("Ocurrió un error al listar las publicaciones del jugador");
        } finally {
            this.setState({loading : false});
        }
    }

    renderList() {
        const {invitations=[]} = this.state;
        const {goToGame} = this.props;
        return (
            <View style = { styles.root }>
                {invitations.length === 0 && (
                    <Text style = {{textAlign : "center"}}>No hay invitaciones pendientes</Text>
                )}
                {invitations.map((item, key) => (
                    <NewContainer 
                        key = {`item-new-profile-${key}`} 
                        date = {item.fecha}
                        text = {item.nombre_juego}
                        onPress = {() => {                            
                            if(goToGame) goToGame(item);
                            this.props.onClose();
                        }}
                    />
                ))}
            </View>
        );
    }

    render() {
        const {
            open,
            onClose
        } = this.props;
        const {loading} = this.state;
        if (loading) contetn = (<View style = { styles.rootLoading }><LoadingSpinner /></View>);
        else content = this.renderList();
        return (
            <SimpleModal
                open    = { open    }
                onClose = { onClose }
            >
                {content}
            </SimpleModal>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    iconWrapper : {
        flex : 2,
        justifyContent : "center",
        alignItems : "center",
    },
    textWrapper : {
        flex : 10,
    },
    rootContainer : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
});

MyInvitations.propTypes = {
    open : PropTypes.bool,
    onClose : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
    goToGame        : PropTypes.func,
};

export default withApi(MyInvitations);