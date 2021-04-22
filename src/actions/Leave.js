import { HOLIDAY_LEAVE,LEAVE_REQUEST,APPLY_LEAVE_TYPE,LEAVE_DETAIL,LEAVE_STATUS1,REQUEST_LEAVE_UPDATE }  from './constants';
import { URL_LEAVE } from '../lib/constants';
import { postToServer } from '../lib/comm-utils';

export const holidayLeave = (data) =>{
    return{
        type:HOLIDAY_LEAVE,
        data
    }
}

export const getHolidayLeave= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_LEAVE,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(holidayLeave(resp.data.Data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const requestLeave = (data) =>{
    return{
        type:LEAVE_REQUEST,
        data
    }
}

export const getRequestLeave= (data) =>{ 
   // console.log(data)
        return (dispatch) =>{
                postToServer(URL_LEAVE,data)
                        .then(function(resp){
                           // console.log(resp.data.Data,"kumar")
                            if(resp.data.Status == 'Success'){ 
                                dispatch(requestLeave(resp.data.Data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const applyLeave = (data) =>{
    return{
        type:APPLY_LEAVE_TYPE,
        data
    }
}

export const applyLeaveType= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_LEAVE,data)
                        .then(function(resp){ //console.log("hii",resp.data)
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(applyLeave(resp.data.Data))  
                                // alert("yes")
                            }else{
                                //("error")
                                console.log("failed")
                                // alert("No")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const requestLeaveUpdate = (data) =>{
    return{
        type:REQUEST_LEAVE_UPDATE,
        data
    }
}

export const requestLeaveUpdateType= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_LEAVE,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(requestLeaveUpdate(resp.data.Data)) 
                                // alert("yes")
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

// export const saveLeave = (data) =>{
//     return{
//         type:SAVE_LEAVE_TYPE,
//         data
//     }
// }

// export const saveLeaveType= (data) =>{ 
//         return (dispatch) =>{
//                 postToServer(URL_LEAVE,data)
//                         .then(function(resp){ 
                           
//                             if(resp.data.Status == 'Success'){ 
//                                 dispatch(saveLeave(resp.data.Data))
//                                 // getRequestLeave(data);
//                             }else{
//                                 //("error")
//                             }
//                         }).catch(error => {
//                             // console.log(error);
//                         });

//         }
// }

export const get_status = (data) =>{
    return{
        type:LEAVE_STATUS1,
        data
    }
}

export const getAllStatus= (data) =>{
        return (dispatch) =>{
                postToServer(URL_LEAVE,data)
                        .then(function(resp){//console.log("higggggi",resp.data)
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_status(resp.data.Data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const leaveDetail = (data) =>{
    return{
        type:LEAVE_DETAIL,
        data
    }
}

export const detailLeaveType= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_LEAVE,data)
                        .then(function(resp){ //console.log("hii",resp.data)
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(leaveDetail(resp.data.Data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}