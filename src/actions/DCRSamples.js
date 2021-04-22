import { DCR_PRAMOTIONS,SAMPLES} from './constants'
import {URL_SAMPLES } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getpramotionsData = (data) =>{
    return{
        type:DCR_PRAMOTIONS,
        data
    }
}
export const getPramotions = (data) =>{ 
    return (dispatch) =>{
                postToServer(URL_SAMPLES,data)
                        .then(function(resp){ 
                            dispatch(getpramotionsData(resp.data)) 
                          
                        })

        }
}

export const sendSample = (data) =>{
    return{
        type:SAMPLES,
        data
    }
}
