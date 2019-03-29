import {myGamesResults} from "../../utils/fake-api.json";
import endpoints from "../../configs/endpoints.js";
import { startLoading, stopLoading, } from "./global.actions";
import { Api } from "../../services/ApiService.js";
import { addMessage } from "../../utils/functions.js";

export const SET_MY_GAMES       = '[GAME] SET_MY_GAMES';
export const ADD_TO_MY_GAMES    = '[GAME] ADD_TO_MY_GAMES';
export const SET_POSITIONS      = '[GAME] SET_POSITIONS';
// export const UPDATE_GAME = '[GAME] UPDATE_GAME';

export const setGames = (games=[]) => ({
    type : SET_MY_GAMES,
    games,
});

export const addToMyGames = (game={}) => ({
    type : ADD_TO_MY_GAMES,
    game,
});

export const setPositions = (positions=[]) => ({
    type : SET_POSITIONS,
    positions,
});

/***************************
 ***** Async functions *****
 ***************************/
/**
 * This function allows to fetch all user games.
 * @param code
 * @returns {function(*): (Promise<any> | Promise<*>)}
 */
export const fetchMyGames = (jugador=0) => (dispatch) => (new Promise((resolve, reject) => {
    dispatch(startLoading());
    Api.doPost(endpoints.juego.jugador, {
        jugador,
    })
    .then(response => {
        resolve(true);
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            addMessage("Ocurrió un error al listar los juegos");
        } else {
            dispatch(setGames(response));
        }        
        dispatch(stopLoading());
    })
    .catch(response => {
        reject(response);
        dispatch(stopLoading());
    }); 
}));

export const fetchPositions = () => (dispatch) => (new Promise((resolve, reject) => {
    dispatch(startLoading());
    Api.doPost(endpoints.posicion.lista, {})
    .then(response => {
        resolve(true);
        dispatch(setPositions(response));
        dispatch(stopLoading());
    })
    .catch(response => {
        reject(response);
        dispatch(stopLoading());
    }); 
}));

export const onChangeQueryString = text => dispatch => {
    dispatch(setQuery(text));
};