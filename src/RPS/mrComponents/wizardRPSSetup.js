import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from '../../BasicComponet/DropDown'
import StatusPopup from '../../lib/StatusPopup'

//import { Dropdown } from 'semantic-ui-react'

const WizardRPSSetup = (props) => {
  const { setupOptions,handleStepChange,setUpId,sSetUp,srNo,apprid} = props
 // const [setuplst ,selectSetUp] = useState([])
  const [sid,SetUpId] = useState("-1")
  const [sMsg,setMsg]=useState('')
  const [successPop,showSuccess] = useState(false)

  const selectSetUp=(value)=>{ 
      SetUpId(value)
    
  }
  const handleGo =()=>{
    if(setUpId){
        handleStepChange(setUpId,'','')
    }else{
      if(sid == '-1'){
        showSuccess(true)
        setMsg("Please Select SetUp")
      }else{
        handleStepChange(sid,'','')
      }
    }
    
   
  }
  
  const handlNext=()=>{
    handleStepChange(setUpId,'','')
  }
  return (
    <div className="rps-tab-sec1">
      <Row >
        <Col xl={3} lg={4} md={6} sm={12} xs={12}>
          <Form.Label className="customized-label">Select RPS Setup<span className="colorRed">*</span></Form.Label>
          <div className="rpsDrop">
          <div className="singledropdown dcrStay">
          {srNo == "add" ?
             <Dropdown   
                name={"from"} 
                Type={1}     
                Selected={setUpId ? setUpId : sid}
                selectedProduct={(value)=>selectSetUp(value)} 
                data={setupOptions} 
            />
            :
            <Form.Control 
              type="text" 
              className="customized-input"
              placeholder="" 
              value={sSetUp} 
              onChange=""
            />
            }
          </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12}>
        {apprid == "1" ?  
          <button className="primary mt20" onClick={()=>handlNext()}>Next</button> :
          <button className="primary mt20" onClick={()=>handleGo()}>GO</button>}
        </Col>
      </Row>
      <StatusPopup 
        show={successPop} 
        success={false}
        message={sMsg} 
        onClose={()=>showSuccess(false)} 
      />
    </div>
  )
}

export default WizardRPSSetup;