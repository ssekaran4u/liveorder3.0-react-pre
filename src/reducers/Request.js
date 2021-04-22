import { REQUEST,APPROVAl,REQUEST_TYPE ,REQUEST_STATUS,REQUEST_DOWNLINE} from '../actions/constants'

export default function Request(state = {}, action) { 
    switch (action.type) {
        case REQUEST:
          //  console.log("test",action.data)
            return ({...state, data:action.data});
        case APPROVAl:
           //console.log("test",action.data)
            return ({...state, dataApprov:action.data});
            case REQUEST_TYPE:
           // console.log("test",action.data)
            return ({...state, reqTypeData:action.data});
            case REQUEST_STATUS:
           // console.log("test",action.data)
            return ({...state, reqStatusData:action.data});
            case REQUEST_DOWNLINE:
                // console.log("test",action.data)
                 return ({...state, reqStatusdown:action.data});
        default:
            return state
    }
}