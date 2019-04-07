import {
    SET_MY_FRIENDS,   
    SET_USER_DATA,
    SET_USER_VERIFIED,
} from '../actions/userData.actions';

const defaultState = {
    friends  : [],
    photo    : null,
    verified : false,
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
        case SET_USER_VERIFIED : return ({
            ...state,
            verified : action.verified,
        });
        default : return ({
            ...state,
        });
    }
};