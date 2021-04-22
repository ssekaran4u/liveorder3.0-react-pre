import React from 'react'
import {Tab,Tabs} from'react-bootstrap'
import "../../../public/assets/css/user-setting.css";
import RPSSetup from './RPSSetup'
import RPSDetailsTab from './RPSDetailsTab'

const RPSEditAction=(props)=>{

    return(
        <div className="mt20">
            <div className="userSettingTabs">
                <Tabs
                    id="controlled-tab-example"
                    className="tabMargin mBorder"
                >
                    <Tab eventKey="BL" title="RPS Setup" className="">
                        <RPSSetup />
                    </Tab>
                    <Tab eventKey="HL" title="RPS Details">
                        <RPSDetailsTab />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
    
}

export default RPSEditAction