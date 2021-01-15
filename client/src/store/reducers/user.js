const initialState = {
    auth: false,
    message: '',
    pending: false,
    justLogin: false,
    token: '',
    user: {}
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_OUT':
            return {...state, auth: false, token: '', user: {}};
        case 'FETCH_USER_PENDING':
            return {...state, pending: true};
        case 'FETCH_USER_SUCCESS':
            return {...state, pending: false, auth: true, justLogin: true, token: action.payload};
        case 'FETCH_USER_ERROR':
            return {...state, pending: false, message: action.payload};
        case 'REDIRECT':
            return {...state, justLogin: false};
        case 'GET_AUTH_USER':
            return {...state, auth: true, user: action.payload};
        default:
            return state
    }
}
