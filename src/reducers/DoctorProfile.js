import { DOCTOR_PROFILE, DOCTOR_DETAIL, DOCTOR_AREA} from '../actions/constants'

export default function DOCTOR(state = {}, action) { 
    switch (action.type) {
        case DOCTOR_PROFILE:
            //console.log(action)
            return ({...state, data:action.data});
        case DOCTOR_DETAIL:
            //console.log(action)
            return ({...state, docInfo:action.data})
        case DOCTOR_AREA:
            //console.log(action)
            return ({...state, docArea:action.data})
        default:
            return state
    }
}
