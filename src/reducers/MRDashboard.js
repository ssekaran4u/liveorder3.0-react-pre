import { 
    MR_PROGRESS, 
    MR_CALLAVERAGE_TABLE, 
    MR_UNCOVERDOCTOR_DATA, 
    MR_NONPERFORMING_DATA,
    MR_MONTHLY_CLAIM,
    MR_CALL_AVERAGE_GRAPH,
    MR_SECONDARY_SALES_GRAPH,
    MR_LEADERBOARD_DATA,MR_SECONDRY_STATE,MR_APICALL_STATE ,DROP_Year,DROP_SEC_YEAR} from '../actions/constants'

export default function MRDashboard(state={}, action){
    switch (action.type) {
        case MR_PROGRESS:
            // console.log("reducer", action)
            return ({...state, data:action.data});
        case MR_CALLAVERAGE_TABLE:
            //console.log("reducer", action)
            return ({...state, data_call_average_table:action.data});
        case MR_UNCOVERDOCTOR_DATA:
            //console.log("reducer", action)
            return ({...state, data_UnCover_Doctor_Data:action.data});
        case MR_NONPERFORMING_DATA:
            //console.log("reducersssss", action)
            return ({...state, data_Nonperforming_Data:action.data});
        case MR_MONTHLY_CLAIM:
            //console.log("reducersssss", action)
            return ({...state, data_Monthlyclaim_Data:action.data});
        case MR_CALL_AVERAGE_GRAPH:
            //console.log("reducersssss", action)
            return ({...state, data_call_average_graph_Data:action.data});
        case MR_SECONDARY_SALES_GRAPH:
            //console.log("reducersssss", action)
            return ({...state, data_secondary_sales_graph_Data:action.data});
        case MR_LEADERBOARD_DATA:
            //console.log("reducersssss", action)
            return ({...state, data_leaderboard_Data:action.data});
        case MR_SECONDRY_STATE:
            //console.log("reducersssss", action)
            return ({...state, secondrystate:action.data});
        case MR_APICALL_STATE:
           // console.log("reducersssss", action)
            return ({...state, apiresult:action.data});
        case DROP_Year:
        //console.log("reducersssss", action)
        return ({...state, yearDropVal:action.data});
        case DROP_SEC_YEAR:
        //console.log("reducersssss", action)
        return ({...state, yearSecDrop:action.data});
        default:
            return state
    }
}