import { Api } from "../../services/ApiService";
import endpoints from "../../configs/endpoints";
import { addMessage, consoleError } from "../../utils/functions";

export const SET_MY_FRIENDS = '[USER_DATA] SET_MY_FRIENDS';
export const SET_USER_DATA  = '[USER_DATA] SET_USER_DATA';

export const setMyFriends = (friends=[]) => ({
    type : SET_MY_FRIENDS,
    friends,
});

export const setUserData = (userData) => ({
    type : SET_USER_DATA,
    userData,
});

/***************************
 ***** Async functions *****
 ***************************/
export const fetchMyFriends = (playerCode, fromOther) => (dispatch) => (new Promise((resolve, reject) => {
    Api.doPost(endpoints.jugador.amigos, {
        jugador : playerCode,
    })
        .then(response => {
            const { error, error_controlado } = response;
            if(error || error_controlado) {
                addMessage("Error al consultar tus amigos");                
                reject(false);
            } else {                
                if(!fromOther) {
                    dispatch(setMyFriends(response));
                }
                resolve(response);
            }
        })
        .catch(response => {
            addMessage("Error al consultar tus amigos");
            consoleError("List my friends", response);
        });
}));