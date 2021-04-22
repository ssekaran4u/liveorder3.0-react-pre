import { NOTIFICATIONS, LOGOUT } from './constants'
import { URL_DCRSTAYED } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getnotified = (data) =>{
    return{
        type:NOTIFICATIONS,
        data
    }
}

export const gotnotifications= (data) =>{ 
    return (dispatch) =>{
        postToServer(URL_DCRSTAYED,data)
        .then(function(resp){

        if(resp.data["Status"]){
        if(resp.data["Status"]=="Fail"){
            dispatch(getnotified([]))
        }else{
            dispatch(getnotified(resp.data))
        }
        }else{
            dispatch(getnotified(resp.data))
        }

        }).catch(error => {
            // console.log(error);
         })

    }
}

export const onLogout = () => {
    return(dispatch)=>{
        dispatch({
            type: LOGOUT,
            payload: null
        })
    }
}