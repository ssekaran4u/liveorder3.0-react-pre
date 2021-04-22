import { DCR_LIST , TOGGLE_DCR_HEADER, IS_FULL} from '../actions/constants'

export default function DCRList(state = {}, action) {
    switch (action.type) {
        case DCR_LIST:
           // console.log("setting token in global store....")
            return ({...state, data:action.data});
        case TOGGLE_DCR_HEADER:
            return({ ...state, toggleHeader: !state.toggleHeader})
        case IS_FULL: 
            return({ ...state, isFull: !state.isFull})
        default:
            return state
    }
}

