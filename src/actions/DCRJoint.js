import { DCR_JOINT } from './constants'
import { DCRAPI } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getJointData = (data) =>{
    return{
            type:DCR_JOINT,
            data
        }
    
}

export const getJointDetail = (data) =>{
    return (dispatch) =>{ 
            postToServer(DCRAPI,data)
                    .then(function(resp){ 
                        if(resp.data.Status == "Success"){
                            dispatch(getJointData(resp.data.WorkWith))
                        }else{
                            alert("error")
                        }
                    }).catch( (Error)=> { alert('ffx') })
        
    }
}
