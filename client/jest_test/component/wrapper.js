import React from 'react'
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../../src/store/reducers/rootReducer";
import {Provider} from "react-redux";
import {BrowserRouter, MemoryRouter, Router} from "react-router-dom";
import {mount, update} from 'enzyme'
import thunk from "redux-thunk";

export function configureTestStore(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);

    return store;
}

/**
 * Create provider wrapper
 */
export const renderWithProviders = (
    ui,
    initialState = {},
    initialStore,
    renderFn = mount,
) => {
    const store = initialStore || configureTestStore(initialState);
    const component =renderFn(
        <Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>);
    const testingNode = {
        component,
        store
    };

    testingNode.rerenderWithProviders = (el, newState) => {
        return renderWithProviders(el, newState, store, testingNode.update);
    };

    return testingNode;
};
export function configureFakeStore(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn().mockImplementation((fun) => {
        return fun;
    });

    return store;
}
export const renderWithTestStore = (
    ui,
    initialState = {},
    initialStore,
    renderFn = mount,
) => {
    const store = initialStore || configureTestStore(initialState);
    const component =renderFn(
        <Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>);
    const testingNode = {
        component,
        store
    };

    testingNode.rerenderWithTestStore = (el, newState) => {
        return renderWithTestStore(el, newState, store, testingNode.update);
    };

    return testingNode;
};
