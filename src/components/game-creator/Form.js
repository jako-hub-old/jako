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
import { 
    DateTimePicker,
    SubmitButton,
    FieldSetTitle,
} from '../../commons/forms';
import TeamManager from './TeamManager';

const GameForm = (props) => {
    const {
        onChange, 
        onSelectScenario,
        onChangeDate,
        gameName,
        isValidForm,
        date,
        onSubmit,
        onAddTeam,
        teams=[],
    } = props;
    return (
        <View style={styles.root}>            
            <Form style={styles.form}>
                <Item floatingLabel>
                    <Label>{"Nombre del juego"}</Label>
                    <Input 
                        value        = { gameName                        }
                        onChangeText = { text => onChange("name", text)  }
                    />
                </Item>
                <DateTimePicker 
                    value       = { date         }
                    onChange    = { onChangeDate }
                />
                <ScenarioPicker 
                    onSelectScenario = { onSelectScenario }
                />
                <FieldSetTitle title={"Añade equipos"} />
                <TeamManager 
                    teams       = { teams }
                    onAddTeam   = { onAddTeam }
                />
                <View>
                    <SubmitButton 
                        primary
                        block
                        disabled = { !isValidForm    }
                        label    = { "Guardar juego" }
                        onPress  = { onSubmit        }
                    />
                </View>
                
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
    gameName : PropTypes.string,
    scenario : PropTypes.any,
    onSelectScenario : PropTypes.func,
    onChange         : PropTypes.func,
    onChangeDate     : PropTypes.func,
    isValidForm      : PropTypes.bool,
    onAddTeam        : PropTypes.func,
    onSubmit         : PropTypes.func,
    teams            : PropTypes.array,
};

export default GameForm;