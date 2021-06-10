import * as types from './types.js';

export const initialGameLevel = (levels) => {
    return {
        type: types.INITIAL_GAME_LEVEL,
        payload: levels,
    };
};
