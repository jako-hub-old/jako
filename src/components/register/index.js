import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "./RegisterForm";
import { withLoader } from '../../providers';


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
            password    : "",
        },
        viewPassword : false,
    };

    onChange(name, value) {
        this.setState(({form}) => ({
            form : {
                ...form,
                [name] : value,
            },
        }));
    }

    togglePassword() {
        this.setState({
            viewPassword : !this.state.viewPassword,
        })
    }

    goToLogin() {
        this.props.navigation.navigate("Login");
    }

    onRegister() {
        
    };

    render() {
        const {
            form,
            viewPassword,
        } = this.state;

        return (
            <RegisterForm
                form            = { form                        }
                onChange        = { this.onChange.bind(this)    }
                goToLogin       = { () => this.goToLogin()      }
                togglePassword  = { () => this.togglePassword() }
                viewPassword    = { viewPassword                }
                onSubmit        = { () => this.onRegister()     }
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
};

export default withLoader(RegisterComponent);   