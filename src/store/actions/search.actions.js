import { startLoading, stopLoading } from './global.actions';
import { Api } from '../../services/ApiService';
import endpoints from '../../configs/endpoints';
export const SET_RESULTS = '[SEARCH] SET_RESULTS';
export const SET_QUERY  = '[SEARCH] SET_QUERY';

export const setResults = results => ({
    type : SET_RESULTS,
    results,
});

export const setQuery = query => ({
    type : SET_QUERY,
    query,
});

/***************************
 ***** Async functions *****
 ***************************/
/**
 * This function allows to fetch all user games.
 * @param code
 * @returns {function(*): (Promise<any> | Promise<*>)}
 */
export const fetchGames = () => (dispatch) => (new Promise((resolve, reject) => {
    dispatch(startLoading());
    Api.doPost(endpoints.juego.buscar, {})
    .then(response => {
        resolve(true);
        dispatch(setResults(response));
        dispatch(stopLoading());
    })
    .catch(response => {
        reject(repsonse);
        dispatch(stopLoading());
    }); 
}));