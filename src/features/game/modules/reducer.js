import * as types from './types';

const initialState = {
    board: [],
    status: {
        start: false,
        win: false,
        lose: false,
        counterCell: 0,
        flags: 0,
    },
};

export function reducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case types.CREATE_BOARD:
            const { board, flags } = payload;
            return {
                ...state,
                board: [...board],
                status: {
                    ...state.status,
                    start: false,
                    win: false,
                    lose: false,
                    counterCell: 0,
                    flags: flags,
                },
            };
        case types.CREATE_NEW_GAME:
            return {
                ...state,
                status: {
                    ...state.status,
                    start: false,
                    win: false,
                    lose: false,
                    counterCell: 0,
                    flags: 0,
                },
            };
        case types.CELL_STATUS_REVEALED:
            return {
                ...state,
                board: Object.assign([], state.board, payload),
            };
        case types.CELL_STATUS_MINE:
            return {
                ...state,
                board: Object.assign([], state.board, payload),
            };
        case types.CELL_STATUS_EMPTY:
            return {
                ...state,
                board: Object.assign([], state.board, payload),
            };
        case types.CELL_STATUS_FLAGGED:
            const { newBoard, counterFlaggs } = payload;
            return {
                ...state,
                board: Object.assign([], state.board, newBoard),
                status: {
                    ...state.status,
                    flags: counterFlaggs,
                },
            };
        case types.START_GAME:
            return {
                ...state,
                status: {
                    ...state.status,
                    start: true,
                },
            };
        case types.COUNTER_CELL:
            return {
                ...state,
                status: {
                    ...state.status,
                    counterCell: payload,
                },
            };
        case types.STATUS_GAME_WIN:
            return {
                ...state,
                status: {
                    ...state.status,
                    win: true,
                },
            };
        case types.STATUS_GAME_LOSE:
            return {
                ...state,
                status: {
                    ...state.status,
                    lose: true,
                },
            };
        default:
            return state;
    }
}
