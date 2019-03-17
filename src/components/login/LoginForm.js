import React from 'react';
import {ScrollView, View} from "react-native";
import {Button, Form, Input, Item, Label, Text} from "native-base";
import { StyleSheet } from 'react-native';
import SubmitButton from "../commons/forms/SubmitButton";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * This component renders the login form.
 * @param form
 * @param onChange
 * @param onSubmit
 * @param goToRegister
 * @returns {*}
 * @constructor
 */
const LoginForm = ({form, onChange, onSubmit, goToRegister, viewPassword, togglePassword}) => (
    <View style={styles.root}>
        <ScrollView>
            <Form style={styles.form}>
                <Item floatingLabel style={styles.row}>
                    <Label>Teléfono</Label>
                    <Input
                        value           = {form.phoneNumber}
                        onChangeText    = {text => onChange('phoneNumber', text)}
                    />
                </Item>
                <Item style={styles.row}>
                    <Input
                        placeholder     = {"Contraseña"}
                        value           = {form.password}
                        onChangeText    = {text => onChange('password', text)}
                        secureTextEntry = {!viewPassword}
                    />
                    <Button transparent style={styles.passwordButton} onPress={togglePassword}>
                        <Icon name={viewPassword? "eye" : "eye-slash"} size={20}/>
                    </Button>
                </Item>
                <View style={styles.buttonRow}>
                    <SubmitButton block primary onPress={onSubmit}>
                        <Text>Iniciar sesión</Text>
                    </SubmitButton>
                </View>
                <View style={styles.buttonRow}>
                    <Button bordered block rounded onPress={goToRegister}>
                        <Text>Registrarme</Text>
                    </Button>
                </View>
            </Form>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    root : {
        paddingHorizontal : 40,
    },
    row : {
        marginBottom : 20,
    },
    form : {
        flex : 1,
    },
    buttonRow: {
        marginBottom : 15,
    },
    passwordButton : {
        width : 45,
        justifyContent : "center",
    },
});

LoginForm.propTypes = {
    onChange : PropTypes.func,
    onSubmit : PropTypes.func,
    form : PropTypes.shape({
        phoneNumber : PropTypes.string,
        password    : PropTypes.string,
    }),
    goToRegister : PropTypes.func,
    viewPassword : PropTypes.bool,
    togglePassword : PropTypes.func,
};

export default LoginForm;