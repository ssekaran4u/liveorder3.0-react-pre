import {
    OVERALL_SALES, 
    MONTHS, 
    INVENTORY_FILTER, 
    LAST_ORDER_DATE, 
    ONGOING_ORDER_STATUS, 
    PAST_ORDER_STATUS, 
    DISTRIBUTOR_LIST,
    FINANCIAL_YEAR,
    RETAILER_STATUS,
    WELCOME,
    TOTAL_SALES
} from "./kamConstants";
import { postToServer } from "../../lib/comm-utils";
import {URL_KAM_DASHBOARD} from "../../lib/constants";

export const getOverAllSalesView = (data) => {
    return(dispatch) => {
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: OVERALL_SALES,
                    payload: response.data.data
                })
            }
        })
        .catch(Error => { console.log(Error) })
    }
}

export const getMonths = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: MONTHS,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getInventoryFilter = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: INVENTORY_FILTER,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getLastOrderDate = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: LAST_ORDER_DATE,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getOngoingOrderStatus = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: ONGOING_ORDER_STATUS,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getPastOrderStatus = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: PAST_ORDER_STATUS,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getDistributorList = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: DISTRIBUTOR_LIST,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getFinancialYear = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: FINANCIAL_YEAR,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getRetailersStatus = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: RETAILER_STATUS,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getLoginName = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: WELCOME,
                    payload: response.data.data
                })
            }
        })
    }
}

export const getTotalSales = (data) => {
    return(dispatch)=>{
        postToServer(URL_KAM_DASHBOARD,data)
        .then(function(response){
            if(response.status == 200 && response.statusText == "OK"){
                dispatch({
                    type: TOTAL_SALES,
                    payload: response.data.data
                })
            }
        })
    }
}