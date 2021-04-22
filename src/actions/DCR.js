import { DCR_PRODUCT, DCR_DROPDOWN,DCR_RCPA ,RCPAdetails,GET_PRODUCTS}  from './constants'
import {URL_DCR, URL_PRODUCT_DROPDOWN,URL_DCRSTAYED} from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getDCR = (data) =>{
    return{
        type:DCR_PRODUCT,
        data
    }
}

export const getProductDetail= (data) =>{
        return (dispatch) =>{
                postToServer(URL_DCR,data)
                        .then(function(resp){ 
                           
                            if(resp.data.Status == 'Success'){ 
                                dispatch(getDCR(resp.data.downloadDcrPdt)) 
                            }else{
                                //alert("error")
                            }
                        })

        }
}

export const getDCRDropdown = (data) =>{
    return{
        type:DCR_DROPDOWN,
        data
    }
}

export const getProductDropdown = (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_PRODUCT_DROPDOWN,data)
                        .then(function(resp){ 
                            dispatch(getDCRDropdown(resp.data)) 
                          
                        })

        }
}

export const getDcrRCPA = (data) =>{
    return{
        type:DCR_RCPA,
        data
    }
}

export const getDcotorRCPA = (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_DCRSTAYED,data)
                        .then(function(resp){ 
                            dispatch(getDcrRCPA(resp.data)) 
                          
                        })

        }
}



export const getRCPAdetails = (data) =>{
    return{
        type:RCPAdetails,
        data
    }
}

export const  getRCPA = (data) =>{ 
        return (dispatch) =>{
                postToServer("DCRAPI",data)
                        .then(function(resp){ 
                            dispatch(getRCPAdetails(resp.data)) 
                        })

        }
}


export const getProducts = (data) =>{
    return{
        type:GET_PRODUCTS,
        data
    }
}

// export const getGrpDoc = (data) =>{
//     return{
//         type:DCR_DOC,
//         data
//     }
// }

// export const getGroupDoctors = (data) =>{ 
//         return (dispatch) =>{
//                 postToServer(URL_DCRSTAYED,data)
//                         .then(function(resp){ 
//                             dispatch(getGrpDoc(resp.data)) 
                          
//                         })

//         }
// }







