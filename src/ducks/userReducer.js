import axios from 'axios';

const initialState = {
    email: null,
    firstName: null,
    lastName: null
}

const REQUEST_USER_DATA = "REQUEST_USER_DATA"

export const requestUserData = () => {       //action creator
    let data = axios.get('/auth/user-data').then(response => response.data);
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

export default function reducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case `${REQUEST_USER_DATA}_FULFILLED`:   // once response comes in from .then
        return {...state, email: payload.user.email, firstName: payload.user.firstName, lastName: payload.user.lastName}
        default:
        return state;
    }
}