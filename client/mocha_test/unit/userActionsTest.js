import {fetchUserSuccess, logout} from "../../src/store/actions/userActions";

var chai = require('chai')
    , expect = chai.expect
    , should = chai.should()
    , assert = chai.assert;

describe('UserActions', () => {
    it('fetch user success action', () => {
        let res = {name: 'ann', email: 'email'};
        let action = fetchUserSuccess(res);
        action.type.should.equal('FETCH_USER_SUCCESS');
        action.should.have.property('payload').equal(res);
    });
});
