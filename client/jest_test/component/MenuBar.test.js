import configureStore from 'redux-mock-store'
import MenuBar from "../../src/сomponents/MenuBar";
import React from "react";
import renderer from 'react-test-renderer'
import {Provider} from "react-redux";
import {MemoryRouter, Router} from "react-router-dom";

describe('MenuBar render',()=> {
    const initialState = {user:{auth: false}};
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('Render menu bar without auth', () => {
        const renderedValue = renderer.create(<MemoryRouter><Provider store={store}><MenuBar /></Provider></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});
