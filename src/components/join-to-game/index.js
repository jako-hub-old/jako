import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import ItemCard from './item-card';
import JoinForm from './JoinForm';
import { withApi, withPositions } from '../../providers';
import { consoleError, addMessage, consoleInfo } from '../../utils/functions';
import endpoints from '../../configs/endpoints';

class JoinToGameComponent extends React.Component {
    state = {
        positions       : [],
        selectedGame    : {},
        loading         : true,
    };

    constructor(props) {
        super(props)
        this.state.selectedGame = this.props.selectedGame;
    }

    componentDidMount() {
        this.fetchPositions();               
    }

    fetchGameInfo() {
        const {codigo_juego} = this.props.selectedGame;
        this.setState({loading : true});
        this.props.doPost(endpoints.juego.detalle, {
            juego : codigo_juego,
        })
        .then(response => {        
            if(response.error_controlado || response.error) {
                addMessage("Ocurrió un error al obtener la información del juego");
                this.setState({
                    loading : false,
                });
            } else {
                this.setState({
                    selectedGame : response,
                    loading : false,
                }, () => {
                    console.log("data: ", this.state);
                });
            }
        })
        .catch(response => {
            this.setState({loading : false});
            consoleError("List of comments", response);
            addMessage("Error al obtener comentarios");
        });            
    }

    fetchPositions() {
        this.props.fetchPositions()
            .then(() => {
                this.fetchGameInfo(); 
            })
            .catch((response) => {
                consoleError("Fetching positions: ", response);
                addMessage("Ocurrió un error al listar las posiciones");
            });
    }

    onSubmit(form) {
        const {number:numero, position:posicion, team:equipo} = form;
        const {userCode:jugador} = this.props;
        const {codigo_juego:juego, nombre} = this.state.selectedGame;
        this.props.startLoading();
        this.props.doPost(endpoints.juego.unir, {
            juego,
            jugador,
            posicion,
            numero,
            equipo,
        })
        .then(response => {
            const {validacion, error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al unirse al juego");
            } else if(validacion) {
                addMessage(validacion);
            } else {
                addMessage(`Te haz unido a ${nombre}`);
                this.props.navigation.navigate("MyGames");
            }
            this.props.stopLoading();
        })
        .catch(response => {
            consoleError("Error join to game ", response);
            this.props.stopLoading();
        });
    }

    render() {
        const {
            selectedGame,
            loading,
        } = this.state;
        if(loading) {
            return null;
        }
        return (
            <View style={styles.root}>
                <ScrollView>
                    <ItemCard 
                            game = {selectedGame}
                        />
                    <JoinForm 
                        teams       = { selectedGame.equipos }
                        positions   = { this.props.positions }
                        onSubmit    = { this.onSubmit.bind(this) }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingVertical     : 10,
        justifyContent          : "center",
    },
});

JoinToGameComponent.propTypes = {
    navigation : PropTypes.any.isRequired,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    fetchPositions    : PropTypes.func,
    positions         : PropTypes.array,
};

export default withApi(withPositions(JoinToGameComponent));