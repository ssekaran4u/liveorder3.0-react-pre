import { MATERIAL_LIST,MATERIAL_CONFIRM_LIST }  from './constants';
import { URL_MATERIAL } from '../lib/constants';
import { postToServer } from '../lib/comm-utils';

export const materiallist = (data) =>{
    return{
        type:MATERIAL_LIST,
        data
    }
}

export const getMaterialList= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_MATERIAL,data)
                        .then(function(resp){
                           // console.log("sweta",resp.data)
                            if(resp.data.Status == 'Success'){ 
                                dispatch(materiallist(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const materialConfirmlist = (data) =>{
    return{
        type:MATERIAL_CONFIRM_LIST,
        data
    }
}

export const getConfirmList= (data) =>{ 
        return (dispatch) =>{
                postToServer(URL_MATERIAL,data)
                        .then(function(resp){
                            //console.log("sweta",resp.data)
                            if(resp.data.Status == 'Success'){ 
                                dispatch(materialConfirmlist(resp.data.data)) 
                            }else{
                                //("error")
                            }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
