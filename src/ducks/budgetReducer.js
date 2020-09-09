import axios from 'axios';

const initialstate = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

export const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA";

export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res => res.data);
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export const ADD_PURCHASE = "ADD_PURCHASE";

export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', {description, price, category}).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const REMOVE_PURCHASE = "REMOVE_PURCHASE";

export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase:${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export default function budgetReducer(state=initialstate, action) {
    const {type, payload} = action;
    switch(type) {
        case REQUEST_BUDGET_DATA + "_PENDING": 
        return {...state, loading: true}
        case REQUEST_BUDGET_DATA + "_FULFILLED":
        return {...state, ...payload, loading: false}
        case ADD_PURCHASE + "PENDING":
        return {...state, loading: true}
        case ADD_PURCHASE + "FULFILLED":
        return {...state, purchases: payload, loading: false}
        case REMOVE_PURCHASE + "PENDING":
        return {...state, loading: true}
        case REMOVE_PURCHASE + "FULFILLED":
        return {...state, purchases: payload, loading: false}
    }
    return state;
}