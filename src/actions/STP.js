import { STP_PATCH,STP_TARGET,STP_DAYS,STP_AREA_INFO}  from './constants'
import {URL_STP} from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getPatch = (data) =>{
    return{
        type:STP_PATCH,
        data
    }
}

export const getAreaPatchs= (data) =>{
        return (dispatch) =>{
                postToServer(URL_STP,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(getPatch(resp.data.Grade_mst)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const getTarget = (data) =>{
    return{
        type:STP_TARGET,
        data
    }
}

export const gettargetcalls= (data) =>{
        return (dispatch) =>{
                postToServer(URL_STP,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(getTarget(resp.data.Result)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const getDaysPlan = (data) =>{
    return{
        type:STP_DAYS,
        data
    }
}

export const getplanDays= (data) =>{
        return (dispatch) =>{
                postToServer(URL_STP,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(getDaysPlan(resp.data.Result)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const getArea = (data) =>{
    return{
        type:STP_AREA_INFO,
        data
    }
}

export const getweekDetails = data => {
    return dispatch => {
        dispatch(getArea(data));
    };
};
