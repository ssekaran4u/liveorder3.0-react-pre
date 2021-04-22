import { DCR_JOINT } from '../actions/constants'

export default function DCRJoint(state = {}, action) {
    switch (action.type) {
        case DCR_JOINT:
           // console.log("setting token in global store....")
            return ({...state, data:action.data});
       
        default:
            return state
    }
}