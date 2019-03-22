import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "./RegisterForm";
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { Toast } from 'native-base';
import { consoleError, consoleInfo } from '../../utils/functions';
import { IMEI } from '../../utils/constants';
import { PermissionsAndroid } from 'react-native';
import NoPermission from '../login/NoPermission';
//import VerifyCode from './VerifyCode';
import { VerifyCode } from '../';

/**
 * This component allows to handle the user register
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @class RegisterComponent
 * @extends {React.Component}
 */
class RegisterComponent extends React.Component {
    state = {
        form : {
            phoneNumber : "3176739653", //Todo: remove
        },
        send        : false,
        error       : false,
        permission  : false,
        requesting  : true,
        imei        : null,
        openVerify  : true,
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

    componentDidMount() {
        this.requestPhonePermissions();
    }

    async requestPhonePermissions() {
        const stopRequesting = () => this.setState({requesting : false});
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                {
                    message : "Para falicitar tu experiencia en la aplicación requerimos de ciertos permisos",
                    buttonPositive : 'Continuar',
                }
            );
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    permission : true,
                    requesting : false,
                }, () => {
                    this.getPhoneImei();
                });
            } if(granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                console.log("No preguntar de nuevo");
                stopRequesting();
            } else {
                stopRequesting();
            }
            
        } catch(err) {
            consoleError('Error al solicitar el permiso', granted);
        }
    }

    /**
     * This function allows to get the phone imei.
     */
    getPhoneImei() {
        IMEI.getImei().then(imeiList => {
            const [phoneImei=false] = imeiList;
            this.setState({
                imei : phoneImei,
            });
        });
    }

    /**
     * This funciton allows to trigger the register process.
     */
    onRegister() {
        const {
            form:{phoneNumber},
            imei,
        } = this.state;

        /**
         * This little function allows as to reuse and reduce code to display a toast.
         */
        const showMessage = (text) => Toast.show({ text });

        if(phoneNumber === "") {
            this.setState({error : true}, () => {
                showMessage('Ingresa un número de télefono');
            });
            return false;
        }
        
        if(!imei) {
            showMessage('Asegurate de que la aplicación tiene permisos sobre el teléfono');
            return false;
        }

        this.props.startLoading();
        
        const data = {
            usuario : `${phoneNumber}`,
            imei    : imei,
        };

        this.props.doPost(endpoints.usuarios.validar, data)
            .then(response => {
                const {error_controlado, validacion} = response;
                if(error_controlado) {
                    showMessage('Error inesperado, contacte al administrador');                    
                } else if(validacion) {

                } else {
                    // Validar código.
                }
                consoleInfo("Info registro", response);
                this.props.stopLoading();
            })
            .catch(response => {
                consoleError("Error registro", response);
                showMessage('Ocurrió un error inesperado');
                this.props.stopLoading();
            });
    };


    requestAgain() {
        this.requestPhonePermissions();
    }

    onVerifyCode() {
        alert("Code is verified!");
    }

    render() {
        const {
            form,
            error,
            permission,
            requesting,
            openVerify,
            imei,
        } = this.state;

        if(openVerify && imei) {
           return (
            <VerifyCode 
                userNumber      = {form.phoneNumber             }
                imei            = { imei                        }
                onCodeVerified  = { () => this.onVerifyCode()   } 
            />
           );
        }

        return (
            <>
                {(requesting || permission) && (
                    <RegisterForm
                        form            = { form                        }
                        onChange        = { this.onChange.bind(this)    }
                        goToLogin       = { () => this.goToLogin()      }
                        onSubmit        = { () => this.onRegister()     }
                        error           = { error                       }
                    />
                )}
                {(!requesting && !permission) && (
                        <NoPermission 
                            requestAgain = { () => this.requestAgain() }
                        />
                )}
            </>
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