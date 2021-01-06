import configureStore from 'redux-mock-store'
import MenuBar from "../../src/сomponents/MenuBar";
import React from "react";
import renderer from 'react-test-renderer'
import {Provider} from "react-redux";
import {MemoryRouter, Router} from "react-router-dom";
import {cleanup} from "@testing-library/react";
import PopOver from "../../src/сomponents/PopOver";

describe('PopOver render without auth',()=> {
    const initialState = {user:{auth: false, user: {name: ''}}};
    const mockStore = configureStore();
    let store, container;

    afterEach(cleanup);

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('Render popover without auth', () => {
        const renderedValue = renderer.create(<MemoryRouter><Provider store={store}><PopOver /></Provider></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
        expect(renderedValue.childList).toBeEmpty;
    });
});
