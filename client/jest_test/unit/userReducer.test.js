import React from 'react';
import {userReducer} from "../../src/store/reducers/user";

describe('UserReducer', () => {
    let state = {auth: true, user: {email: 'a', name:'b'}, pending: false};
    test('LOG_OUT', () => {
        let newState = userReducer(state, {type: 'LOG_OUT'});
        expect(newState.auth).toBe(false);
        expect(newState.user).toEqual({});
        expect(newState.pending).toBe(false);
    });
    test('FETCH_USER_PENDING', () => {
        let newState = userReducer(state, {type: 'FETCH_USER_PENDING'});
        expect(newState.auth).toBe(true);
        expect(newState.user).toEqual(state.user);
        expect(newState.pending).toBe(true);
    })
});
