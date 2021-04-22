import { HOLIDAY_LEAVE,LEAVE_REQUEST,APPLY_LEAVE_TYPE,LEAVE_DETAIL,LEAVE_STATUS1,REQUEST_LEAVE_UPDATE } from '../actions/constants';

export default function Leave(state = {}, action) {
    switch (action.type) {

        case HOLIDAY_LEAVE:
            return ({...state, holidayLeaveStatus:action.data});
        case LEAVE_REQUEST:
                return ({...state, requestLeaveStatus:action.data});   
        case APPLY_LEAVE_TYPE:
                return ({...state, applyLeaveStatus:action.data});
        // case SAVE_LEAVE_TYPE:
        //         return ({...state, saveLeaveStatus:action.data});   
        case LEAVE_DETAIL:
                return({...state, leaveDetailStatus:action.data});
        case LEAVE_STATUS1:
                return({...state, leaveStatus:action.data}); 
        case REQUEST_LEAVE_UPDATE:
                return({...state, requestLeaveUpdate:action.data});                        
            
                default:
                      
            return state  
    }
}