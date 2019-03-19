/**
 * This file contains the global actions for global reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @type {string}
 */
export const SET_VAR = '[GLOBAL] SET_VARS';
export const SET_LOADING = '[SET_LOADING] SET_LOADING';

export const setVar = (key, value) => ({
    type : SET_VAR,
    key,
    value,
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