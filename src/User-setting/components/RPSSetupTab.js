import React from 'react'
import RPSEditAction from './RPSEditAction'
import CopySetup from './CopySetup'
import {Button} from 'react-bootstrap'

const RPSSetup=(props)=>{

    return(
        <div>
            <div className="dcr-list-sec ">
                <CopySetup />
            </div>
            <div className="dcr-list-sec ">
                <RPSEditAction />
            </div>
            {props.tabno == "1" ?
            <div className="flexDisplay">
                <div>
                    <Button onClick="" className="userSaveBtn">UPDATE</Button>
                </div>
                <div>
                    <Button onClick="" className="userCancelBtn">CANCEL</Button>
            </div>
            </div>:null}
        </div>
    )
}

export default RPSSetup