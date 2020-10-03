import {userReducer} from "../src/store/reducers/user";

var assert = require('assert');

describe('Sum', () => {
    for (let i = 0; i < 1000; ++i) {
        it('should', function () {
            assert.equal(i+1, ++i);
        });
    }
});

describe('UserReducer', () => {
    let state = {auth: true, user: {email:''}};
    let newStore = userReducer(state, {type: 'LOG_OUT'});
    //it.
})
