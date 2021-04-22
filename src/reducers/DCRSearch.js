import {  DCR_SEARCH,DCR_STAYED } from '../actions/constants'

export default function DCRSEARCH(state = {}, action) {
    switch (action.type) {
        case DCR_SEARCH:
            //console.log("setting token in global store....")
            return ({...state, data:action.data});
        case DCR_STAYED:
           // console.log("setting token in global store....")
            return ({...state, stayedAt:action.data});
        default:
            return state
    }
}