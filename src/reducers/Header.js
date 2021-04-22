import { NOTIFICATIONS } from '../actions/constants'

export default function HEADER(state = {}, action) { 
    switch (action.type) {
        case NOTIFICATIONS:
            //console.log("sumeet",action.data['0'].Notification)
            return ({...state, data:action.data});
        // case LOGOUT:
        //     return null
        default:
            return state
    }
    // return rootReducer(state, action);
}