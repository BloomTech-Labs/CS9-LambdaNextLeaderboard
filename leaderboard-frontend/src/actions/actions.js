import axios from 'axios';


export const CREATE_USER = 'CREATE_USER';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const UPDATE_USER = 'UPDATE_USER';
export const ERRORS = 'ERRORS';

const ROOT_URL = "http://localhost:4000/";

export const createUserAction = (obj) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('notes');

    let username = obj.username;
    console.log("obj", obj)
    return (dispatch) => {
        // /api/users/register
        axios.post(`${ROOT_URL}register`, obj)
            .then(resp => {
                localStorage.setItem('ID', resp.data._id);
                localStorage.setItem('username', resp.data.username);
                dispatch({
                    type: CREATE_USER,
                    username: username,
                    payload: resp
                });
            })
    }
};

export const loginAction = (obj, history) => {
    //Need to KNow the token expiration
    let today = new Date();
    let time = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    // let expire
    // if (hours < 12) {
    //     if (hours === 11) {
    //         hours = 12;
    //         if (minutes >= 10) {
    //             expire = hours + ':' + minutes + 'pm';
    //         } else {
    //             expire = hours + ':0' + minutes + 'pm';
    //         }
    //     } else {
    //         hours += 1;
    //         if (minutes >= 10) {
    //             expire = hours + ':' + minutes + 'am';
    //         } else {
    //             expire = hours + ':0' + minutes + 'am';
    //         }
    //     }
    //     //

    // } else {
    //     if (hours === 23) {
    //         hours = 12;
    //         if (minutes >= 10) {
    //             expire = hours + ':' + minutes + 'am';
    //         } else {
    //             expire = hours + ':0' + minutes + 'am';
    //         }
            
    //     } else {
    //         hours = hours - 12 + 1;
    //         if (minutes >= 10) {
    //             expire = hours + ':' + minutes + 'pm';
    //         } else {
    //             expire = hours + ':0' + minutes + 'pm';
    //         }
            
    //     }
    // }
    return (dispatch) => {
        axios.post(`${ROOT_URL}/api/users/login`, obj)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('ID', res.data.Id);
                // localStorage.setItem('expiration', expire);
                dispatch({
                    type: LOGIN_ACTION,
                    payload: res.data.token,
                    username: res.data.username,
                    Id: res.data.Id
                    // expiration: expire// (Math.floor(Date.now() / 1000) + (60*60))
                });
                //Need to get the correct redirect
                history.push('/')
            })
            .catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                dispatch({ type: ERRORS });
            });
    }
};