import React from 'react';
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import LoginPage from "../../src/сomponents/LoginPage";
import {MemoryRouter, Router} from "react-router-dom";
import {mount, render} from "enzyme";

import "../setupTest"
import {TextField} from "@material-ui/core";
import {renderWithProviders, renderWithTestStore} from "./wrapper";
import {redirect} from "../../src/store/actions/userActions";
import thunk from "redux-thunk";
import Button from "@material-ui/core/Button";



describe('Login page rendered', function () {
    const initialState = {user: {message: ''}};
    const mockStore = configureStore([thunk]);
    let store;
    let loginPage;

    const setup = (state, props = {}) => {
        return { ...renderWithTestStore(<LoginPage {...props} />, state) }
    };

    beforeEach(() => {
        store = mockStore(initialState);
        loginPage = mount(<MemoryRouter><Provider store={store}><LoginPage/></Provider></MemoryRouter>);

    });


    it('Form has two text forms', function () {
        expect(loginPage.find(TextField).length).toEqual(2);
        expect(loginPage.find('#login').find("input[type='text']").length).toEqual(1);
        expect(loginPage.find('#password').find("input[type='password']").length).toEqual(1);

    });

    it('Shows error if state contains message', function () {
        const { component, store } = setup({user: {message: 'ERROR'}});
        const loginField = component.find(TextField).first();
        expect(loginField.prop('error')).toBeTruthy();
        expect(loginField.prop('helperText')).toEqual('ERROR')
    });

    it('If just login dispatch action "REDIRECT', function () {
        const { component, store } = setup({user: {message: '', justLogin: true}});
        expect(store.dispatch).toBeCalledWith(redirect());
    });

    it('Test onSubmit calls fetchUser', function () {
        loginPage = mount(<MemoryRouter><Provider store={store}><LoginPage /></Provider></MemoryRouter>);
        loginPage.find('#login').find("input[type='text']").simulate('change', { target: { value: 'Name' } });
        loginPage.find('#password').find("input[type='password']").simulate('change', { target: { value: 'Password' } });
        loginPage.find('form').simulate('submit', { preventDefault: () => console.log('preventDefault') });
        expect(store.getActions().pop().type).toEqual("FETCH_USER_PENDING");
    });

    it('Login and password are required', function() {
        loginPage = mount(<MemoryRouter><Provider store={store}><LoginPage /></Provider></MemoryRouter>);
        expect(loginPage.find(TextField).at(0).prop('required')).toBeTruthy();
        expect(loginPage.find(TextField).at(1).prop('required')).toBeTruthy();
    })
});
