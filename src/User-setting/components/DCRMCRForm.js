import React from 'react'
import Drop from '../../BasicComponet/DropDown'
import {Button} from 'react-bootstrap'

const DCRMCRForm=(props)=>{

    return(
        <div>
            <div className="alldropsfclocation">
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Type <span className="colorRed">*</span></p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Division</p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Region</p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">MR Name<span className="colorRed">*</span></p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div>
                            <Button onClick="" className="userGoBtn">Go</Button>
                        </div>
                    </div>
               
        </div>
    )
}

export default DCRMCRForm