import React from 'react';
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import LoginPage from "../../src/сomponents/LoginPage";
import {MemoryRouter, Router} from "react-router-dom";

describe('Login page rendered', function () {
    const initialState = {user:{message: ''}};
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('check form rendered', function () {
        const renderedValue = renderer.create(<MemoryRouter><Provider store={store}><LoginPage /></Provider></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    })
});
