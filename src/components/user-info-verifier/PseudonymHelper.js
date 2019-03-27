import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Label,
    Toast,
} from 'native-base';
import { SubmitButton } from '../commons';
import { replaceSpaces, consoleError, addMessage } from '../../utils/functions';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';


/** 
 * This component renders the form
 */
const PseudoForm = ({onSubmit, loading, isValidForm, onChange, email, name, pseudonym}) => {
    
    return (
        <Form style={styles.form}>
            <Item floatingLabel>
                <Label>{"Tu nombre"}</Label>
                <Input 
                    disabled = { loading }
                    value    = { name }
                    onChangeText = { text => onChange("name", text) }
                />
            </Item>  
            <Item floatingLabel>
                <Label>{"Un alias"}</Label>
                <Input 
                    disabled = { loading }
                    value    = { pseudonym }
                    onChangeText = { text => onChange("pseudonym", replaceSpaces(text, '_')) }
                />
            </Item>  
            <Item floatingLabel>
                <Label>{"E-mail"}</Label>
                <Input 
                    disabled = { loading }
                    value    = { email }
                    keyboardType = {"email-address"}
                    onChangeText = { text => onChange("email", text) }
                />
            </Item>  
            <View style={styles.formRow}>
                <SubmitButton 
                    onPress = {() => onSubmit()}
                    label="Guardar"
                    primary
                    block
                    disabled={!isValidForm}
                />
            </View>
        </Form>
    );
}

class PseudonymHelper extends React.Component {
    state = {
        pseudonym   : "",
        name        : "",
        email       : "",
    };

    onChange(key, value) {
        this.setState({
            [key] : value
        });
    }

    isValidForm() {
        const {
            email,
            pseudonym,
            name,            
        } = this.state;        
        return email        !== "" && this.isValidEmail(email) &&
                pseudonym   !== "" && 
                name        !== "";
    }

    isValidEmail(email) {
        return true;
    }

    onSave() {
        const {
            pseudonym,
            name,
            email,
        } = this.state;
        this.props.startLoading();
        const {userCode} = this.props;
        this.props.doPost(endpoints.usuarios.guardarPseudonimo, {
            usuario         : userCode,
            seudonimo       : pseudonym,
            correo          : email,
            nombre_corto    : name,
        })
        .then(response => {
            const {validacion, error, error_controlado} = response;
            if(validacion) {
                addMessage(validacion);
            } else if(error || error_controlado){
                addMessage("Ocurrió un error al guardar el seudonimo");
            } else {
                addMessage("Información actualizada");
                this.props.onSave(pseudonym);
            }
            this.props.stopLoading();
        })
        .catch(response => {
            this.props.stopLoading();
            consoleError("Guardar seudonimo: ", response);
        });
    }

    render() {
        const {
            open,
            loading,
        } = this.props;
        const {
             name,
             email,
             pseudonym,
        } = this.state;
        return (
            <Modal
                visible         = {open}
                onRequestClose  = {() => null}
                animationType   = "slide"
                transparent
            >
                <View style={styles.backDrop}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Antes de continuar por favor completa tu información.
                            </Text>
                        </View>
                        <PseudoForm 
                            isValidForm = {this.isValidForm()}
                            email       = {email}
                            pseudonym   = {pseudonym}
                            onChange    = {this.onChange.bind(this)}
                            name        = {name}
                            loading     = {loading}
                            onSubmit    = {val => this.onSave(val)}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

styles = StyleSheet.create({
    backDrop : {
        backgroundColor     : "rgba(0,0,0,0.3)",
        flex                : 1,
        alignItems          : "center",
        justifyContent      : "center",
    },
    content : {
        backgroundColor : "#FFF",
        padding : 20,
        marginHorizontal : 20,
    },
    header : {
        
    },
    headerText : {
        textAlign : "center",
    },
    form : {
        paddingVertical : 15,
    },
    formRow : {
        marginTop : 20,
    },
});

PseudonymHelper.propTypes = {
    onClose         : PropTypes.func,
    onSave          : PropTypes.func,
    open            : PropTypes.bool,    
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
};

export default withApi(PseudonymHelper);