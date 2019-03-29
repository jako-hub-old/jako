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
import { withApi, withSearch } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';

class GameCreatorComponent extends React.Component {
    state = {
        name     : "",
        scenario : "",
        date     : null,
        codigo_juego : null,
        teams : [],
        teamNames : {},
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
            teams,
        } = this.state;
        return      (!_.isEmpty(name)) &&
                (!_.isEmpty(scenario)) &&
                    ((!_.isEmpty(date))) &&
                    teams.length > 0;

    }

    onAddTeam(team) {
        this.setState(({teams}) => ({
            teams : [...teams, team],
        }));
    }

    onRemoveTeam(key) {
        this.setState(({teams}) => ({
            teams : teams.filter((item, k) => k !== key)
        }));
    }

    onSubmitForm() {
        const {
            scenario,
            date:fecha,
            name:nombre,
            codigo_juego,
            teams,
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
            equipos : teams,
        }).then(response => {
            const {error, error_controlado, codigo_juego} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al guardar el juego");
            } else {
                this.props.onChangeQuery(nombre);
                this.setState({codigo_juego}, () => {
                    this.clearGame();
                    this.props.fetchGames();
                    this.props.navigation.navigate("Search");
                    addMessage("Juego guardado");
                });                
            }
            
            this.props.stopLoading();
        })
        .catch(response => {
            consoleError("Saving game", response);
            addMessage("Ocurrió un error al guardar el juego");
            
        });

    }

    clearGame() {
        this.setState({
            name     : "",
            scenario : "",
            date     : null,
            codigo_juego : null,
            teams : [],
            teamNames : {},
        });
    }

    render() {
        const {
            name,
            scenario,
            date,
            teams,
        } = this.state;
        console.log("query: ", this.props.searchQuery);
        return (
            <ScrollView>                
                <View style={styles.root}>
                    <Form 
                        onSelectScenario = { this.onChangeScenario.bind(this)}
                        onChangeDate     = { this.onChangeDate.bind(this)    }
                        onSubmit         = { this.onSubmitForm.bind(this)    }
                        onChange         = { this.onChange.bind(this)        }
                        teams            = { teams    }
                        gameName         = { name     }
                        scenario         = { scenario }
                        date             = { date     }
                        isValidForm      = { this.isValidForm()           }
                        onAddTeam        = { this.onAddTeam.bind(this)    }
                        onRemoveTeam     = { this.onRemoveTeam.bind(this) }
                    />                    
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
    onChangeQuery   : PropTypes.func,
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

export default withSearch(withApi(GameCreatorComponent));