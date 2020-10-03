import {fetchUserPending, fetchUserSuccess, fetchUserError} from './userActions';

function fetchUser(data) {
    return dispatch => {
        dispatch(fetchUserPending());
        fetch('http://localhost:4000/user',
            {
                method: 'POST',
                body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'application/json'
                }}
                )
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res);
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchUserSuccess(res.user));
                return res.user;
            })
            .catch(error => {
                dispatch(fetchUserError(error));
            })
    }
}

export default fetchUser;
