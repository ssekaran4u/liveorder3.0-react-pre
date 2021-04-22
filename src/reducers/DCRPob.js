import { DCR_POB } from '../actions/constants'

export default function DCRPob(state = {}, action) {
    switch (action.type) {
        case DCR_POB:
         //   console.log("setting token in global store....")
            return ({...state, data:action.data});
       
        default:
            return state
    }
}
