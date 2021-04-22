import {MTP_TARGET,MTP_PLANNED,MTP_DAYS,MTP_DOWNLINE_PATCH}  from './constants'
import {MTP_URL,MTP_MANAGER_URL} from '../lib/constants'
import { postToServer } from '../lib/comm-utils'
import { MTP_PATCH }  from './constants'

export const getTarget = (data) =>{
    return{
        type:MTP_TARGET,
        data
    }
}




export const getPatch = (data) =>{
    return{
        type:MTP_PATCH,
        data
    }
}

export const getAreaPatchs= (data) =>{

   
        return (dispatch) =>{
                postToServer(MTP_URL,data)
                        .then(function(resp){
                          //  console.log("grad",resp.data)
                           // if(resp.data.Status == 'Success'){ 
                                dispatch(getPatch(resp.data)) 
                            // }else{
                            //     //("error")
                            // }
                        }).catch(error => {
                            console.log(error);
                        });

        }
}


export const getTargetData= (data) =>{
        return (dispatch) =>{
                postToServer(MTP_URL,data)
                        .then(function(resp){ 
                           
                          //  if(resp.data.Status == 'Success'){ console.log("sweta",resp.data)
                          
                          
                            let head={}
                            let vist={}
                            let plan={}
                            vist["grade"]="Target Visits"
                            plan["grade"]="Planned Visits"
                           if(resp.data.Result){
                            resp.data.Result.map( (a)=>{
                                head[a.c_description]=a.c_code
                                plan[a.c_description]=0
                                vist[a.c_description]=0
                            })


                           


                           var kval=0 ;
                             var  Vval=0;
                            if(resp.data.Result1){
                                resp.data.Result1.map( (a)=>{
                                    plan[a.c_description]=a.n_noof_visit
                                    kval =   parseInt(a.n_noof_visit) + kval
                                })
                            }
                           
                            if(resp.data.Result2){
                                resp.data.Result2.map( (a)=>{
                                    vist[a.Discription]=a.NO_OF_VIST
                                    Vval=Vval+  parseInt(a.NO_OF_VIST)
                                })
                            }
                        }
                        //console.log(resp.data.Result,'vvv',head,vist,plan)
                       let p=[]
                       let t=[]
                       let n=[]

                       let op=[]
                       let  k=[]
    
                    //    head["No grad"]="0"
                       head["grade"]="0"
                      
                    //    Object.keys(head).map((q,index)=>{
                       
                   
                    //   k.push(q)
                   
                        
                    //    })
                       ///op.push(k)
                       n.push(vist)
                       n.push(plan)
                       
                      let  kl= {head:head, data:n, count:kval   , Vval:Vval }
                        
                      
                       
                     



                        
                       // k={ head:head, vist:vist,  plan:plan   }



                          
                          dispatch(getTarget(kl)) 
                          //  }else{
                                //("error")
                           // }
                        }).catch(error => {
                             console.log(error);
                        });

        }
}
export const getplanned = (data) =>{
    return{
        type:MTP_PLANNED,
        data
    }
}

export const getTargetPlan= (data) =>{
        return (dispatch) =>{
                postToServer(MTP_URL,data)
                        .then(function(resp){ 
                           
                          //  if(resp.data.Status == 'Success'){ console.log("sweta",resp.data)
                                dispatch(getplanned(resp.data.Result2)) 
                          //  }else{
                                //("error")
                           // }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}
export const DaysPlan = (data) =>{
    return{
        type:MTP_DAYS,
        data
    }
}

export const getPlanned= (data) =>{
        return (dispatch) =>{
                postToServer(MTP_URL,data)
                        .then(function(resp){ 
                           
                          //  if(resp.data.Status == 'Success'){ console.log("sweta",resp.data)
                                dispatch(DaysPlan(resp.data)) 
                          //  }else{
                                //("error")
                           // }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}

export const downlinePatch = (data) =>{
    return{
        type:MTP_DOWNLINE_PATCH,
        data
    }
}

export const getDownlinepatch= (data) =>{
        return (dispatch) =>{
                postToServer(MTP_MANAGER_URL,data)
                        .then(function(resp){ 
                           
                          //  if(resp.data.Status == 'Success'){ console.log("sweta",resp.data)
                          dispatch(downlinePatch(resp.data)) 
                          //  }else{
                                //("error")
                           // }
                        }).catch(error => {
                            // console.log(error);
                        });

        }
}


