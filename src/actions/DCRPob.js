import { DCR_POB } from './constants'
import { postToServer } from '../lib/comm-utils'
import { URL_DCR } from '../lib/constants'

export const getPobData = (data) => {
    return{
        type:DCR_POB,
        data
    }
}

export const getPobDetails = (data) =>{
    return (dispatch) => {
        postToServer(URL_DCR,data)
                .then(function(resp){ 
                    if(resp.data.Status == 'Success'){
                        dispatch(getPobData(resp.data.WorkWith))
                    }else{
                        dispatch(getPobData([]))
                    }
                })
    }
}


