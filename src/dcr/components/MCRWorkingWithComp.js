import React,{Component} from 'react'
import {Form} from 'react-bootstrap'

function  MCRWorkingWithComp(props){

   

    return(
            <div className="pf25">
                <div className="timeSlot">
                 <Form.Check 
                        custom
                        inline
                        type="checkbox"
                        id={'alonework'+props.id}
                        label="I am working alone"
                        checked={props.result=="1"? true :null }
                     onChange={   (event)=>{  props.selfworkcomponetfun(event.target.checked)   } }
                    />
                </div>
            </div>
            )
    
}
export  default MCRWorkingWithComp


