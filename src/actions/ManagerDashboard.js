import {MANAGER_MONTH_LIST,
        MANAGER_DESIGNATION_LIST,
        MANAGER_PROGRESS,
        MANAGER_SECONDARY_SALES_GRAPH,
        MANAGER_UNCOVER_DOCTOR,
        MANAGER_MY_WORK_DETAILS,
        MANAGER_MY_TEAM_WORK_DETAILS,
        MANAGER_DOWN_CALL_AVERAGE,
        MANAGER_LEADER_BOARD,MANAGER_API_STATE,GET_CALLAVG_DOWNLINE,GET_WORK_DOWNLINE,GET_SEC_STATE,GET_TEAMSALES_REPORT,GET_LEADER_STATE,GET_SALES_YEAR,
        GET_TEAM_YEAR
        } from "./constants"
import {URL_MANAGER_MONTH_LIST,
        URL_MANAGER_DESIGNATION_LIST,
        URL_MANAGER_PROGRESS,
        URL_MANAGER_SECONDARY_SALES_GRAPH,
        URL_MANAGER_UNCOVER_DOCTOR,
        URL_MANAGER_MY_WORK_DETAILS,
        URL_MANAGER_MY_TEAM_WORK_DETAILS,
        URL_MANAGER_DOWN_CALL_AVERAGE,
        URL_MANAGER_LEADER_BOARD,URL_MANAGER_WORKOVER_VIEW_CHILD,URL_MANAGER_SECONDARY_SALES_CHILD
        } from "../lib/constants"

import { postToServer } from '../lib/comm-utils'

/* Action call for month list*/
export const actionGetMonthList=(data) =>{
    return{
        type:MANAGER_MONTH_LIST,
        data
    }
}

/* function call for month list*/
export const getMonthList= (data) =>{
    return (dispatch) => {
        postToServer(URL_MANAGER_MONTH_LIST,data)
        .then(function(resp){
             //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                //console.log("dispach to resuser")
                dispatch(actionGetMonthList(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* Action call for designation list*/
export const actionGetDesignationList=(data) =>{
    return{
        type:MANAGER_DESIGNATION_LIST,
        data
    }
}

/* function call for designation list*/
export const getDesignationList= (data) =>{
    return (dispatch) => {
        postToServer(URL_MANAGER_DESIGNATION_LIST,data)
        .then(function(resp){
            //  console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                //console.log("dispach to resuser")
                dispatch(actionGetDesignationList(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for manager progress bar */
export const getManagerDashProcess = (data) =>{
    return{
        type:MANAGER_PROGRESS,
        data
    }
}
/* function call for mr progress bar */
export const getManagerProgress= (data) =>{
    return (dispatch) => {
        postToServer(URL_MANAGER_PROGRESS,data)
        .then(function(resp){
            // console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(getManagerDashProcess(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for manager secondary sales */
export const actionGetManagerDashProcess = (data) =>{
    return{
        type:MANAGER_SECONDARY_SALES_GRAPH,
        data
    }
}
/* function call for manager secondary sales */
export const getManagerSecondarySalesGraph= (data) =>{
    // console.log("sssssssssssssssssjhhhhhhhhhhh")
    if(data == 'year'){
        return (dispatch) => {
            dispatch(actionGetManagerDashProcess([]))
        }
    }else{
    return (dispatch) => {
        postToServer(URL_MANAGER_SECONDARY_SALES_GRAPH,data)
        .then(function(resp){
            // console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(actionGetManagerDashProcess(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
}
/* action call for manager uncover doctor  */
export const actionGetManagerUncoverDoctor = (data) =>{
    return{
        type:MANAGER_UNCOVER_DOCTOR,
        data
    }
}
/* function call for manager uncover doctor */
export const getuncoverdoctordata= (data) =>{
    // console.log("sssssssssssssssssjhhhhhhhhhhh")
    return (dispatch) => {
        postToServer(URL_MANAGER_UNCOVER_DOCTOR,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(actionGetManagerUncoverDoctor(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for manager my work details  */
export const actiongetMyWorkDetails = (data) =>{
    return{
        type:MANAGER_MY_WORK_DETAILS,
        data
    }
}
/* function call for manager my work details */
export const getMyWorkDetails= (data) =>{
    // console.log("sssssssssssssssssjhhhhhhhhhhh")
    return (dispatch) => {
        dispatch(actiongetMyWorkDetails(["loading"]))
        postToServer(URL_MANAGER_MY_WORK_DETAILS,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(actiongetMyWorkDetails(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for manager my Team work details  */
export const actionMyTeamWorkDetails = (data) =>{
    return{
        type:MANAGER_MY_TEAM_WORK_DETAILS,
        data
    }
}
/* function call for manager my Team work details */
export const getMyTeamWorkDetails= (data) =>{
    // console.log("sssssssssssssssssjhhhhhhhhhhh")
    return (dispatch) => {
        dispatch(actionMyTeamWorkDetails(["loading"]))
        postToServer(URL_MANAGER_MY_TEAM_WORK_DETAILS,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(actionMyTeamWorkDetails(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for manager downline call average details  */
export const actionDownCallAverageGraph = (data) =>{
    return{
        type:MANAGER_DOWN_CALL_AVERAGE,
        data
    }
}
/* function call for manager downline call average details */
export const getDownCallAverageGraph= (data) =>{
    // console.log("sssssssssssssssssjhhhhhhhhhhh")
    return (dispatch) => {
        dispatch(actionDownCallAverageGraph(["loading"]))
        postToServer(URL_MANAGER_DOWN_CALL_AVERAGE,data)
        .then(function(resp){
            //console.log("sumeetgsssssssssssssssssssss",resp);
            if(resp.status == 200){
                dispatch(actionDownCallAverageGraph(resp.data.data))
            }
        })
        .catch(Error => { console.log(Error) })
    }
}
/* action call for manager downline call average details  */
export const actiongetManagerLeaderBoardData = (data) =>{
    return{
        type:MANAGER_LEADER_BOARD,
        data
    }
}
/* function call for manager downline call average details */
export const getManagerLeaderBoardData= (data) =>{
    // console.log("sssssssssssssssssjhhhhhhhhhhh")
    return (dispatch) => {
        dispatch(actiongetManagerLeaderBoardData(["loading"]))
        postToServer(URL_MANAGER_LEADER_BOARD,data)
        .then(function(resp){
            // console.log("sumeetgkkkkkkkkkkkkkkkkkkkkk",resp);
            if(resp.status == 200){
                // console.log("sumeetgkkkkkkkkkkkkkkkkkkkkk",resp.data.data);
                dispatch(actiongetManagerLeaderBoardData(resp.data.data))
                
            }
            // if(resp.status == 200){
            //     dispatch((resp.data.data))
            // }
        })
        .catch(Error => { console.log(Error) })
    }
}

export const getApiState=(data)=>{
    return{
        type:MANAGER_API_STATE,
        data
    }
}
export const setApiState=(data) =>{
    return(dispatch) =>{
        dispatch(getApiState(data))
    }
}

export const getDownlineData=(data)=>{
    return{
        type:GET_CALLAVG_DOWNLINE,
        data
    }
}
export const getCallAvgDownline=(data)=>{
    return(dispatch)=>{
        // dispatch(getDownlineData(["loading"]))
        postToServer(URL_MANAGER_DOWN_CALL_AVERAGE, data)

            .then(resp => { 
                //console.log("beforelist=>>",resp)
                if (resp.status == 200) {
                    //console.log("list=>>",resp)
                    dispatch(getDownlineData(resp.data.data))
                }
            })
            .catch(error => { console.log(error) })
    }
}
export const getWorkDownlineData=(data)=>{
    return{
        type:GET_WORK_DOWNLINE,
        data
    }
}

export const getWorkViewDownline=(data)=>{
    return(dispatch)=>{
        // dispatch(getWorkDownlineData(["loading"]))
        postToServer(URL_MANAGER_WORKOVER_VIEW_CHILD, data)

            .then(resp => { 
                //console.log("beforelist=>>",resp)
                if (resp.status == 200) {
                    //console.log("list=>>",resp)
                    dispatch(getWorkDownlineData(resp.data.data))
                }
            })
            .catch(error => { console.log(error) })
    }
}
export const getSecStateData=(data)=>{
    return{
        type:GET_SEC_STATE,
        data
    }
}
export const setSecState=(data)=>{
    return(dispatch)=>{
        dispatch(getSecStateData(data))
    }
}
export const getTeamSalesData=(data)=>{
    return{
        type:GET_TEAMSALES_REPORT,
        data
    }
}

export const getTeamSalesReport=(data) =>{
    return(dispatch)=>{
        // dispatch(getTeamSalesData(["loading"]))
        postToServer(URL_MANAGER_SECONDARY_SALES_CHILD, data)

        .then(resp => { 
           // console.log("beforelist=>>",resp)
            if (resp.status == 200) {
                //console.log("list=>>",resp)
                dispatch(getTeamSalesData(resp.data.data))
            }
        })
        .catch(error => { console.log(error) })
       
    }
}
export const getLeaderStateData=(data)=>{
    return{
        type:GET_LEADER_STATE,
        data
    }
}
export const setLeaderState=(data)=>{
    return(dispatch)=>{
        dispatch(getLeaderStateData(data))
    }
}
export const getManagerDropYear=(data)=>{
    return{
        type:GET_SALES_YEAR,
        data
    }
}
export const setDropYear=(data)=>{
    return(dispatch)=>{
        dispatch(getManagerDropYear(data))
    }
}
export const getTeamReportDropYear=(data)=>{
    return{
        type:GET_TEAM_YEAR,
        data
    }
}
export const setTeamDropYear=(data)=>{
    return(dispatch)=>{
        dispatch(getTeamReportDropYear(data))
    }
}
