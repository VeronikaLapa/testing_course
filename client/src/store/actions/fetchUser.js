import {fetchUserPending, fetchUserSuccess, fetchUserError, getAuthUser} from './userActions';
import axios from "axios";

function fetchUser(data) {
    return dispatch => {
        dispatch(fetchUserPending());
        const url = 'http://localhost:8080/api/jwt',
            params = {login: data.login, password: data.password};
        //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


        axios.get(url + "?" + new URLSearchParams(params))
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => {
                if(res.data.message) {
                    throw(res.data.message);
                }
                dispatch(fetchUserSuccess(res.data.token));
                console.log(res.data.token);
                window.localStorage.setItem("token", res.data.token);
                return res.data.token;
            })
            .catch(error => {
                dispatch(fetchUserError(error));
            })
    }
}

export default fetchUser;
