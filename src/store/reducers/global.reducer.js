import {
    SET_VAR,
    SET_LOADING,
    ADD_NOTIFY,
    REMOVE_NOTIFY,
} from '../actions/global.actions';
const defaultState = {
    someState       : false,
    loadingState    : false,
    notifications   : [],
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
        case ADD_NOTIFY : return ({
            ...state,
            notifications : [action.notify, ...state.notifications],
        });
        case REMOVE_NOTIFY : return ({
            ...state,
            notifications : state.notifications.filter(item => item.id !== action.id),
        })
        default : return ({
            ...state,
        });
    }
};