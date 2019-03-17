import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "./RegisterForm";
import LoginForm from "../login";

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
        this.props.navigation.goBack();
    }

    render() {
        const {
            form,
            viewPassword,
        } = this.state;

        return (
            <RegisterForm
                form        = {form}
                onChange    = {this.onChange.bind(this)}
                goToLogin   = {() => this.goToLogin()}
                togglePassword  = {() => this.togglePassword()}
                viewPassword    = {viewPassword}
            />
        )
    }
}

RegisterComponent.propTypes = {
    navigation : PropTypes.object.isRequired,
};

export default RegisterComponent;