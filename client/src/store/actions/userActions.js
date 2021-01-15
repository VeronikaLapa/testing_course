export function logout() {
    localStorage.removeItem("token");
    return {
        type: 'LOG_OUT',
        payload: null
    }
}

export function fetchUserPending() {
    return {
        type: 'FETCH_USER_PENDING'
    }
}

export function fetchUserSuccess(res) {
    return {
        type: 'FETCH_USER_SUCCESS',
        payload: res
    }
}

export function fetchUserError(error) {
    return {
        type: 'FETCH_USER_ERROR',
        payload: error
    }
}
export function redirect() {
    return {
        type: 'REDIRECT'
    }
}
export function getAuthUser(res) {
    return {
        type: 'GET_AUTH_USER',
        payload: {name: res.login, email: res.email}
    }
}
