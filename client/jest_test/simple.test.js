import React from 'react';
import {userReducer} from "../src/store/reducers/user";

describe('Sum', () => {
    for (let i = 0; i < 1000; ++i) {
        it('should', function () {
            expect(i+1).toBe(++i);
        });
    }
});
test('UserReducer', () => {
    let state = {auth: true, user: {email:''}};
    let newStore = userReducer(state, {type: 'LOG_OUT'});
    //it.
})
