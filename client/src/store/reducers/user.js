const initialState = {
    auth: false,
    message: '',
    user: {},
    pending: false,
    justLogin: false
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_OUT':
            return {...state, auth: false, user: {}};
        case 'FETCH_USER_PENDING':
            return {...state, pending: true};
        case 'FETCH_USER_SUCCESS':
            return {...state, pending: false, user: action.payload, auth: true, justLogin: true};
        case 'FETCH_USER_ERROR':
            return {...state, pending: false, message: action.payload};
        case 'REDIRECT':
            return {...state, justLogin: false}
        default:
            return state
    }
}
