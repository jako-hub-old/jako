/**
 * This file contains the global actions for global reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @type {string}
 */
export const SET_VAR = '[GLOBAL] SET_VARS';

export const setVar = (key, value) => ({
    type : SET_VAR,
    key,
    value,
});