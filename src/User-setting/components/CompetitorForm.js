import React from 'react'
import Drop from '../../BasicComponet/DropDown'
import {Button,Form} from 'react-bootstrap'


const CompetitorForm=(props)=>{

    return(
        <div>
            <div className="compProHead">
                Competitor Product Setup
            </div>
            <div className="alldropsfclocation">
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Edit Days <span className="colorRed">*</span></p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Data</p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Duration for No. of Prescription</p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Duration of Value<span className="colorRed">*</span></p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Duration of Weightage<span className="colorRed">*</span></p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Item Display<span className="colorRed">*</span></p>
                            </div>
                            <div className="selectlocation  ">
                                <Drop name={"fromarea"} Type={1}   />
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Unit Display</p>
                            </div>
                    
                            <div>
                                <label className="switchY">
                                    <input type="checkbox"  />
                                        <div className="sliderY round">
                                            <span className="onY">Yes</span>
                                            <span className="offY">No</span>
                                        </div>
                                </label>
                            </div>
                        </div>
                        <div className="user-ml20">
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Value</p>
                            </div>
                    
                            <div>
                                <label className="switchY">
                                    <input type="checkbox"  />
                                        <div className="sliderY round">
                                            <span className="onY">Yes</span>
                                            <span className="offY">Manual</span>
                                        </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <Button onClick="" className="userGoBtn">Go</Button>
                        </div>
                    </div>
                   
        </div>
    )
}

export default CompetitorForm