import React, { useEffect,useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import RPSDetails from "./RPSDetails";
import FSRPSHistory from "./FSRPSHistory";
import DrRPSHistory from "./DrRPSHistory";
import {withRouter} from 'react-router-dom'
import {postToServer} from '../../lib/comm-utils'

const RPSEntry = (props) => {
  const [srNo,setSrNo] = useState()
  const [setUpId,setSetup] = useState()
  const [rpsAmountData,setAmountData] = useState([])
  const [docCode,setDocCode] = useState()
  const [sSetUp,setSelectSetUp] = useState()
  const [apprid,setApprovalId] = useState()
  const [accountDate,setAccountDate] = useState('')
  const [uploadedFiles,setUploadedFile] = useState([])
  const [fsHistoryFlag,setFsHistoryFlag] = useState('')
  const [drHistoryFlag,setDrHistory] = useState('')

  useEffect(()=>{
    let id = props.match.params.id
    let approval_id =  localStorage.getItem("approval")
    if(id == "add"){
      setApprovalId(0)
    }else if(approval_id == "0"){
      setApprovalId(0)
    }else{
      setApprovalId(1)
    }
    setSrNo(id)
    if(id != "add"){
    let data = {"Index":"RequestListSrnoClick","Data":{"srno":id},"Token":""}
    postToServer("Rps",data).then( (Result)=>{ 
      setSetup(Result.data.setupNo)
      setAmountData(Result.data.data)
      setSelectSetUp(Result.data.SetupName)
      let d = Result.data.AccountDate.split('T')[0];
      setAccountDate(new Date(d))
      setUploadedFile(Result.data.UploadedDatas)
      //props.sendAccountDate(Result.data.AccountDate)
    }).catch(  (Error)=> {  
    //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
  }
    localStorage.setItem("doctorCode","")
  },[])

  const getDoc=(doc)=>{
   // console.log("doc",doc)
    setDocCode(doc)
  }
  useEffect(()=>{
    let approval_id =  localStorage.getItem("approval")
    if(srNo == "add"){
      setApprovalId(0)
    }else if(approval_id == "0"){
      setApprovalId(0)
    }else{
      setApprovalId(1)
    }
  },[srNo])
  
  const sendFsHistoy=(a)=>{
    setFsHistoryFlag(a)
  }
  //console.log("fsHistoryFlag",fsHistoryFlag)
  const sendDrHistory=(a)=>{
    setDrHistory(a)
  }

  return (
    <div className="claim-list-tabs-container">
      <Tabs defaultActiveKey="RPSDetails" className="claim-list-tabs entry-template">
        <Tab eventKey="RPSDetails" title="RPS Details" className="hcursur">
          <RPSDetails 
            srNo={srNo} 
            setUpId={setUpId} 
            rpsAmountData={rpsAmountData}
            getDoc={getDoc}
            sSetUp={sSetUp}
            apprid={apprid}
            accountDate={accountDate}
            sendFsHistoy={sendFsHistoy}
            uploadedFiles={uploadedFiles}
            sendDrHistory={sendDrHistory}
          />
        </Tab>
        {fsHistoryFlag == "0" ?
        <Tab eventKey="FsRPSHistory" title="F.S RPS History" className="hcursur">
          <FSRPSHistory />
        </Tab>:''}
        {drHistoryFlag == '0' ?
        <Tab eventKey="DrRPSHistory" title="Dr. RPS History" className="hcursur"  disabled={docCode == undefined  ? true : false}>
          <DrRPSHistory  docCode={docCode} />
        </Tab>:''}
      </Tabs>
    </div>
  )
}

export default withRouter(RPSEntry);