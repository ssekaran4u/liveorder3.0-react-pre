import {MANAGER_MONTH_LIST,
    MANAGER_DESIGNATION_LIST,
    MANAGER_PROGRESS,
    MANAGER_SECONDARY_SALES_GRAPH,
    MANAGER_UNCOVER_DOCTOR,
    MANAGER_MY_WORK_DETAILS,
    MANAGER_MY_TEAM_WORK_DETAILS,
    MANAGER_DOWN_CALL_AVERAGE,
    MANAGER_LEADER_BOARD,MANAGER_API_STATE,GET_CALLAVG_DOWNLINE,GET_WORK_DOWNLINE,GET_SEC_STATE,GET_TEAMSALES_REPORT,GET_LEADER_STATE,GET_SALES_YEAR,
    GET_TEAM_YEAR} from '../actions/constants'

export default function ManagerDashboard(state={},action){
    switch(action.type){
        case MANAGER_MONTH_LIST:
            //console.log("reducer", action)
            return({...state, monthlist:action.data});
        case MANAGER_DESIGNATION_LIST:
            return({...state,designationlist:action.data})    
        case MANAGER_PROGRESS:
            return({...state,managerprocess:action.data})    
        case MANAGER_SECONDARY_SALES_GRAPH:
            //console.log("reducer", action)
            return({...state,manager_secondary_graph:action.data})    
        case MANAGER_UNCOVER_DOCTOR:
            //console.log("reducer", action)
            return({...state,manager_uncover_doctor:action.data})    
        case MANAGER_MY_WORK_DETAILS:
            //console.log("reducer", action)
            return({...state,manager_my_workdetails:action.data})    
        case MANAGER_MY_TEAM_WORK_DETAILS:
            //console.log("reducer", action)
            return({...state,manager_my_teamworkdetails:action.data})    
        case MANAGER_DOWN_CALL_AVERAGE:
            // console.log("reducer", action)
            return({...state,manager_down_callaverage:action.data})    
        case MANAGER_LEADER_BOARD:
            // console.log("reducer", action)
            return({...state,data_leaderboard_Data:action.data})    
        case MANAGER_API_STATE:
            // console.log("reducer", action)
            return({...state,managerApiState:action.data})
        case GET_CALLAVG_DOWNLINE:
            // console.log("reducer", action)
            return({...state,callavgdownline:action.data})
        case GET_WORK_DOWNLINE:
            // console.log("reducer", action)
            return({...state,workdownline:action.data})
        case GET_SEC_STATE:
            // console.log("reducer", action)
            return({...state,secondrygData:action.data})
        case GET_TEAMSALES_REPORT:
            //console.log("reducer", action)
            return({...state,teamsalesRep:action.data})
        case GET_LEADER_STATE:
            //console.log("reducer", action)
            return({...state,leaderboardState:action.data})
        case GET_SALES_YEAR:
            //console.log("reducer", action)
            return({...state,salesYear:action.data})
        case GET_TEAM_YEAR:
        //console.log("reducer", action)
        return({...state,teamYearData:action.data})
    default:
        return state
    }
}
