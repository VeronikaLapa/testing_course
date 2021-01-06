import configureStore from 'redux-mock-store'
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter, MemoryRouter, Router} from "react-router-dom";
import PopOver from "../../src/сomponents/PopOver";
import { shallow, mount } from 'enzyme';
import "../setupTest"
import {IconButton} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";


describe('PopOver render with auth',()=> {
    const initialState = {user: {
            auth: true,
            message: '',
            pending: false,
            justLogin: false,
            token: '',
            user: {name: 'Ann'}}};
    const mockStore = configureStore();
    let store, container;
    let wrapper;
    let reduxState;

    beforeEach(() => {
        store = mockStore(initialState);
        reduxState = initialState;
    });

    it('check popover rendered', function () {
        //const wrapper = mount(<Provider store={store}><MemoryRouter><PopOver /></MemoryRouter></Provider>);
        const wrapper = mount(<Provider store={store}><MemoryRouter><PopOver /></MemoryRouter></Provider>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(IconButton).length).toEqual(1);
        expect(wrapper.find(Menu).length).toEqual(1)
    });

    it('check menu open property on icon click', function () {
        const wrapper = mount(<Provider store={store}><MemoryRouter><PopOver /></MemoryRouter></Provider>);
        const popover = wrapper.find(PopOver);

        const menu = wrapper.find(Menu);
        const icon = wrapper.find(IconButton);

        expect(wrapper.find(Menu).prop("open")).toEqual(false);
        icon.simulate("click");
        expect(wrapper.find(Menu).prop("open")).toEqual(true);
    });

    it('close() close menu', function () {
        const wrapper = mount(<Provider store={store}><MemoryRouter><PopOver /></MemoryRouter></Provider>);

    })
});
