import {fetchUserSuccess, logout} from "../../src/store/actions/userActions";

describe('UserActions', () => {
    test('log out action', () => {
        let action = logout();
        expect(action.type).toBe('LOG_OUT')
    });
    test('fetch user success action', () => {
        let res = {name: 'ann', email: 'email'};
        let action = fetchUserSuccess(res);
        expect(action.type).toBe('FETCH_USER_SUCCESS');
        expect(action.payload).toEqual(res);
    });
});
