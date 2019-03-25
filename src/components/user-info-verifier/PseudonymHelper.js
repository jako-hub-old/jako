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
import { replaceSpaces, consoleError } from '../../utils/functions';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';

const PseudoForm = ({onSubmit, loading}) => {
    const [pseudonym, onChangePseudonym] = useState("");
    const value = replaceSpaces(pseudonym, '_');
    return (
        <Form style={styles.form}>
            <Item floatingLabel>
                <Label>{"Seudonimo"}</Label>
                <Input 
                    disabled = {loading}
                    value    = {value}
                    onChangeText = {text => onChangePseudonym(text)}
                />
            </Item>  
            <View style={styles.formRow}>
                <SubmitButton 
                    onPress = {() => onSubmit(value)}
                    label="Guardar"
                    primary
                    block
                    disabled={pseudonym === "" || pseudonym.length < 4}
                />
            </View>
        </Form>
    );
}

class PseudonymHelper extends React.Component {
    onSave(pseudonym) {
        this.props.startLoading();
        const {userCode} = this.props;
        this.props.doPost(endpoints.usuarios.guardarPseudonimo, {
            codigo_usuario  : userCode,
            seudonimo       : pseudonym,
        })
        .then(response => {
            const {validacion, error, error_controlado} = response;
            if(validacion) {
                Toast.show({text : validacion});
            } else if(error || error_controlado){
                Toast.show({text : "Ocurrió un error al guardar el seudonimo"});
            } else {
                Toast.show({text : "Seudonimo guardado"});
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
                                Indica un seudonimo o un alias con el que te reconozcan tus amigos.
                            </Text>
                        </View>
                        <PseudoForm 
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