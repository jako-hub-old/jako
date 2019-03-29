import {
    SET_MY_GAMES,
    ADD_TO_MY_GAMES,
    SET_POSITIONS
} from '../actions/game.actions';

const defaultState = {
    myGames     : [],
    positions   : [],
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
        case SET_POSITIONS : return ({
            ...state,
            positions : action.positions,
        });
        default : return ({
            ...state,
        });
    }
};