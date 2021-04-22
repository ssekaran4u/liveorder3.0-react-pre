import { RPS_LIST } from '../actions/constants';

export default function RPS(state = {}, action) {
    switch (action.type) {
        case RPS_LIST:
            return ({...state, data:action.data});
        default:
            return state
    }
}