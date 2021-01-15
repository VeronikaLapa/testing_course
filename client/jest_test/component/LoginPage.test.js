import React from 'react';
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import LoginPage from "../../src/сomponents/LoginPage";
import {MemoryRouter, Router} from "react-router-dom";
import {mount} from "enzyme";

import "../setupTest"
import {TextField} from "@material-ui/core";


describe('Login page rendered', function () {
    const initialState = {user:{message: ''}};
    const mockStore = configureStore();
    let store, container;
    let loginPage;

    beforeEach(() => {
        store = mockStore(initialState);
        loginPage = mount(<MemoryRouter><Provider store={store}><LoginPage /></Provider></MemoryRouter>);

    });

    it('check form rendered', function () {
        expect(loginPage).toMatchSnapshot();
    })

    it('Form has two text forms', function (){
        expect(loginPage.find(TextField).length).toEqual(2);
        
    })
});
