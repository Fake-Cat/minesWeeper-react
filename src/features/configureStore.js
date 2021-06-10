import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './rootReducer';

export const configureStore = (preloadedState) => {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(
        ...enhancers /*,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()*/
    );

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    return store;
};
