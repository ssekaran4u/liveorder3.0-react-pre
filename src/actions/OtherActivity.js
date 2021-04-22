import { GET_OACTIVITY } from './constants'
import {GET_OTHERACTIVITY} from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getActivity = (data) =>{
    return{
        type:GET_OACTIVITY,
        data
    }
}

export const getOtherActivities= (data) =>{
        return (dispatch) =>{
                postToServer(GET_OTHERACTIVITY,data)
                        .then(function(resp){ 
                            //console.log(resp.data);
                            dispatch(getActivity(resp.data["data"])) 

                            // if(resp.data.status == 200){ 
                            //     console.log(resp.data.statusText);
                                // dispatch(getDoctor(resp.data.downloadDcrPdt)) 
                            // }else{
                            //     // alert("error")
                            //     console.log(resp.data.statusText);
                            // }
                        })

        }
}

