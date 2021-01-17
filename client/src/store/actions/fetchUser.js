import {fetchUserPending, fetchUserSuccess, fetchUserError, getAuthUser} from './userActions';
import axios from "axios";
import getAuth from "./getAuth";

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
                if (res.data.message) {
                    console.log("!" + res.data.message);
                    dispatch(fetchUserError(res.data.message));
                } else {
                    dispatch(fetchUserSuccess(res.data.token));
                    console.log(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    dispatch(getAuth());
                }
            })
            .catch(error => {
                    if (error.response && error.response.data && error.response.data.message) {
                        dispatch(fetchUserError(error.response.data.message));
                    } else {
                        dispatch(fetchUserError(error.message));

                    }
                }
            )

    }
}

export default fetchUser;
