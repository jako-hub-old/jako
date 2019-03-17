import {myGamesResults} from "../../utils/fake-api.json";

export const SET_MY_GAMES = '[GAME] SET_MY_GAMES';
export const ADD_TO_MY_GAMES = '[GAME] ADD_TO_MY_GAMES';
// export const UPDATE_GAME = '[GAME] UPDATE_GAME';

export const setGames = (games=[]) => ({
    type : SET_MY_GAMES,
    games,
});

export const addToMyGames = (game={}) => ({
    type : ADD_TO_MY_GAMES,
    game,
});

/***************************
 ***** Async functions *****
 ***************************/
/**
 * This function allows to fetch all user games.
 * @param code
 * @returns {function(*): (Promise<any> | Promise<*>)}
 */
export const fetchMyGames = (code=0) => (dispatch) => (new Promise((resolve, reject) => {
    const myGames = myGamesResults;
    if(myGames) {
        dispatch(setGames(myGames));
        resolve(true);
    } else {
        reject(false);
    }
}));