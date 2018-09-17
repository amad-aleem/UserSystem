import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Login User -get user token
export const loginUser = (userData) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            //save to local storage
            const { token } = res.data
            //set token to local storage(it only take strings)
            localStorage.setItem('jwtToken', token);
            //set token to auth header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//log user out
export const logoutUser = () => dispatch => {
    //first remove token from LS
    localStorage.removeItem('jwtToken');
    //remove auth header i.e, Authorization for future requests
    setAuthToken(false);
    //set current user to {} which will set authorization to false
    dispatch(setCurrentUser({}));
};
