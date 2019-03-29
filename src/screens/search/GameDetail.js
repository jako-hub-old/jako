import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import { GameDetailComponent } from '../../components';
import { withSearch } from '../../providers';

class GameDetailScreen extends React.PureComponent {
    theGame = {
        "codigo_juego": 30,
        "nombre": "El cotejooo",
        "jugadores": 16,
        "jugadores_confirmados": 3,
        "fecha": "2019-03-31T05:43:00-05:00",
        "acceso": "publico",
        "escenario_nombre": "ARGENTINA",
        "negocio_nombre": "ELITE",
        "jugador_seudonimo": "el_jako",
        "comentarios": [
            {
                "codigo_comentario": 22,
                "fecha": "2019-03-29T00:04:40-05:00",
                "comentario": "Alguien sabe dode especially?",
                "jugador_seudonimo": "el_jako",
                "foto_usuario": "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
            }
        ],
        "detalles": [
            {
                "codigo_juego_detalle": 6,
                "codigo_jugador": 26,
                "codigo_posicion": "CEN",
                "numero": 10,
                "posicion_nombre": "CENTRO",
                "jugador_nombre_corto": "Mario Andres Estrada",
                "codigo_equipo": 21
            },
            {
                "codigo_juego_detalle": 9,
                "codigo_jugador": 27,
                "codigo_posicion": "CEN",
                "numero": 1,
                "posicion_nombre": "CENTRO",
                "jugador_nombre_corto": "Jorge Alejandro Quiroz Serna",
                "codigo_equipo": 21
            }
        ],
        "equipos": [
            {
                "codigo_juego_equipo": 21,
                "nombre": "Mi equipo",
                "jugadores": 8,
                "jugadores_confirmados": 1
            },
            {
                "codigo_juego_equipo": 22,
                "nombre": "Mi equipo",
                "jugadores": 8,
                "jugadores_confirmados": 0
            }
        ]
    };
    
    render() {
        const {
            navigation,
            //selectedGame=this.theGame,
        } = this.props;
        const selectedGame = this.theGame;
        return (
            <BaseScreen 
                allowBack
                navigation={navigation} title={selectedGame? selectedGame.nombre : "Nope"}
            >
                {selectedGame && (<GameDetailComponent navigation={navigation} selectedGame={selectedGame} />)}
            </BaseScreen>
        );
    }
}

GameDetailScreen.propTypes = {
    navigation          : PropTypes.object,
    selectedGame        : PropTypes.object,
    onChangeQuery       : PropTypes.func,
    clearSelectedGame   : PropTypes.func,
    setSelectedGame     : PropTypes.func,
};

export default withSearch(GameDetailScreen);