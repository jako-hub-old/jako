import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Form from './Form';
import moment from 'moment';
import _ from 'underscore';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
import { FieldSetTitle } from '../../commons/forms';

class GameCreatorComponent extends React.Component {
    state = {
        name     : "",
        scenario : "",
        date     : null,
        codigo_juego : null,
        teams : [],
    };

    onChange(field, name) {
        this.setState({
            [field] : name,
        });
    }

    onChangeScenario(scenario) {
        this.setState({
            scenario,
        });
    }

    onChangeDate(newDate) {
        const date = moment(newDate).format("YYYY-MM-DD HH:mm");
        this.setState({
            date,
        });
    }

    isValidForm() {
        const {
            name,
            scenario,
            date,
        } = this.state;
        return      (!_.isEmpty(name)) &&
                (!_.isEmpty(scenario)) &&
                    ((!_.isEmpty(date)));

    }

    onSubmitForm() {
        const {
            scenario,
            date:fecha,
            name:nombre,
            codigo_juego,
        } = this.state;
        const jugador = this.props.userCode;
        const escenario = scenario.codigo_escenario;
        this.props.startLoading();
        this.props.doPost(endpoints.juego.nuevo, {
            jugador,
            nombre,
            fecha,
            numero_jugadores : 1,
            acceso           : "publico",
            escenario,
            codigo_juego,
        }).then(response => {
            const {error, error_controlado, codigo_juego} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al guardar el juego");
            } else {
                this.setState({codigo_juego});
                addMessage("Juego guardado");
            }
            
            this.props.stopLoading();
        })
        .catch(response => {
            consoleError("Saving game", response);
            addMessage("Ocurrió un error al guardar el juego");
            
        });

    }

    render() {
        const {
            name,
            scenario,
            date,
        } = this.state;
        return (
            <ScrollView>
                <View style={styles.root}>
                    <Form 
                        onSelectScenario = { this.onChangeScenario.bind(this)}
                        onChangeDate     = { this.onChangeDate.bind(this)    }
                        onSubmit         = { this.onSubmitForm.bind(this)    }
                        onChange         = { this.onChange.bind(this)        }
                        gameName         = { name     }
                        scenario         = { scenario }
                        date             = { date     }
                        isValidForm      = { this.isValidForm() }
                    />
                    <View>
                        <Text>
                            Teams!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

GameCreatorComponent.propTypes = {
    navigation      : PropTypes.object.isRequired,
    userCode        : PropTypes.any,
    doPost          : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

export default withApi(GameCreatorComponent);