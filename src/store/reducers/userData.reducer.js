import {
    SET_MY_FRIENDS,   
    SET_USER_DATA,
} from '../actions/userData.actions';

const defaultState = {
    friends : [],
    photo   : null,
};

export default gameReducer = (state=defaultState, action) => {
    switch (action.type) {       
        case SET_MY_FRIENDS : return ({
            ...state,
            friends : action.friends,
        });
        case SET_USER_DATA : return ({
            ...state,
            ...action.userData,
        });
        default : return ({
            ...state,
        });
    }
};