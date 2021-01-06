import { mount } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';

export const mountWithRouterAndStore = (Component, storeState = {}) => {
    const mockStore = configureStore();
    const store = mockStore(storeState);
    const history = {};

    return mount(
        <Provider store={store}>
            <Router history={history}>{Component}</Router>
        </Provider>
    );
};

export function mountWithRouterAndStore2(Component, storeState = {}) {
    const mockStore = configureStore();
    const store = mockStore(storeState);
    const history = {};

    const options = {
        context: { store, router: { history, route: { location: {} } } },
        childContextTypes: {
            store: PropTypes.object.isRequired,
            router: PropTypes.object.isRequired
        }
    };

    return mount(Component, options);
}

