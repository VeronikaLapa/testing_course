import {getAuthUser} from './userActions';
import axios from "axios";

function getAuth() {
    return dispatch => {
        const url = 'http://localhost:8080/api/users/authenticated';

        axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('token')
            }
        } )
            .then(res => {
                console.log(res.data);
                dispatch(getAuthUser(res.data));
                return res.data;
            })
    }
}

export default getAuth;
