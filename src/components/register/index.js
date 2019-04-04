import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "./RegisterForm";
import { withApi, withSession } from '../../providers';
import endpoints from '../../configs/endpoints';
import { Toast } from 'native-base';
import { consoleError, consoleInfo } from '../../utils/functions';
import { IMEI } from '../../utils/constants';
import { PermissionsAndroid } from 'react-native';
import NoPermission from '../login/NoPermission';
import VerifyCode  from '../verify-code';

/**
 * This component allows to handle the user register
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @class RegisterComponent
 * @extends {React.Component}
 */
class RegisterComponent extends React.Component {
    _isMounted = true;
    state = {
        form : {
            phoneNumber : "", //Todo: remove
        },
        send        : false,
        error       : false,
        permission  : false,
        requesting  : true,
        imei        : null,
        openVerify  : false,
    };

    /**
     * This function allows to control the input value change
     *
     * @param {*} name
     * @param {*} value
     * @memberof RegisterComponent
     */
    onChange(name, value) {
        if(this._isMounted) {
            this.setState(({form}) => ({
                form : {
                    ...form,
                    [name] : value,
                },
            }));
        }        
    }

    componentDidUpdate(propProps) {
        const {reading, logged} = propProps.sessionStack;
        if(!reading && logged && this._isMounted) {
            this._isMounted = false;
            this.props.startLoading();
            setTimeout(() => {                
                this.props.stopLoading();
                this.props.navigation.navigate("Main");
            }, 500)
        }
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
                const {error_controlado, validacion, verificado, codigo_usuario, crear_juego} = response;
                if(error_controlado) {
                    showMessage('Error inesperado, contacte al administrador');
                } else if(validacion) {

                } else {
                    if(verificado) {                        
                        this.onVerifyCode(codigo_usuario, crear_juego);
                    } else {
                        showMessage('Hemos enviado un mesaje de texto con el código');
                        this.setState({
                            openVerify : true,
                        });
                    }
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

    onVerifyCode(userCode, crearJuego) {
        const {form:{phoneNumber}, imei} = this.state;
        this.props.login({
            imei,
            user : phoneNumber,
            userCode,
            crearJuego,
        })
        .then(() => {
            this.props.navigation.navigate("Main");
        })
        .catch(response => {
            consoleError("Login: ", response);
            Toast.show({ text : "Error inesperado al iniciar sesión" });
        });
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
                onCodeVerified  = { this.onVerifyCode.bind(this) } 
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
    navigation      : PropTypes.object.isRequired,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    sessionWrite    : PropTypes.func,
    sessionWriteAll : PropTypes.func,
    logout          : PropTypes.func,
    sessionStack    : PropTypes.object,
    login           : PropTypes.func,
};

export default withApi(withSession(RegisterComponent));