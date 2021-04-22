import { 
    MR_PROGRESS, 
    MR_CALLAVERAGE_TABLE, 
    MR_UNCOVERDOCTOR_DATA,
    MR_NONPERFORMING_DATA, 
    MR_MONTHLY_CLAIM,
    MR_CALL_AVERAGE_GRAPH,
    MR_SECONDARY_SALES_GRAPH,
    MR_LEADERBOARD_DATA,MR_SECONDRY_STATE,MR_APICALL_STATE,DROP_Year,DROP_SEC_YEAR} from './constants'
import {
    URL_MR_PROGRESS, 
    URL_MR_CALLAVERAGE_TABLE, 
    URL_MR_UNCOVERDOCTOR_DATA, 
    URL_MR_NONPERFORMING_DATA,
    URL_MR_MONTHLY_CLAIM, 
    URL_MR_CALL_AVERAGE_GRAPH,
    URL_MR_SECONDARY_SALES_GRAPH,
    URL_MR_LEADERBOARD_DATA } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

/* action call for mr progress bar */
export const getMrDashProcess = (data) =>{
    return{
        type:MR_PROGRESS,
        data
    }
}
/* function call for mr progress bar */
export const getMrProgress= (data) =>{
    return (dispatch) => {
        postToServer(URL_MR_PROGRESS,data)
        .then(function(resp){
            // console.log("sumeetgsssssssssssssssssssss",resp.status);
            if(resp.status == 200 && resp.data.Status == "Success"){
                // console.log("dispach to resuser")
               
                // console.log(resp.data.data, "soun")
                if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getMrDashProcess(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getMrDashProcess([]))
                    return []
                }
            }
        })
        .catch(Error => { console.log(Error) })
    }
}

/* action call for mr call average table */
export const getCallAverageTableAction = (data) =>{
    return{
        type:MR_CALLAVERAGE_TABLE,
        data
    }
}
/* function call for mr call average table */
export const getMrCallAverageTable= (data) =>{
    if(data == 'year'){
        return (dispatch) => {
            dispatch(getCallAverageTableAction([]))
        }
    }else{
        return (dispatch) => {
            dispatch(getCallAverageTableAction(["loading"]))
            postToServer(URL_MR_CALLAVERAGE_TABLE,data)
            .then(function(resp){
                //console.log("sumeetgsssssssssssssssssssss",resp);
                if(resp.status == 200){
                   
                //    console.log(resp.data.data, "soun")
                if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getCallAverageTableAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getCallAverageTableAction([]))
                    return []
                }
                }
            })
            .catch(Error => { console.log(Error) })
        }
    }
    
}

/* action call for mr uncoverdoctor data */
export const getUnCoverDoctorDataAction = (data) =>{
    return{
        type:MR_UNCOVERDOCTOR_DATA,
        data
    }
}

/* function call for mr uncoverdoctor data */
export const getUnCoverDoctorData= (data) =>{
    return (dispatch) => {
        postToServer(URL_MR_UNCOVERDOCTOR_DATA,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                
                // console.log(resp.data.data, "soun")
                if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getUnCoverDoctorDataAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getUnCoverDoctorDataAction([]))
                    return []
                }
            }
        })
        .catch(Error => { console.log(Error) })
    }
}

/* action call for mr non performing data */
export const getNonPerformingTableAction = (data) =>{
    return{
        type:MR_NONPERFORMING_DATA,
        data
    }
}

/* function call for mr  non performing data */
export const getNonPerformingTableData= (data) =>{
    return (dispatch) => {
        postToServer(URL_MR_NONPERFORMING_DATA,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(getNonPerformingTableAction(resp.data.data))
                 // console.log(resp.data.data, "soun")
                 if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getNonPerformingTableAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getNonPerformingTableAction([]))
                    return []
                }

            }
        })
        .catch(Error => { console.log(Error) })
    }
}

/* action call for mr montly claim data */
export const getMonthlyClaimAction = (data) =>{
    return{
        type:MR_MONTHLY_CLAIM,
        data
    }
}

/* function call for mr montly claim  data */
export const getMontlyClaimData= (data) =>{
    return (dispatch) => {
        postToServer(URL_MR_MONTHLY_CLAIM,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(getMonthlyClaimAction(resp.data.data))
                // console.log(resp.data.data, "soun")
                if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getMonthlyClaimAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getMonthlyClaimAction([]))
                    return []
                }
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for mr call average graph data */
export const getCallAverageGraphAction = (data) =>{
    return{
        type:MR_CALL_AVERAGE_GRAPH,
        data
    }
}

/* function call for mr call average graph  data */
export const getCallAverageGraph= (data,year) =>{
    if(data == 'year'){
        return (dispatch) => {
        dispatch(getCallAverageGraphAction([]))
        }
    }else{
        return (dispatch) => {
            postToServer(URL_MR_CALL_AVERAGE_GRAPH,data)
            .then(function(resp){
                //console.log("sumeetgsssssssssssssssssssss",resp);
                if(resp.status == 200){
                   
                    // console.log(resp.data.data, "soun")
                if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getCallAverageGraphAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getCallAverageGraphAction([]))
                    return []
                }
                }
            })
            .catch(Error => { console.log(Error) })
        }
    }
    
}
/* action call for mr secondary sales graph data */
export const getSecondarySalesGraphAction = (data) =>{
    //console.log("sumeetgsssssssssssssssssssss",data);
    return{
        type:MR_SECONDARY_SALES_GRAPH,
        data
    }
}

/* function call for mr secondary sales graph  data */
export const getSecondarySalesGraph= (data) =>{

    if(data=='A'){
        return (dispatch) => {
            dispatch(getSecondarySalesGraphAction([]))
        }
    }
    return (dispatch) => {
        // dispatch(getSecondarySalesGraphAction([]))
        // return []


        postToServer(URL_MR_SECONDARY_SALES_GRAPH,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                // console.log("sumeetgsssssssssssssssssssss",resp);
                 if(resp.data.data["Status"]!="Fail"){
               
                 // console.log(resp.data.data, "soun")
                 if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getSecondarySalesGraphAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getSecondarySalesGraphAction([]))
                    return []
                }
                }
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for mr leaderboard data */
export const getLeaderBoardDataAction = (data) =>{
    return{
        type:MR_LEADERBOARD_DATA,
        data
    }
}

/* function call for mr leaderboard  data */
export const getLeaderBoardData= (data) =>{
    // console.log("sumeettttttttttkumarrrrrrrr")
    return (dispatch) => {
        dispatch(getLeaderBoardDataAction(["loading"]))
        postToServer(URL_MR_LEADERBOARD_DATA,data)
        .then(function(resp){
            // console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                if(resp.data.data["Status"]!="Fail"){
                
                // console.log(resp.data.data, "soun")
                if(Array.isArray(resp.data.data )){
                    // console.log("soundarya", resp.data.data)
                    dispatch(getLeaderBoardDataAction(resp.data.data))
                    return resp.data.data
                }
                else {
                    dispatch(getLeaderBoardDataAction([]))
                    return []
                }
                }
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
export const getSecondryVal = (data) =>{
    return{
        type:MR_SECONDRY_STATE,
        data
    }
}

export const setSecondryValue=(data) =>{
    return(dispatch)=>{
        dispatch(getSecondryVal(data))
    }
}
export const getapiResult = (data) =>{
    return{
        type:MR_APICALL_STATE,
        data
    }
}

export const setApiCallStatus=(data) =>{ 
    return(dispatch)=>{
        dispatch(getapiResult(data))
    }
}

export const getYearValue =(data) =>{
    return{
        type:DROP_Year,
        data
    }
}

export const setYear =(data) =>{
    return(dispatch)=>{
        dispatch(getYearValue(data))
    }
}
export const getSecYear=(data) =>{
    return{
        type:DROP_SEC_YEAR,
        data
    }
}
export const setSecondrySalesYear=(data) =>{
    return(dispatch)=>{
        dispatch(getSecYear(data))
    }
}
