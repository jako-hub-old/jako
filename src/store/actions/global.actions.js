import { TYPE_FRIENDSHIP_REQUEST } from "../../commons/notifies-list";
import { fetchFriendshipRequest } from './userData.actions';

/**
 * This file contains the global actions for global reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @type {string}
 */
export const SET_VAR        = '[GLOBAL] SET_VARS';
export const SET_LOADING    = '[SET_LOADING] SET_LOADING';
export const ADD_NOTIFY     = '[GLOBAL] ADD_NOTIFY';
export const POP_NOTIFY     = '[GLOBAL] POP_NOTIFY';
export const REMOVE_NOTIFY  = '[GLOBAL] REMOVE_NOTIFY';
export const VIEW_NOTIFY    = '[GLOBAL] VIEW_NOTIFY';

export const setVar = (key, value) => ({
    type : SET_VAR,
    key,
    value,
});

export const addNotify = (notify) => ({
    type : ADD_NOTIFY,
    notify,
});

export const popNotify = () => ({
    type : POP_NOTIFY,
});

export const removeNotify = (id, read=false) => ({
    type : REMOVE_NOTIFY,
    id,
    read,
});

export const viewNotify = ({ id }) => ({
    type : VIEW_NOTIFY,
    id,
});

/**
 * This function activates the loading process.
 */
export const startLoading = () => ({
    type    : SET_LOADING,
    loading : true,
});

/** 
 * This function stop the loading process
 */
export const stopLoading = () => ({
    type    : SET_LOADING,
    loading : false,
});

export const notify = notify => dispatch => {    
    dispatch(addNotify(notify));
};