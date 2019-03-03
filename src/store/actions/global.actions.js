export const SET_VAR = '[GLOBAL] SET_VARS';

export const setVar = (key, value) => ({
    type : SET_VAR,
    key,
    value,
});