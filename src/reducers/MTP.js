import { MTP_TARGET,MTP_PLANNED,MTP_DAYS,MTP_PATCH,MTP_DOWNLINE_PATCH} from '../actions/constants'


export default function MTP(state = {}, action) { 
    switch (action.type) {
        case MTP_TARGET:
           // console.log("sweta",action.data)
            return ({...state, data:action.data});
        case MTP_PLANNED:
           // console.log("sweta",action.data)
            return ({...state, plandata:action.data});
        case MTP_DAYS:
            // console.log("sweta",action.data)
                return ({...state, plandays:action.data});
        case MTP_PATCH:
            // console.log("sweta",action.data)
                return ({...state, patches:action.data});
        case MTP_DOWNLINE_PATCH:
            // console.log("sweta",action.data)
                return ({...state, downpatches:action.data});
        default:
            return state
    }
}