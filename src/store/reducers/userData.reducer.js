import {
    SET_MY_FRIENDS,    
} from '../actions/userData.actions';

const defaultState = {
    friends : [],
};

export default gameReducer = (state=defaultState, action) => {
    switch (action.type) {       
        case SET_MY_FRIENDS : return ({
            ...state,
            friends : action.friends,
        });
        default : return ({
            ...state,
        });
    }
};