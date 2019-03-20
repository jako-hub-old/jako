import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "./RegisterForm";
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { Toast } from 'native-base';

/**
 * This component allows to handle the user register
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @class RegisterComponent
 * @extends {React.Component}
 */
class RegisterComponent extends React.Component {
    state = {
        form : {
            phoneNumber : "",
        },
        send    : false,
        error   : false,
    };

    /**
     * This function allows to control the input value change
     *
     * @param {*} name
     * @param {*} value
     * @memberof RegisterComponent
     */
    onChange(name, value) {
        this.setState(({form}) => ({
            form : {
                ...form,
                [name] : value,
            },
        }));
    }

    goToLogin() {
        this.props.navigation.navigate("Login");
    }

    onRegister() {
        const {
            phoneNumber,
        } = this.state.form;

        const showMessage = (text) => Toast.show({ text });

        if(phoneNumber === "") {            
            this.setState({error : true}, () => {
                showMessage('Ingresa un número de télefono');
            });
            return false;
        }
        this.props.startLoading();
        console.log("usuario:", phoneNumber);
        this.props.doPost(endpoints.usuarios.nuevo, {
            usuario : phoneNumber,
        })
            .then(response => {
                if(response.error_controlado) {
                    console.log("Error controlado: ", response);
                    showMessage('Información inválida');                    
                } else {
                    // Validar código.
                    console.log("Success: ", response);
                }
                this.props.stopLoading();
            })
            .catch(response => {
                console.group("Error en registro: ");
                console.log(response);
                console.groupEnd();
                showMessage('Ocurrió un error inesperado');
                this.props.stopLoading();
            });
    };

    render() {
        const {
            form,
            error,
        } = this.state;

        return (
            <RegisterForm
                form            = { form                        }
                onChange        = { this.onChange.bind(this)    }
                goToLogin       = { () => this.goToLogin()      }
                onSubmit        = { () => this.onRegister()     }
                error           = { error                       }
            />
        )
    }
}

RegisterComponent.propTypes = {
    navigation : PropTypes.object.isRequired,
};

RegisterComponent.propTypes = {
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
};

export default withApi(RegisterComponent);   