import { LEAVE_STATUS,CLAIM_STATUS,MTP_STATUS,DWR_STATUS,ADMIN_REQUEST_STATUS,ADMIN_STATUS,
    ADMIN_REQUEST_LIST,ADMIN_UNLOCK_LIST,ADMIN_DOC_LIST,ADMIN_MTP_MONTH,ADMIN_MTP_LIST,ADMIN_SWRSUB_LIST,
    ADMIN_SWRSUB_FILTER,ADMIN_UNLOCK_FILTER,ADMIN_CONFIRM_LIST}  from './constants'
import {URL_ADMIN} from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getLeave = (data) =>{
    return{
        type:LEAVE_STATUS,
        data
    }
}

export const getleaveStatus= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(getLeave(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const getClaim = (data) =>{
    return{
        type:CLAIM_STATUS,
        data
    }
}

export const getClaimStatus= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(getClaim(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const get_MTP = (data) =>{
    return{
        type:MTP_STATUS,
        data
    }
}

export const getMtp= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_MTP(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const get_Submit_dwr = (data) =>{
    return{
        type:DWR_STATUS,
        data
    }
}

export const getdwrsubmission= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_Submit_dwr(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_request_type = (data) =>{
    return{
        type:ADMIN_REQUEST_STATUS,
        data
    }
}

export const getrequestType= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_request_type(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_status = (data) =>{
    return{
        type:ADMIN_STATUS,
        data
    }
}

export const getAllStatus= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_status(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_request_list = (data) =>{
    return{
        type:ADMIN_REQUEST_LIST,
        data
    }
}

export const getlistdata= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_request_list(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_unlock_list = (data) =>{
    return{
        type:ADMIN_UNLOCK_LIST,
        data
    }
}

export const getUnlockList= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_unlock_list(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_doc_list = (data) =>{
    return{
        type:ADMIN_DOC_LIST,
        data
    }
}

export const getdoctorlist= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_doc_list(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_Mtp_month = (data) =>{
    return{
        type:ADMIN_MTP_MONTH,
        data
    }
}

export const getMtpMonths= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_Mtp_month(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const get_Mtp_List = (data) =>{
    return{
        type:ADMIN_MTP_LIST,
        data
    }
}

export const getMtpdata= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_Mtp_List(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_Dwr_Filter = (data) =>{
    return{
        type:ADMIN_SWRSUB_LIST,
        data
    }
}

export const getDwrFilters= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_Dwr_Filter(resp.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_Dwr_Filterdata = (data) =>{
    return{
        type:ADMIN_SWRSUB_FILTER,
        data
    }
}

export const getfilterSelect= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_Dwr_Filterdata(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const get_unlock_Filterdata = (data) =>{
    return{
        type:ADMIN_UNLOCK_FILTER,
        data
    }
}

export const getunlockfilter= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_unlock_Filterdata(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const get_Confirm_list = (data) =>{
    return{
        type:ADMIN_CONFIRM_LIST,
        data
    }
}

export const getConfirmList= (data) =>{
        return (dispatch) =>{
                postToServer(URL_ADMIN,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(get_Confirm_list(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

