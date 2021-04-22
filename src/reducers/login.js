import { ADD_TOKEN, SET_LOGIN_ERROR, DELETE_TOKEN } from '../actions/constants'

export default function login(state = {}, action) {
    
    switch (action.type) {
        case ADD_TOKEN:
            return ({...state, token:action.token, error:''});
        case SET_LOGIN_ERROR:
            return ({...state, token:false, error:action.message});
        case DELETE_TOKEN:
            return ({...state, token:false});
        default:
            return state
    }
}

