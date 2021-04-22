import {ENTRY_TYPE} from "../actions/constants";

export default function ExpenseClaim(state={}, action){
    switch(action.type){
        case ENTRY_TYPE:
            return ({ ...state, entry_type: action.payload})
        default: 
            return state;
    }
}