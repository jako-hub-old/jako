import {
    SET_MY_GAMES,
    ADD_TO_MY_GAMES,
} from '../actions/game.actions';

const defaultState = {
    myGames : [],
};

export default gameReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SET_MY_GAMES: return ({
            ...state,
            myGames : action.games,
        });
        case ADD_TO_MY_GAMES : return ({
            ...state,
            myGames : [...state.myGames, action.game],
        });
        default : return ({
            ...state,
        });
    }
};