import configureStore from 'redux-mock-store'
import MenuBar from "../../src/сomponents/MenuBar";
import React from "react";
import renderer from 'react-test-renderer'
import {Provider} from "react-redux";
import {MemoryRouter, Router} from "react-router-dom";
import {cleanup} from "@testing-library/react";

describe('MenuBar render',()=> {
    const initialState = {user:{auth: false, user: {name: ''}}};
    const mockStore = configureStore();
    let store, container;

    afterEach(cleanup);

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('Render menu bar', () => {
        const renderedValue = renderer.create(<MemoryRouter><Provider store={store}><MenuBar /></Provider></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});
