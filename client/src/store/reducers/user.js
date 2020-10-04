const initialState = {
    auth: false,
    message: '',
    user: {},
    pending: false
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_OUT':
            return { ...state, auth: false, user: {}};
        case 'FETCH_USER_PENDING':
            return {...state, pending: true};
        case 'FETCH_USER_SUCCESS':
            return {...state, pending: false, user: action.payload, auth:true};
        case 'FETCH_USER_ERROR':
            return {...state, pending: false, message: action.payload};
        default:
            return state
    }
}
