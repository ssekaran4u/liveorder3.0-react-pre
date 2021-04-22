import { DCR_SEARCH,DCR_STAYED } from './constants'
import {URL_DCRSEARCH,URL_DCRSTAYED,SearchDoctor} from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getDCRSearchRes = (data) =>{
    return{
        type:DCR_SEARCH,
        data
    }
}

export const getserachData= (data) =>{ 

    // if(data==null){
    //     return (dispatch) =>{   dispatch(getDCRSearchRes([])) }
    // }else{
        return (dispatch) =>{
                postToServer("DCRAPI",data)
                        .then(function(resp){ 
                            dispatch(getDCRSearchRes(resp.data["data"])) 
                        })

        }
    //}
}

export const getDCRStayed = (data) =>{
    return{
        type:DCR_STAYED,
        data
    }
}

export const getStayedData = (data) => {
    return (dispatch) =>{
        postToServer(URL_DCRSTAYED,data)
                .then(function(resp){
                  dispatch(getDCRStayed(resp.data))  
                })
    }
}