import React from 'react'
import {Button,Form} from 'react-bootstrap'
import Drop from '../../BasicComponet/DropDown'

const CompUserRight=(props)=>{

    return(
        <div className='dcr-list-sec meetingDiv'>
        <div className="rcpa-sec-setting">User Rights To Change Type</div>
        <div className="flexDisplay pt20">
        <div className="user-ml20">
            <div className="distributorClaimListsfc">
                <p className="paralocation">Prescription</p>
            </div>
            <div className="flexDisplay pt20">
                <div>
                    <Form.Check 
                    custom
                    inline
                    type="radio"
                    id="custom-radio1"
                    label="Change"
                    className="user-can-radio"
                    />
                </div>
                <div>
                    <Form.Check 
                    custom
                    inline
                    type="radio"
                    id="custom-radio1"
                    label="Cannot Change"
                    className="user-cant-radio"
                    />
                </div>
            </div>
           
        </div>
            <div className="user-ml20">
                <div className="distributorClaimListsfc">
                    <p className="paralocation">Quantity</p>
                </div>
                <div className="flexDisplay pt20">
                    <div>
                        <Form.Check 
                        custom
                        inline
                        type="radio"
                        id="custom-radio1"
                        label="Change"
                        className="user-can-radio"
                        />
                    </div>
                    <div>
                        <Form.Check 
                        custom
                        inline
                        type="radio"
                        id="custom-radio1"
                        label="Cannot Change"
                        className="user-cant-radio"
                        />
                    </div>
                </div>
            
            </div>
            <div className="user-ml20">
            <div className="distributorClaimListsfc">
                <p className="paralocation">Value</p>
            </div>
            <div className="flexDisplay pt20">
                <div>
                    <Form.Check 
                    custom
                    inline
                    type="radio"
                    id="custom-radio1"
                    label="Change"
                    className="user-can-radio"
                    />
                </div>
                <div>
                    <Form.Check 
                    custom
                    inline
                    type="radio"
                    id="custom-radio1"
                    label="Cannot Change"
                    className="user-cant-radio"
                    />
                </div>
            </div>
           
        </div>
        <div className="user-ml20">
            <div className="distributorClaimListsfc">
                <p className="paralocation">Weightage</p>
            </div>
            <div className="flexDisplay pt20">
                <div>
                    <Form.Check 
                    custom
                    inline
                    type="radio"
                    id="custom-radio1"
                    label="Change"
                    className="user-can-radio"
                    />
                </div>
                <div>
                    <Form.Check 
                    custom
                    inline
                    type="radio"
                    id="custom-radio1"
                    label="Cannot Change"
                    className="user-cant-radio"
                    />
                </div>
            </div>
           
        </div>
        <div className="user-ml20">
            <div className="distributorClaimListsfc">
                <p className="paralocation">Audit Frequency<span className="colorRed">*</span></p>
            </div>
            <div className="selectlocation  ">
                <Drop name={"fromarea"} Type={1}   />
            </div>
        </div>
        <div className="user-ml20">
            <div className="distributorClaimListsfc">
                <p className="paralocation">Value In<span className="colorRed">*</span></p>
            </div>
            <div className="selectlocation  ">
                <Drop name={"fromarea"} Type={1}   />
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
                            <span className="offY">No</span>
                        </div>
                </label>
            </div>
        </div>
        </div>
        
    </div>
    )
}

export default CompUserRight