import { combineReducers } from 'redux';

import { reducer as levelReducer } from './levels/modules/reducer';
import { reducer as gameReducer } from './game/modules/reducer';

export const rootReducer = combineReducers({
    settings: levelReducer,
    game: gameReducer,
});
