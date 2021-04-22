import { LEAVE_STATUS,CLAIM_STATUS,MTP_STATUS,DWR_STATUS,ADMIN_REQUEST_STATUS,ADMIN_STATUS,ADMIN_REQUEST_LIST,
    ADMIN_UNLOCK_LIST,ADMIN_DOC_LIST,ADMIN_MTP_MONTH,ADMIN_MTP_LIST,ADMIN_SWRSUB_LIST,ADMIN_SWRSUB_FILTER,ADMIN_UNLOCK_FILTER,ADMIN_CONFIRM_LIST} from '../actions/constants'

export default function AdminDashboard(state = {}, action) {
    switch (action.type) {
        case LEAVE_STATUS:
            return ({...state, leavestatus:action.data});
        case CLAIM_STATUS:
            return ({...state, claimstatus:action.data}); 
        case MTP_STATUS:
                return ({...state, mtpstatus:action.data});         
        case DWR_STATUS:
            return ({...state, dwrstatus:action.data});
        case ADMIN_REQUEST_STATUS:
            return ({...state, requeststatus:action.data});
        case ADMIN_STATUS:
            return ({...state, allstatus:action.data});
        case ADMIN_REQUEST_LIST:
            return ({...state, requestList:action.data});
        case ADMIN_UNLOCK_LIST:
            return ({...state, unlockstatus:action.data});
        case ADMIN_DOC_LIST:
            return ({...state, doclist:action.data});
        case ADMIN_MTP_MONTH:
            return ({...state, mtpmonths:action.data});
        case ADMIN_MTP_LIST:
            return ({...state, mtplists:action.data});
        case ADMIN_SWRSUB_LIST:
            return ({...state, dwrsublist:action.data});
        case ADMIN_SWRSUB_FILTER:
            return ({...state, dwrfilterdata:action.data});
        case ADMIN_UNLOCK_FILTER:
            return ({...state, dwrunlockfilterdata:action.data});
        case ADMIN_CONFIRM_LIST:
            return ({...state, confirmlist:action.data});
                default:
            return state  
    }
}
