import { DOCTOR_PROFILE, DOCTOR_DETAIL,DOCTOR_AREA } from './constants'
import {URL_DOCTORPROFILE, URL_SAMPLES } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const getDoctor = (data) =>{
    return{
        type:DOCTOR_PROFILE,
        data
    }
}

export const getDoctorDetail= (data) =>{
        return (dispatch) =>{
                postToServer(URL_DOCTORPROFILE,data)
                        .then(function(resp){
                            //console.log(resp.data);
                    
                    if(resp.data){
                        
                        if(!resp.data["Status"]){
                            dispatch(getDoctor(resp.data))
                        }
                        else{
                           dispatch(getDoctor([])) 
                        }
                        }else{
                            dispatch(getDoctor([]))
                        }
                        }).catch( (Error)=>{ dispatch(getDoctor([])) })

        }
}

export const getDoctorDet = (data) =>{
    return{
        type:DOCTOR_DETAIL,
        data
    }
}
export const getDoctorInfo= (data) =>{
        return (dispatch) =>{

                        dispatch(getDoctorDet(data))
        }
}

export const getArea = (data) =>{
    return{
        type:DOCTOR_AREA,
        data
    }
}

export const getDoctorArea = (data) =>{
    return (dispatch) =>{
                postToServer(URL_SAMPLES,data)
                        .then(function(resp){

                            dispatch(getArea(resp.data))

                        })

        }
}
