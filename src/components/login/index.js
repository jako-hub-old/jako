import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    Text,
    Input,
    Button,
    Form,
    Item,
    Label,
} from 'native-base';
import SubmitButton from "../commons/forms/SubmitButton";

import LoginForm from "./LoginForm";

class LoginComponent extends React.Component {
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

    goToRegister() {
        this.props.navigation.navigate("Register");
    }

    render() {
        const {
            form,
            viewPassword,
        } = this.state;
        return (
            <LoginForm
                form            = {form}
                onChange        = {this.onChange.bind(this)}
                goToRegister    = {() => this.goToRegister()}
                togglePassword  = {() => this.togglePassword()}
                viewPassword    = {viewPassword}
            />
        )
    }
}

LoginComponent.propTypes = {
    navigation : PropTypes.object.isRequired,
};

export default LoginComponent;