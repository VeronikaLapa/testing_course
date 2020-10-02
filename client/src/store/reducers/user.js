const initialState = {
    auth: true,
    message: ''
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_OUT':
            return { ...state, auth: false, message: '' };
        case 'LOG_IN':
            return {...state, auth: true, message: ''};
        case 'LOGIN_ERROR':
            return {...state, message: action.payload, auth: false};
        default:
            return state
    }
}
