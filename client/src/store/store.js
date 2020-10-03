import {applyMiddleware, createStore} from 'redux';
import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const middleware = [thunk];

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
    ));

export default store;
