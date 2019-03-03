import {
    SET_VAR,
} from '../actions/global.actions';
const defaultState = {
    someState : false,
};

export default globalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VAR: return ({
            ...state,
            [action.key] : action.value,
        });
        default : return ({
            ...state,
        });
    }
};