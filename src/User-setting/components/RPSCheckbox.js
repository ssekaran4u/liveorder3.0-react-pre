
import React,{Component} from 'react'
import { Form} from 'react-bootstrap'


const RPSCheckbox=(props)=>{
   
        return(
            <div className="rps-setting-checkbox">
                <Form.Check 
                    custom
                    inline
                    type="checkbox"
                    className="menutext padLeft39"
                    id="1"
                    label={props.label}
                    name="airfare"
                    onChange=""
                />
            </div>
               
        )
    
}
export default RPSCheckbox