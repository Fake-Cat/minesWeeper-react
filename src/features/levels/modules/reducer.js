import * as types from './types';

const initialState = {
    levels: {
        Beginner: {
            name: 'Beginner',
            width: 9,
            height: 9,
            mines: 10,
        },
        Intermediate: {
            name: 'Intermediate',
            width: 16,
            height: 16,
            mines: 40,
        },
        Expert: {
            name: 'Expert',
            width: 30,
            height: 16,
            mines: 99,
        },
    },
    currentLevels: {},
};

export function reducer(state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case types.INITIAL_GAME_LEVEL:
            return {
                ...state,
                currentLevels: Object.assign({}, state.currentLevels, payload),
            };

        default:
            return state;
    }
}
