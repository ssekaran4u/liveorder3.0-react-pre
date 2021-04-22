import { REQUEST,APPROVAl,REQUEST_TYPE ,REQUEST_STATUS,REQUEST_DOWNLINE} from './constants'
import { URL_REQUEST } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getrequestdata = (data) =>{ 
    return{
        type:REQUEST,
        data
    }
}

export const getrequest= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_REQUEST,data)
                        .then(function(resp){ 
                           

                            if(resp.data["Status"]){
                                if(resp.data["Status"]=="Fail"){
                                    dispatch(getrequestdata([]))
                                }else{
                                    dispatch(getrequestdata(resp.data.data))
                                }
                            }else{
                                dispatch(getrequestdata(resp.data.data))
                            }
                             

                        })

        }
}
export const getrequestdown = (data) =>{ 
    return{
        type:REQUEST_DOWNLINE,
        data
    }
}

export const getDownlinerequest= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_REQUEST,data)
                        .then(function(resp){ 
                           

                            if(resp.data["Status"]){
                                if(resp.data["Status"]=="Fail"){
                                    dispatch(getrequestdown([]))
                                }else{
                                    dispatch(getrequestdown(resp.data.data))
                                }
                            }else{
                                dispatch(getrequestdown(resp.data.data))
                            }
                             

                        })

        }
}

export const getapprovaldata = (data) =>{ 
    return{
        type:APPROVAl,
        data
    }
}

export const getApproval= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_REQUEST,data)
                        .then(function(resp){ 
                           

                            if(resp.data["Status"]){
                                if(resp.data["Status"]=="Fail"){
                                    dispatch(getapprovaldata([]))
                                }else{
                                    dispatch(getapprovaldata(resp.data.data))
                                }
                            }else{
                                dispatch(getapprovaldata(resp.data.data))
                            }
                             

                        })

        }
}
export const getreqTypeData = (data) =>{ 
    return{
        type:REQUEST_TYPE,
        data
    }
}

export const getReqType= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_REQUEST,data)
                        .then(function(resp){ 
                          // console.log(resp)

                            if(resp.data["Status"]){
                                if(resp.data["Status"]=="Fail"){
                                    dispatch(getreqTypeData([]))
                                }else{
                                    dispatch(getreqTypeData(resp.data.data))
                                }
                            }else{
                                dispatch(getreqTypeData(resp.data.data))
                            }
                             

                        })

        }
}
export const getreqStatusData = (data) =>{ 
    return{
        type:REQUEST_STATUS,
        data
    }
}

export const getReqStatus= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_REQUEST,data)
                        .then(function(resp){ 
                           //console.log(resp)

                            if(resp.data["Status"]){
                                if(resp.data["Status"]=="Fail"){
                                    dispatch(getreqStatusData([]))
                                }else{
                                    dispatch(getreqStatusData(resp.data.data))
                                }
                            }else{
                                dispatch(getreqStatusData(resp.data.data))
                            }
                             

                        })

        }
}