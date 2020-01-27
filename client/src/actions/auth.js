import axios from 'axios';


import{
    REGISTER_COMPLETE,
    REGISTER_FAILED,
    USER_VERIFIED,
    AUTH_ERROR,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from './types';
import { setAlert } from './alert'
import setAuthToken from '../tools/setAuthToken'

// VERIFY USER
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('api/auth');

        dispatch({
            type: USER_VERIFIED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
        
    }
}

// CREATE USER
export const register = ({ username, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = JSON.stringify({ username, email, password });

    try{
        // connection and pathing to the backend
        const res = await axios.post('/api/users', body, config);

        dispatch({
        type: REGISTER_COMPLETE,
        payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
        type: REGISTER_FAILED
        });
    }
}


// LOGIN USER
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    const body = JSON.stringify({ email, password });

    try{
        // connection and pathing to the backend
        const res = await axios.post('/api/auth', body, config);

        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
        type: LOGIN_FAILED
        });
    }
}

// LOGOUT
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};