import {
    SET_VAR,
    SET_LOADING,
} from '../actions/global.actions';
const defaultState = {
    someState       : false,
    loadingState    : false,
};

export default globalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VAR: return ({
            ...state,
            [action.key] : action.value,
        });
        case SET_LOADING : return ({
            ...state,
            loadingState : action.loading,
        });
        default : return ({
            ...state,
        });
    }
};