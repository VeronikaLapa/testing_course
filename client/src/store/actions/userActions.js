export function logout() {
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
