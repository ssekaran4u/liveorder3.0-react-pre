import React, { useEffect,useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import RPSWizard from "./RPSWizard";
import WizardRPSSetup from "./wizardRPSSetup";
import WizardRPSDetails from "./wizardRPSDetails";
import WizardDrDetails from "./wizardDrDetails";
import WizardItemDetails from "./wizardItemDetails";
import {postToServer} from '../../lib/comm-utils'
import { setMonth } from "date-fns";

const RPSDetails = (props) => {
  const {setUpId,rpsAmountData,srNo,sSetUp,apprid,x,uploadedFiles} = props
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [setuplist , setup] = useState([])
  const [seId,setSetUpId] = useState()
  const [RMonth,setMonth] = useState()
  const [rpsdate,setRpsdate] = useState()
  const [fsCode,setFSType] = useState('')
  const [totalAmount,setTotalAmt] = useState()
  const [apprAmtStr,setApprovalAmt] = useState('')
  const [expFromD,setExpFromDate] = useState('')
  const [expToD,setExpToDate] = useState('')
  const [remarkVal,setRemarkStatus] = useState('')
  const [requiredman,setReqMan] = useState('')
  const [commitmentdman,setCoomitMan] = useState('')
  const [rpsCount,setRpsCount] = useState('')
  const [confirmAmt,setConfirmaterAmt] = useState('')
  const [printFlag,setPrintFlag] = useState('')
  const [printString,setPrintString] = useState('')
  const [uploadFlag,setUploadFlag] = useState('')
  const [docEmailFlag,setEmaildIdFlag] = useState('')
  const [prevDFlag,setPrevFlag] = useState('')
  const [docPrevAllow,setDocPrevD] = useState('')
  const [fsHisFlag,setFsHistoryFlag] = useState('')
  const [accountDate,setaccountDate] = useState('')

  const handleStepChange = (sid,sMonth,rpsdate) => { 
    setStep(step + 1);
    setProgress(progress + 33.33);
    setRpsdate(rpsdate)
    setSetUpId(sid)
    setMonth(sMonth)
    
  }

  useEffect(()=>{
    
    let data = {"Index":"RPSSetup","Token":""}
    postToServer("Rps",data).then( (Result)=>{ 
      setup(Result.data.data)
    }).catch(  (Error)=> {  
  //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
  })
  },[])
 
  let setupOptions =[]
  setupOptions.push({
    'key':'-1',
    'text':"select",
    'value':'-1'
  })
  setuplist.map((item)=>{
    setupOptions.push({ key: item.n_srno, value:item.n_srno, text: item.c_name})
  })
  const getDoc=(doc)=>{
    props.getDoc(doc)
  }
  const getFsType=(fs)=>{
    setFSType(fs)
  }
  const getTotalAmt=(amt)=>{
    setTotalAmt(amt)
  }
const sendApprovalAmt=(str)=>{
  setApprovalAmt(str)
}
const getExpFromDate=(d)=>{
  setExpFromDate(d)
}
const getExpToDate=(d)=>{
  setExpToDate(d)
}
const getRemarkVal=(status)=>{
  setRemarkStatus(status)
}
const getReqMan=(val)=>{
  setReqMan(val)
}
const getCommintmentMan=(val)=>{
  setCoomitMan(val)
}
const sendRpsCount=(count)=>{
  setRpsCount(count)
}
const sendConfirmatorAmt=(amt)=>{
  setConfirmaterAmt(amt)
}
const sendPrintOpt=(p)=>{
  setPrintFlag(p)
}
const sendPrintString=(q)=>{
  setPrintString(q)
}
const sendUploadFlag=(a)=>{
  setUploadFlag(a)
}
const getDocEmailId=(a)=>{
  setEmaildIdFlag(a)
}
const prevDateFlag=(a)=>{
  setPrevFlag(a)
}
const DocPrevDate=(a)=>{
  setDocPrevD(a)
}
const fsHistoryFlag=(a)=>{
  setFsHistoryFlag(a)
  props.sendFsHistoy(a)
}
const drHistoryFlag=(a)=>{
  props.sendDrHistory(a)
}



  return (
    <>
      <RPSWizard step={step} progress={progress} />
      <div>
        {step === 0 ? <WizardRPSSetup 
                        handleStepChange={(sid)=>handleStepChange(sid)} 
                        setupOptions={setupOptions} 
                        setUpId={setUpId}
                        sSetUp={sSetUp}
                        srNo={srNo}
                        apprid={apprid}
                       
                        /> : null}
        {step === 1 ? <WizardRPSDetails 
                        setupId={seId}  
                        srNo={srNo}
                        rpsAmountData={rpsAmountData}
                        getTotalAmt={getTotalAmt}
                        apprid={apprid}
                        sendApprovalAmt={sendApprovalAmt}
                        getExpFromDate={getExpFromDate}
                        getExpToDate={getExpToDate}
                        getRemarkVal={getRemarkVal}
                        getDocEmailId={getDocEmailId}
                        getCommintmentMan={getCommintmentMan}
                        nextConfirm = {sessionStorage.getItem("nextConfirmation") ? sessionStorage.getItem("nextConfirmation"):''}
                        curr_stat = {sessionStorage.getItem("currentStatus") ? sessionStorage.getItem("currentStatus"):''}
                        sendRpsCount={sendRpsCount}
                        sendPrintOpt={sendPrintOpt}
                        sendPrintString={sendPrintString}
                        sendUploadFlag={sendUploadFlag}
                        sendConfirmatorAmt={sendConfirmatorAmt}
                        prevDateFlag={prevDateFlag}
                        DocPrevDate={DocPrevDate}
                        confirmAmtEdit={sessionStorage.getItem("confirmAmtEdit")}
                        getReqMan={getReqMan}
                        fsHistoryFlag={fsHistoryFlag}
                        drHistoryFlag={drHistoryFlag}
                        handleStepChange={handleStepChange} 
                      /> : null}
        {step === 2 ? <WizardDrDetails 
                        RMonth={RMonth} 
                        exp_date={expFromD}
                        exp_to_date={expToD} 
                        rpsdate={rpsdate} 
                        setupId={seId} 
                        srNo={srNo}
                        getDoc={getDoc}
                        rpsCount={rpsCount}
                        requiredman={requiredman}
                        remarkVal={remarkVal}
                        getFsType={getFsType}
                        totalAmount={totalAmount}
                        commitmentdman={commitmentdman}
                        apprid={apprid}
                        prevDFlag={prevDFlag}
                        docPrevAllow={docPrevAllow}
                       
                        docEmailFlag={docEmailFlag}
                        handleStepChange={handleStepChange} 
                      /> : null}
        {step === 3 ? <WizardItemDetails 
                        setupId={seId} 
                        sMonth={RMonth} 
                        srNo={srNo}
                        fsCode={fsCode}
                        apprid={apprid}
                        apprAmtStr={apprAmtStr}
                        confirmAmtStr={confirmAmt}
                        accountDate={ "Invalid Date" }
                        printFlag={printFlag}
                        printString={printString}
                        uploadedFiles={uploadedFiles}
                        uploadFlag={uploadFlag}
                        curr_stat = {sessionStorage.getItem("currentStatus") ? sessionStorage.getItem("currentStatus"):''}
                        nextConfirm = {sessionStorage.getItem("nextConfirmation") ? sessionStorage.getItem("nextConfirmation"):''}
                        handleStepChange={handleStepChange} 
                      /> : null}
      </div>
    </>
  )
}

export default RPSDetails;