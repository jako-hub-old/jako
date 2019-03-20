import React, { useState } from 'react';
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
 * @param goToLogin
 * @param send
 * @param error
 * @returns {*}
 * @constructor
 */
const RegisterForm = ({form, onChange, error, onSubmit, goToLogin}) => {
    return (
        <View style={styles.root}>
            <ScrollView>
                <Form style={styles.form}>
                    <View style={{alignItems : "center"}}>
                        <Text uppercase>
                            Registrate en jako
                        </Text>
                    </View>
                    <Item 
                        floatingLabel 
                        style           = { styles.row } 
                        error           = { error }
                    >
                        <Label>Teléfono</Label>
                        <Input
                            keyboardType    = "numeric"
                            value           = {form.phoneNumber}
                            onChangeText    = {text => onChange('phoneNumber', text)}
                        />
                    </Item>
                    <View style={styles.buttonRow}>
                        <SubmitButton block primary onPress={onSubmit}>
                            <Text>Registrarme</Text>
                        </SubmitButton>
                    </View>
                    <View style={styles.buttonRow}>
                        <Button bordered block rounded onPress={goToLogin}>
                            <Text>Ya tengo cuenta</Text>
                        </Button>
                    </View>
                </Form>
            </ScrollView>
        </View>
    );
};

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
    }
});

RegisterForm.propTypes = {
    onChange : PropTypes.func,
    onSubmit : PropTypes.func,
    form : PropTypes.shape({
        phoneNumber : PropTypes.string,
        password    : PropTypes.string,
    }),
    goToLogin       : PropTypes.func,
    viewPassword    : PropTypes.bool,
    togglePassword  : PropTypes.func,
    send            : PropTypes.bool,
    error           : PropTypes.bool,
};

export default RegisterForm;