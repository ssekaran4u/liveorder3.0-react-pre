import { MASTEREDIT, SET_MASTER_DATA, TOGGLE_DCR_HEADER, IS_FULL} from '../actions/constants'

export default function MASTERLIST(state = {}, action) {
    
    switch (action.type) {

        case MASTEREDIT:
        return ({...state, Edit:action.data});

        /*case MASTER_LIST:
            return ({...state, data:action.data});*/
        /*case MASTER_FILTER:
            return ({...state, Filter:action.data});*/
        /*case MASTERheader:
            return ({...state, header:action.data});*/
        case SET_MASTER_DATA:
            return ({...state, header:action.header, data:action.data})
        case TOGGLE_DCR_HEADER:
            return({ ...state, toggleHeader: !state.toggleHeader})
        case IS_FULL: 
            return({ ...state, isFull: !state.isFull})
        default:
            return state
    }
}

