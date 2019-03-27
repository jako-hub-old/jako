import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Input,
    Form,
    Label,
    Item,    
} from 'native-base';
import { ScenarioPicker } from '../../components';

const GameForm = (props) => {
    const {
        onChange, 
        onChangeScenario,
        gameName,
        scenario,
    } = props;
    return (
        <View style={styles.root}>
            <Form style={styles.form}>
                <Item floatingLabel>
                    <Label>{"Nombre del juego"}</Label>
                    <Input 
                        value = {gameName}
                        onChangeText = {text => onChange("name", text)}
                    />
                </Item>
                
                <ScenarioPicker />
                
            </Form>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {        
        paddingHorizontal : 10,
        paddingVertical : 10,
    },
});

GameForm.propTypes = {
    onChange : PropTypes.func,
    gameName : PropTypes.string,
    scenario : PropTypes.any,
    onChangeScenario : PropTypes.func,
};

export default GameForm;