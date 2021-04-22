import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import RPSAdvanceAmtBox from '../mrComponents/RPSAdvanceAmtBox'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import RPSDetailsDateComp from '../mrComponents/RPSDetailsDateComp'
import RPSEstimatedAmt from '../mrComponents/RPSEstimatedAmt'
import ApprovedEstimatedAmt from '../mrComponents/ApprovedEstimatedAmt'
import ConfirmEstimatedAmt from '../mrComponents/ConfirmEstimatedAmt'
import DeskConfirmEstimatedAmt from '../mrComponents/DeskConfirmEstimatedAmt'
import SfaSpinner from "../../BasicComponet/sfaSpinner";

const WizardRPSDetails = (props) => {
  const { handleStepChange, rpsAmountData, srNo, setupId, apprid } = props;
  // const {setupId} = props;
  const [setUpDetailslist, setUpDetails] = useState([])
  const [date, setDate] = useState()
  const [estimateAmt, setEstAmount] = useState('')
  const [advAmt, setAdvAmount] = useState('')
  const [successPop, showSuccess] = useState(false)
  const [sMsg, showMsg] = useState(false)
  const [rpsDate, setRpasDate] = useState('')
  const [rpsJson, setValue] = useState({})
  const [sucessVal, getSuccess] = useState(false)
  const [monthVal, setMonthData] = useState('')
  const [currentDate, setCurrDate] = useState()
  const [formateddate, setFormatDate] = useState()
  const [editJson, setEditval] = useState({})
  const [apprvString, setApproveString] = useState({})
  const [approMnt, setApproveramt] = useState('')
  const [stagAmount, setStagAmt] = useState()
  const [approveFlag, setApproveFlag] = useState('')
  const [confirmFlag, setConfirmFlag] = useState('')
  const [confirmatorAmt, setConfirmatorAmt] = useState('')
  const [confirmString, setConfirmatorString] = useState({})
  const [deskConformFlag, setDeskConfirmFlag] = useState('')
  const [prevRpsDFlag, PrevRpsdate] = useState('')
  const [editRpsDFlag, editRpsDate] = useState('')
  const [printFlag, setPrintFlag] = useState('')
  const [nAmtFlag, setnAmountFlag] = useState('')
  const [requesterFlag,setRequestorFlag] = useState('')
  const [deskconfirmatorAmt, setDeskConfirmatorAmt] = useState('')
  const [deskconfirmString, setDeskConfirmatorString] = useState({})
  const [disablebtn, setdisablebtn] = useState(false)

  useEffect(() => {
    let sno = srNo == "add" ? '' : srNo
    let data = { "Index": "RPSDetail_Names", "Data": { "setupid": setupId, "srno": sno, "Nextisaprovalorconfirmation": props.nextConfirm, "currentstatus": props.curr_stat }, "Token": "" }
    postToServer("Rps", data).then((Result) => {
      if(Result.data.Status == "Success"){
      props.getRemarkVal(Result.data.setupdata[0]['n_rmks'])
      props.getDocEmailId(Result.data.setupdata[0]['n_email_id'])
      props.getReqMan(Result.data.setupdata[0]['n_req_dr'])
      props.getCommintmentMan(Result.data.setupdata[0]['n_commit_dr'])
      setApproveFlag(Result.data.data[0].appflg)
      setConfirmFlag(Result.data.data[0].conflg)
      setDeskConfirmFlag(Result.data.data[0].deskflg)
      PrevRpsdate(Result.data.PrevDateFlag[0].RpsPrevDateAllow)
      editRpsDate(Result.data.PrevDateFlag[0].PrevDateEdit)
      setPrintFlag(Result.data.setupdata[0].n_print)
      props.sendPrintOpt(Result.data.setupdata[0].n_print)
      props.sendPrintString(Result.data.setupdata[0].c_print_opt)
      props.sendUploadFlag(Result.data.setupdata[0].n_upload)
      props.prevDateFlag(Result.data.PrevDateFlag[0].PrevDateAllow)
      props.DocPrevDate(Result.data.PrevDateFlag[0].DocPrevDateAllow)
      props.fsHistoryFlag(Result.data.setupdata[0].n_Fs_invhistory)
      props.drHistoryFlag(Result.data.setupdata[0].n_dr_invhistory)
      setnAmountFlag(Result.data.setupdata[0].n_AmntValidate)
      setRequestorFlag(Result.data.data[0].requestor)
      }
      setUpDetails(Result.data.data)
      setStagAmt(Result.data.stageamt)
      //  localStorage.setItem("noOfRps",Result.data.data.length)
      setMonthData(Result.data.setupdata[0]['n_months'])

      let expdate = Result.data.setupdata[0]['BusinessExpectedFrom'].split('T')[0]; 
     // let tdate= expdate.split('-')
      let r_d = expdate.split('-')[1] + '/' + expdate.split('-')[2] + '/' + expdate.split('-')[0];
      props.getExpFromDate(new Date(r_d))

      let expTodate = Result.data.setupdata[0]['BusinessExpectedTo'].split('T')[0];
      let exp_to_d = expTodate.split('-')[1] + '/' + expTodate.split('-')[2] + '/' + expTodate.split('-')[0]
      props.getExpToDate(new Date(exp_to_d))

      localStorage.setItem("roi_det", Result.data.setupdata[0]['n_roi_det'])
      
      localStorage.setItem("mcl_Mandatry", Result.data.setupdata[0]['n_mcl_mand'])
      let tdate = new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate()
      let tmonth = new Date().getMonth() > 10 ? pareseInt(new Date().getMonth()) + 1 : '0' + parseInt(new Date().getMonth() + 1)
      let currdate = tmonth + '/' + tdate + '/' + new Date().getFullYear()
      setCurrDate(currdate)
      localStorage.setItem("drphone_Mandatry", Result.data.setupdata[0]['n_drph'])
      localStorage.setItem("roi_value", Result.data.setupdata[0]['n_roi_value'])
      // localStorage.setItem("roi_value","1")
      
      //localStorage.setItem("roi_det","2")
     
      // props.getRemarkVal(Result.data.setupdata[0]['n_rmks'])
      // props.getDocEmailId(Result.data.setupdata[0]['n_email_id'])
      // props.getReqMan(Result.data.setupdata[0]['n_req_dr'])
      // props.getCommintmentMan(Result.data.setupdata[0]['n_commit_dr'])
      // setApproveFlag(Result.data.data[0].appflg)
      // setConfirmFlag(Result.data.data[0].conflg)
      // setDeskConfirmFlag(Result.data.data[0].deskflg)
      // PrevRpsdate(Result.data.PrevDateFlag[0].RpsPrevDateAllow)
      // editRpsDate(Result.data.PrevDateFlag[0].PrevDateEdit)
      // setPrintFlag(Result.data.setupdata[0].n_print)
      // props.sendPrintOpt(Result.data.setupdata[0].n_print)
      // props.sendPrintString(Result.data.setupdata[0].c_print_opt)
      // props.sendUploadFlag(Result.data.setupdata[0].n_upload)
      // props.prevDateFlag(Result.data.PrevDateFlag[0].PrevDateAllow)
      // props.DocPrevDate(Result.data.PrevDateFlag[0].DocPrevDateAllow)
      // props.fsHistoryFlag(Result.data.setupdata[0].n_Fs_invhistory)
      // props.drHistoryFlag(Result.data.setupdata[0].n_dr_invhistory)
      // setnAmountFlag(Result.data.setupdata[0].n_AmntValidate)
      // setRequestorFlag(Result.data.data[0].requestor)
      // }
    }).catch((Error) => {
      //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })

  }, [setupId])
  const getAmount = () => {
    const eAmount = event.target.value
    getEstimatedAmount(eAmount)
  }

  const handleSubmit = () => {
    let string = ''
    if (srNo == "add" && estimateAmt == "") {
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Required Field")
    } else if (srNo == "add" && advAmt == "") {
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Required Field")
    } 
    // else if (srNo == "add" && rpsDate == "") {
    //   showSuccess(true)
    //   getSuccess(false)
    //   showMsg("Please Enter Required Field")
    // }
     else {
      setdisablebtn(true)
      let totalAmt = 0
      // console.log("rpsJson",rpsJson)
      var count = Object.keys(rpsJson).length; 
      props.sendRpsCount(count)
      Object.keys(rpsJson).map((item) => {
        string = string + rpsJson[item]['code'] + '~' + rpsJson[item]['estamt'] + "~" + rpsJson[item]['advamt'] + "~" + rpsDate + "|"
        totalAmt = parseInt(totalAmt) + parseInt(rpsJson[item]['estamt'])
        // console.log("tAmt",string)

      })
      props.getTotalAmt(totalAmt)
      // console.log("string",string)
      let str = string.substring(0, string.length - 1);
      let p_srno = srNo == "add" ? '' : srNo
      let tAmt = 0
      if (rpsAmountData.length > 0) {
        rpsAmountData.map((item) => {
          tAmt = parseInt(tAmt) + parseInt(item.n_amount == "" ? 0 : item.n_amount) + parseInt(item.n_AdvanceAmount == "" ? 0 : item.n_AdvanceAmount)

        })
      }

      // console.log("string",str)
      let data = {
        "Index": "RPSDetailSave",
        "Data": { "setupid": setupId, "srno": p_srno, "rpssetupdetails": str }, "Token": ""
      }
      postToServer("Rps", data).then((Result) => {
       if(Result.data.Status == "Pending"){
         setdisablebtn(true)
       }
        if (Result.data.Status == "Success") {

          handleStepChange(setupId, monthVal, new Date(formateddate))
          localStorage.setItem("currentDate", currentDate)
          if (srNo == "") {
            localStorage.setItem("totalAmt", totalAmt)
            // localStorage.setItem("rps_srno",Result.data.data[0].srno)
          } else {
           
            localStorage.setItem("totalAmt", tAmt)

          }
          localStorage.setItem("rps_srno", Result.data.data[0].srno)
          localStorage.setItem("requestDate", formateddate)
          if (Result.data.setupdata.length > 0) {
            saveDetails(Result.data.setupdata)
          }
        }
      }).catch((Error) => {
        //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
      })
    }
  }
  //}
  const getEstAmount = (val, amt, icode) => {
    if (srNo != "add") {
      let m = {}
      m = rpsJson
      m[icode]['estamt'] = amt
      setEstAmount(amt)
      setValue(m)
    } else {
      let m = {}
      m = rpsJson
      m[icode] = { "code": icode, "estamt": amt, "advamt": val }
      setEstAmount(amt)
      setValue(m)
    }


  }

  const getAdvAmount = (val, amt, icode) => {
    let m = {}
    m = rpsJson
    m[icode]['advamt'] = amt
    setAdvAmount(amt)
    setValue(m)
  }

  const getRpsdate = (dval) => {
    let rdate = dval.getDate() < 10 ? '0' + dval.getDate() : dval.getDate()
    let rMonth = parseInt(dval.getMonth() + 1) < 10 ? '0' + parseInt(dval.getMonth() + 1) : parseInt(dval.getMonth()) + 1
    let rps_date = rdate + "/" + rMonth + "/" + dval.getFullYear()
    let rDate = rMonth + '/' + rdate + '/' + dval.getFullYear()
    let m = {}

    setRpasDate(rps_date)
    setFormatDate(rDate)
    // setValue(m)

  }

  useEffect(() => {
    if (srNo != "add") {
      rpsAmountData.map((item) => {
        let m = {}
        m = rpsJson
        m[item.c_invcode] = { "code": item.c_invcode, "estamt": item.n_amount, "advamt": item.n_AdvanceAmount }
        setValue(m)
      })
    }

  }, [rpsAmountData])

  const handleNext = () => {
    // if (approveFlag == "1") {
    //   if(props.curr_stat == "R" || props.curr_stat == "" || props.curr_stat == "S"){
    //     handleStepChange(setupId, monthVal, new Date(formateddate))
    //   }else{
    //   if (approMnt == "") {
    //     showSuccess(true)
    //     getSuccess(false)
    //     showMsg("Please Enter Approved Amount")
    //   } else {
    //     handleStepChange(setupId, monthVal, new Date(formateddate))
    //   }
    // }
    // } else if (confirmFlag == "1") {
    //   if(props.curr_stat == "R"){
    //     handleStepChange(setupId, monthVal, new Date(formateddate))
    //   }else{
    //   if (confirmatorAmt == "") {
    //     showSuccess(true)
    //     getSuccess(false)
    //     showMsg("Please Enter Confirmed Amount")
    //   } else {
    //     handleStepChange(setupId, monthVal, new Date(formateddate))
    //   }
    // }

    // } else {
    //   handleStepChange(setupId, monthVal, new Date(formateddate))
    // }
  //   if(requesterFlag == "no"){
  //     if(approveFlag == '1' || confirmFlag == '1' || deskConformFlag == "1"){
  //       if(props.curr_stat != "R" || props.curr_stat != ""){
  //       if (approMnt == "") {
  //             showSuccess(true)
  //             getSuccess(false)
  //             showMsg("Please Enter Approved Amount")
  //             return
  //       }else{
  //         handleStepChange(setupId, monthVal, new Date(formateddate))
  //       }
  //     }else{
  //       handleStepChange(setupId, monthVal, new Date(formateddate))
  //     }
  //   }else{
  //     handleStepChange(setupId, monthVal, new Date(formateddate))
  //   }
  // }else{
  //   handleStepChange(setupId, monthVal, new Date(formateddate))
  // }
  //   if(requesterFlag == "no"){
  //     if(confirmFlag == '1' || deskConformFlag == "1"){
  //       if(props.curr_stat != "R"){
  //         if (confirmatorAmt == "") {
  //         showSuccess(true)
  //       getSuccess(false)
  //       showMsg("Please Enter Confirmed Amount")
  //       return
  //         }else{
  //           handleStepChange(setupId, monthVal, new Date(formateddate))
  //         }
  //       }else{
  //         handleStepChange(setupId, monthVal, new Date(formateddate))
  //       }
  //     }else{
  //       handleStepChange(setupId, monthVal, new Date(formateddate))
  //     }
  //   }else{
  //     handleStepChange(setupId, monthVal, new Date(formateddate))
  //   }
  //   if(requesterFlag == "no"){
  //     if(deskConformFlag == "1"){
  //       if(props.curr_stat != "R"){
  //         if (deskconfirmatorAmt == "") {
  //         showSuccess(true)
  //       getSuccess(false)
  //       showMsg("Please Enter Desk Confirmed Amount")
  //       return
  //         }else{
  //           handleStepChange(setupId, monthVal, new Date(formateddate))
  //         }
  //       }else{
  //         handleStepChange(setupId, monthVal, new Date(formateddate))
  //       }
  //     }else{
  //       handleStepChange(setupId, monthVal, new Date(formateddate))
  //     }
  //   }else{
  //     handleStepChange(setupId, monthVal, new Date(formateddate))
  //   }
  handleStepChange(setupId, monthVal, new Date(formateddate))
  }
  

  const getApprEstAmount = (advAmount, amount, itemCode) => {
    let m = {}
    m = apprvString
    m[itemCode] = amount
    setApproveramt(amount)
    setApproveString(m)
    //console.log("gg",m)
    let string = ''
    Object.keys(m).map((item) => {
      string = string + item + '~' + m[item] + '|'
    })
    let str = string.substring(0, string.length - 1)
    // console.log("string",str)
    props.sendApprovalAmt(str)
  }
  const getConfirmEstAmount = (advAmount, amount, itemCode) => {
    let m = {}
    m = confirmString
    m[itemCode] = amount
    setConfirmatorAmt(amount)
    setConfirmatorString(m)
    //console.log("gg",m)
    let string = ''
    Object.keys(m).map((item) => {
      string = string + item + '~' + m[item] + '|'
    })
    let str = string.substring(0, string.length - 1)
    //console.log("string",str)
    props.sendConfirmatorAmt(str)
  }
  const getDeskConfirmEstAmount = (advAmount, amount, itemCode)=>{
    let m = {}
    m = deskconfirmString
    m[itemCode] = amount
    setDeskConfirmatorAmt(amount)
    setDeskConfirmatorString(m)
    //console.log("gg",m)
    let string = ''
    Object.keys(m).map((item) => {
      string = string + item + '~' + m[item] + '|'
    })
    let str = string.substring(0, string.length - 1)
    //console.log("string",str)
    props.sendConfirmatorAmt(str)
  }
   
  return (
    <div className="rps-tab-sec1">
      <h4 className="rps-tab-sec-title">RPS Details</h4>
      {setUpDetailslist.map((item) =>
        <Row >
          <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            <Form.Label className="customized-label">RPS Name
            {/* <span className="colorRed">*</span> */}
            </Form.Label>
            <Form.Control
              type="text"
              className="customized-input"
              placeholder="RPS Name"
              value={item.c_name}
            />
          </Col>
          <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            <Form.Label className="customized-label">Estimated RPS Amount
            {/* <span className="colorRed">*</span> */}
            </Form.Label>
            {/* <Form.Control type="text" className="customized-input" value={estimatedAMount} onChange={()=>getAmount()} placeholder="Enter amount here" /> */}
            <RPSEstimatedAmt
              rpsAmountData={rpsAmountData}
              itemCode={item.c_code}
              getEstAmount={(estVal, amt, icode) => getEstAmount(estVal, amt, icode)}
              srNo={srNo}
              advAmount={advAmt}
              editJson={rpsJson[item.c_code]}
              apprid={apprid}
              stagAmount={stagAmount}
              nAmtFlag={nAmtFlag}
            />
          </Col>
          <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            <Form.Label className="customized-label">Advance Required
             {/* <span className="colorRed">*</span> */}
            </Form.Label>
            <RPSAdvanceAmtBox
              rpsAmountData={rpsAmountData}
              itemCode={item.c_code}
              getAdvAmount={(advval, amt, icode) => getAdvAmount(advval, amt, icode)}
              estimateAmt={estimateAmt}
              editJson={rpsJson[item.c_code]}
              rpsJson={rpsJson}
              srNo={srNo}
              apprid={apprid}
            />
          </Col>
          {requesterFlag == "no" ? 
         
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
               {approveFlag == '1' || confirmFlag == '1' || deskConformFlag == "1" ?
              <div>
              {props.curr_stat == "R" || props.curr_stat == "" ? '' :
                <div>
                  <Form.Label className="customized-label">Approved Estimated Amount
            {/* <span className="colorRed">*</span> */}
                  </Form.Label>
                  <ApprovedEstimatedAmt
                    rpsAmountData={rpsAmountData}
                    itemCode={item.c_code}
                    getApprEstAmount={(advval, amt, icode) => getApprEstAmount(advval, amt, icode)}
                    estimateAmt={estimateAmt}
                    editJson={rpsJson[item.c_code]}
                    srNo={srNo}
                    apprid={apprid}
                    confirmAmtEdit={props.confirmAmtEdit}
                    nextConfirm={props.nextConfirm}
                    status={props.curr_stat}
                  />
                </div>}
                </div>
                : ''}
            </Col> :''}
        
          
          {requesterFlag == "no" ? 
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            {confirmFlag == '1' || deskConformFlag == "1" ?
              <div>
              {props.curr_stat == "R" ? '' :
                <div>
                  <Form.Label className="customized-label">Confirm Estimated Amount </Form.Label>
                  <ConfirmEstimatedAmt
                    rpsAmountData={rpsAmountData}
                    itemCode={item.c_code}
                    getConfirmEstAmount={(advval, amt, icode) => getConfirmEstAmount(advval, amt, icode)}
                    estimateAmt={estimateAmt}
                    editJson={rpsJson[item.c_code]}
                    srNo={srNo}
                    apprid={apprid}
                    AmtEditable={props.AmtEditable}
                    nextConfirm={props.nextConfirm}
                    status={props.curr_stat}
                  />
                </div>}
                </div> : ''}
            </Col>:''}
            
         
            {requesterFlag == "no" ? 
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            {deskConformFlag == "1" ?
              <div>
              {props.curr_stat == "R" ? '' :
                <div>
                  <Form.Label className="customized-label">Desk Confirmation Amount </Form.Label>
                  <DeskConfirmEstimatedAmt
                    rpsAmountData={rpsAmountData}
                    itemCode={item.c_code}
                    getDeskConfirmEstAmount={(advval, amt, icode) => getDeskConfirmEstAmount(advval, amt, icode)}
                    estimateAmt={estimateAmt}
                    editJson={rpsJson[item.c_code]}
                    srNo={srNo}
                    apprid={apprid}
                    AmtEditable={props.AmtEditable}
                    nextConfirm={props.nextConfirm}
                    status={props.curr_stat}
                    requesterFlag={requesterFlag}
                  />
                </div>}
                </div> : ''}
            </Col>:''}
          {/* <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
            <Form.Label className="customized-label">RPS Date <span className="colorRed">*</span></Form.Label>
            <RPSDetailsDateComp 
              itemCode={item.c_code} 
              getRpsdate={(pdate,icode)=>getRpsdate(pdate,icode)} 
            />
          </Col> */}
        </Row>
      )}
      <Row>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">RPS Date <span className="colorRed">*</span></Form.Label>
          <RPSDetailsDateComp
            // itemCode={item.c_code} 
            rpsAmountData={rpsAmountData}
            getRpsdate={(pdate) => getRpsdate(pdate)}
            srNo={srNo}
            prevRpsDFlag={prevRpsDFlag}
            editRpsDFlag={editRpsDFlag}
          />
        </Col>
      </Row>


      {disablebtn == true ? <SfaSpinner/> : <div className="mt-4 rps-notesec">
      {srNo != "add" && apprid == "1" ?
        <button className="primary" onClick={() => handleNext()}>Next</button> :
        <button className="primary" onClick={() => handleSubmit()}>Submit</button>
      }
      <span className="rps-note"><span className="note-red">Note:</span> RPS Advance Amount Should <b>Be 0 or Equal To Estimated RPS Amount.</b></span>
      </div>}

      <StatusPopup
        show={successPop}
        success={false}
        message={sMsg}
        onClose={() => showSuccess(false)}
      />
    </div>
  )
}

export default WizardRPSDetails