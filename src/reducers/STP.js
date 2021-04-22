import { STP_PATCH, STP_TARGET,STP_DAYS,STP_AREA_INFO} from '../actions/constants'


export default function Request(state = {}, action) { 
    switch (action.type) {
        case STP_PATCH:
          //  console.log("test",action.data)
            return ({...state, data:action.data});
        case STP_TARGET:
        //  console.log("test",action.data)
            return ({...state, targetdata:action.data});
        case STP_DAYS:
            //  console.log("test",action.data)
            return ({...state, days:action.data});
        case STP_AREA_INFO:
              //console.log("test",action.data)
            return ({...state, areainfo:action.data});
        default:
            return state
    }
}