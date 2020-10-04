import {userReducer} from "../../src/store/reducers/user";
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should()
    , assert = chai.assert;
describe('Sum', () => {
    for (let i = 0; i < 10; ++i) {
        it('should', function () {
            assert.equal(i + 1, ++i);
        });
    }
});

describe('UserReducer', () => {
    let state = {auth: true, user: {email: 'a', name:'b'}};
    it('LOG_OUT', () => {
        let newState = userReducer(state, {type: 'LOG_OUT'});
        newState.should.have.property('auth').equal(false);
        assert.deepEqual(newState.user,{});
    });
    it('FETCH_USER_PENDING', () => {
        let newState = userReducer(state, {type: 'FETCH_USER_PENDING'});
        expect(newState.auth).to.be.equal(true);
        expect(newState.user).to.deep.equal(state.user);
        expect(newState.pending).to.be.equal(true);
    })

});
