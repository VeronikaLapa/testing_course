export function logout() {
    return {
        type: 'LOG_OUT',
        payload: null
    }
}

export function login(email, password) {
    //TODO Make request to backend
    if (email === 'qaz@qaz.qaz' && password === 'qaz') {
        return {
            type: 'LOG_IN',
            payload: {email: email, password: password}
        }
    } else {
        return {
            type: 'LOGIN_ERROR',
            payload: 'wrong name or password'
        }
    }
}
