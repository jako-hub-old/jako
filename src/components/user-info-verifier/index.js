import React from 'react';
import { withApi, withSession } from '../../providers';
import PropTypes from 'prop-types';
import { consoleInfo, consoleError } from '../../utils/functions';
import endpoints from '../../configs/endpoints';
import {
    Toast,
} from 'native-base';
import PseudonymHelper from './PseudonymHelper';


class UserInfoVerifier extends React.Component {
    state = {
        pseudonymHelper : false,
    }

    componentDidMount() {
        this.getUserInfo();
    }

    toggleFlag(key) {
        this.setState({
            [key] : !this.state[key],
        });
    }

    getUserInfo() {
        const {userCode} = this.props.sessionStack;
        this.props.doPost(endpoints.usuarios.informacion, {
            codigo_usuario : userCode,
        })
        .then(response => {
            const {error_controlado, error} = response;
            if(!error_controlado && !error) {
                const {seudonimo} = response;
                this.props.sessionWrite("user_info", response);
                if(!seudonimo) {
                    this.setState({
                        pseudonymHelper : true
                    });
                }
            } else {
                Toast.show({text : "Error al obtener la información del jugador"});
                consoleError("Fetch user info: ", response);
            }
        })
        .catch(response => {
            Toast.show({text : "Error al obtener la información del jugador"});
            consoleError("Fetch user info: ", response);
        });
    }

    onSavePseudonym(pseudonym) {
        const userInfo = {
            ...this.props.sessionStack.user_info,
            pseudonym,
        };
        this.props.sessionWrite("user_info", userInfo);
        this.setState({
            pseudonymHelper : false,
        });
        // Todo : Call next validation.
    }

    render() {
        const {
            pseudonymHelper
        } = this.state;
        return (
            <>
                {true && (
                    <PseudonymHelper 
                        open    = {pseudonymHelper}
                        onSave  = {this.onSavePseudonym.bind(this)}
                    />
                )}
            </>
        );
    }
}

UserInfoVerifier.propTypes = {
    sessionStack    : PropTypes.object,
    sessionWrite    : PropTypes.func,
    doPost          : PropTypes.func,
};

export default withApi(withSession(UserInfoVerifier));