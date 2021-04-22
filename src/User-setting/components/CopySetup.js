import React from 'react'
import Drop from '../../BasicComponet/DropDown'
import {Button} from 'react-bootstrap'

const CopySetup=(props)=>{

    return(
        <div>
             <div className="compProHead">
                Copy Setup
            </div>
            <div className="flexDisplay">
            <div className="user-ml20">
                <div className="distributorClaimListsfc">
                    <p className="paralocation">Copy From <span className="colorRed">*</span></p>
                </div>
                <div className="selectlocation  ">
                    <Drop name={"fromarea"} Type={1}   />
                </div>
            </div>
            <div>
                <Button onClick="" className="userGoBtn">Load</Button>
            </div>
            </div>
        </div>
    )
}

export default CopySetup