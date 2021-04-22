import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from '../../BasicComponet/DropDown'
import {postToServer} from '../../lib/comm-utils'
import {InputGroup} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import StatusPopup from '../../lib/StatusPopup'
import DoctorProfile from '../popup/DoctorProfile'
import {withRouter} from 'react-router-dom'
import DoctorHistoryModal from '../popup/DoctorHistoryModal'
import Collapsible from 'react-collapsible';
import {Table} from 'react-bootstrap'

const WizardDrDetails = (props) => {
  const { handleStepChange,RMonth ,setupId,rpsdate,exp_date,exp_to_date,srNo,totalAmount,apprid,remarkVal,requiredman,commitmentdman,rpsCount,docEmailFlag,prevDFlag} = props;
  const [fslist,fetchFsList] = useState([])
  const [selectedFs,SetUpFSType] = useState('')
  const [selectedDoc,setDoctor] = useState('')
  const [doctorList,setDoctorList] = useState([])
  const [rpsDate,setRpsDate] = useState()
  const [filterDocValue,setFilterDocValues] = useState()
  const [fullDocList,doctorFullList] = useState([])
  const [docMclNo,setSelectedMclNo] = useState()
  const [docEmail,setSelectedEmail] = useState()
  const [docGrade,setSelectedGrade] = useState()
  const [docCategory,setSelectedCategory] = useState()
  const [docPlace,setSelecedPlace] = useState()
  const [docNumber,setSelectedNumber] = useState('')
  const [commitmentDoc,setCommitmentDoc] =  useState('')
  const [reuirmentDoc,setRequirmentDoc] = useState('')
  const [remark,setRemark] = useState('')
  const [formatexpBussToDate,setExpBusinessToDate] = useState('')
  const [expBussToDate,setExBussToDate] = useState()
  const [formatexpBussFromDate,setExpBusinessFromDate] = useState('')
  const [expBussFromDate,setExBussFromDate] = useState()
  const [successPop,showSuccess] = useState(false)
  const [sMsg,showMsg] =  useState(false)
  const [sucessVal,getSuccess] = useState(false)
  const [modalShow,setModalShow] = useState()
  const [sucessres,showResultModal] = useState(false)
  const [resultMsg,showResultMsg] = useState()
  const [updateProfile,setUpdateProfile] = useState()
  const [editList,editDrList] = useState([])
  const [docName,setDocName] = useState()
  const [rpsAmount,setRpsAmt] = useState()
  const [selectedDocName,setSelectedDocName] =  useState('')
  const [docHistoryModal,showHistoryModal] = useState(false)
  const [docHistoryData,setHistoryData] = useState([])
  const [currDate,setCurrDate] = useState(new Date())
  const [reqDate,setRequestDate] = useState('')
  const [rpsno,getRpsNo] = useState(new Date())
  const [rcpalist,setRcpaDocDetails] = useState([])
  const [rcpalistDet,setRcpaDocDet] = useState([])
  const [displaytable, setdisplaytable] = useState(false)
  useEffect(()=>{
    let fsList =[]
    let data = {"Index":"GetFS","Token":""}
    postToServer("Rps",data).then( (Result)=>{ 
      Result.data.data.map((item)=>{ 
        fsList.push(
          {
            'key':item.c_code.trim(),
            'text':item.c_name,
            'value':item.c_code.trim()
          },
          )
      })
      fetchFsList(fsList)
      {localStorage.getItem("type") == "1" ? 
      getDocByFs(''):null}
    }).catch(  (Error)=> {  
  
    })
    let p_srno = srNo == "add" ? '':srNo
    if(srNo != "add"){
      let d = {"Index":"EnterDoctorDetailsAgainstRPSEntryDetailsEdit","Data":{"srno":p_srno},"Token":""}
        postToServer("Rps",d).then( (Result)=>{ 
          editDrList(Result.data.data)
          setSelectedGrade(Result.data.data[0].Grade)
          setDoctor(Result.data.data[0].doccode)
          setSelectedCategory(Result.data.data[0].category)
          setSelectedMclNo(Result.data.data[0].c_mclno)
          setSelecedPlace(Result.data.data[0].subarea)
          setSelectedNumber(Result.data.data[0].c_mobile_no)
          setSelectedEmail(Result.data.data[0].c_dr_email_id)
          setRemark(Result.data.data[0].c_Remarks)
          setCommitmentDoc(Result.data.data[0].c_commitment)
          setRequirmentDoc(Result.data.data[0].c_requirement)
          setDocName(Result.data.data[0].doctor)
          setRpsAmt(Result.data.data[0].n_RPS_AMount)
          SetUpFSType(Result.data.data[0].c_childfs_code)
          props.getDoc(Result.data.data[0].doccode)
          getDocByFs(Result.data.data[0].c_childfs_code)
          props.getFsType(Result.data.data[0].c_childfs_code)
          getRcpaData(Result.data.data[0].doccode)
          getRpsNo(Result.data.data[0].RpsNo)
           let d = Result.data.data[0].d_date
           let rdate= (Result.data.data[0].d_date).split('/')
           let p = d.replace(/['"]+/g, '')
          // let t = "'"+p+"'"
           //console.log("p",rdate[0])
          let f = rdate[1]+'/'+rdate[0]+'/'+rdate[2]
          var quotedVar = "'" + f + "'";
        //  console.log(quotedVar);
          if (Date(quotedVar)=="Invalid Date"){
            setCurrDate(new Date())
          }else{
          setCurrDate(new Date(f))
          }
         //setRequestDate(new Date('21/10/2020'))
        // setRequestDate(new Date('10/12/2020'))
        }).catch(  (Error)=> {  
      })
    }else{
      getRcpaData(selectedDoc)
    }
  },[])
  //console.log("sweta",totalAmount)
  
  const getDocByFs=(fsChild)=>{
    let docList = [  
      {
      'key':'-1',
      'text':'Please Select',
      'value':'-1'
      },
    ]
    
    let data =  {"Index":"getDoctor","Data":{"childfscode":fsChild},"Token":""}
    postToServer("Rps",data).then( (Result)=>{ 
     
      Result.data.data.map((item)=>{ 
        docList.push(
          {
            'key':item.DocCode.trim(),
            'text':item.DocName,
            'value':item.DocCode.trim()
          },
          )
      })
      setDoctorList(docList)
      doctorFullList(Result.data.data)
    }).catch(  (Error)=> {  
  //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
    
  }
  const getRcpaData=(docode)=>{
    // var rcpa = {"Index":"RCPADetails","Data":{"DocCode":docode.toString()},"Token":""}
    var rcpa =  {"Index":"RCPABrandDetails","Data":{"DocCode":docode.toString()},"Token":""}
    postToServer("Rps",rcpa).then( (Result)=>{ 
     let docList =[]
     let tPrescribed = 0
     let tval = 0
      Result.data.data.map((item)=>{ 
        docList.push(
          {
            'key':item.ouritemcode.trim(),
            'text':item.ouritemname,
            'value':item.ouritemcode.trim(),
            'kk':item.OurRx,
            'tval':item.OurVal
          },
          )
          // var data =   {"Index":"RCPAProductDetails","Data":{"ExistBrandCode":item.ouritemcode,"DocCode":docode.toString()},"Token":""}
          // postToServer("Rps",data).then( (Result)=>{ 
          //   setRcpaDocDet(Result.data.data)
          //   Result.data.data.map((item)=>{
          //     tPrescribed = parseFloat(tPrescribed) + parseFloat(item.CltRx)
          //     tval = parseFloat(tval) + parseFloat(item.CltVal)
          //   })
            
          // }).catch(  (Error)=> {  
          //  })
      })
      setRcpaDocDetails(docList)
    }).catch(  (Error)=> {  
  //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
   
  }

  const selectFsType = (value)=>{
    SetUpFSType(value)
    if(localStorage.getItem("type") == "2" || localStorage.getItem("type") == "3"){
      getDocByFs(value)
    }
    props.getFsType(value)
  }
  const selectDoctor=(value)=>{ 
    localStorage.setItem("doctorCode",value)
    props.getDoc(value)
    setDoctor(value)
    if(value){
      validateDocProfile(value)
      getRcpaData(value)
    }

  }
  const dateChanged =(date)=>{
    //setRpsDate(date)
    if(props.docPrevAllow == "0"){
      let dd = date.getDate() > 9 ? date.getDate() : '0'+date.getDate()
      let mm = parseInt(date.getMonth()+1) > 9 ? parseInt(date.getMonth()+1) : '0'+parseInt(date.getMonth()+1)
      let d = dd+'/'+mm+'/'+date.getFullYear()
      let c = new Date()
      let pp = c.getDate() > 9 ? c.getDate() : '0'+c.getDate()
      let tmm = parseInt(c.getMonth()+1) > 9 ? parseInt(c.getMonth()+1) : '0'+parseInt(c.getMonth()+1)
      let p = pp+'/'+tmm+'/'+c.getFullYear()
     // console.log("date",p,d)
      if(d < p){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Select Future Date")
      return
      }else{
        setCurrDate(date)
      }
    }else{
      setCurrDate(date)
    }
   
  }
  useEffect(()=>{
    let filterDoc =[]
      {fullDocList.filter(x => x.DocCode.trim() == selectedDoc).map((a)=>filterDoc.push(a))}
      setFilterDocValues(filterDoc)
      filterDoc.map((pp)=>{
          setSelectedMclNo(pp.mclno)
          setSelectedEmail(pp.c_email_id)
          setSelectedGrade(pp.Grade)
          setSelectedCategory(pp.Category)
          setSelecedPlace(pp.place)
          setSelectedNumber(pp.c_phone)
      })
     
  },[selectedDoc])
 // console.log("doctorList",filterDocValue)
  
  const CommitmentDoctor=()=>{
      const comDoc = event.target.value
      setCommitmentDoc(comDoc)
  }

  const ReqFromDoctor =()=>{
    const reqDoc = event.target.value
    setRequirmentDoc(reqDoc)
  }

  const handleRemark =()=>{
    const remark = event.target.value
    setRemark(remark)
  }

  const expBusinessToDate=(d)=>{
   // console.log("date",d)
     let pdate =  d.getDate() > 10 ? d.getDate() : '0'+d.getDate();
     let sMon =parseInt(d.getMonth())+1;
     let pMonth =  sMon > 10 ? sMon : '0'+sMon
     let selecteddate = pMonth+'/'+pdate+"/"+d.getFullYear();
     setExBussToDate(d)
     setExpBusinessToDate(selecteddate)
  }

  const validateDocProfile=(docCode)=>{
    let data = {"Index":"docProfileValidation","Data":{"DocCode":docCode,"Month":RMonth},"Token":""}
    postToServer("Rps",data).then( (Result)=>{ 
      if(Result.data.Status == "Success"){
        if(Result.data.data[0].result == "Please update Doctor Profile..."){
          setUpdateProfile("update")
        }else{
          setUpdateProfile("")
        }
        
      }
 
      
    }).catch(  (Error)=> {  
  //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
  })
  }
 

  const saveDrDetails=()=>{
    // if(selectedFs == ""){
    //   showSuccess(true)
    //   getSuccess(false)
    //   showMsg("Please Select F")
    //   return
    // }
    if(selectedDoc == ""){  
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Select Doctor")
      return
    }
    if(docGrade == ""){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter  Doctor Grade")
      return
    }
    if(docMclNo == ""){
      if(localStorage.getItem("mcl_Mandatry") == "0"){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter MCI No.")
      return
      }
    }
    if(docEmail == ""){
      if(docEmailFlag == "0"){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Email")
      return
      }
    }
    if(exp_date == ""){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Expected Business From date")
      return
    }
    if(exp_to_date == ""){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Expected Business To date")
      return
    }
    if(commitmentDoc == ""){
      if(commitmentdman == "0"){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Commitment from Doctor")
      return
      }
    }
    if(reuirmentDoc == ""){
      if(requiredman == "0"){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Requirement from Doctor")
      return
      }
    }
    if(remark == ""){
      if(remarkVal == "0"){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Remarks ")
      return
      }
    }
    if(updateProfile == "update"){
      //if(localStorage.getItem("rmk_Mandatry") == "0"){
      if(remarkVal == "0"){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Update Doc Profile")
      return
      }
    }
    SaveDrAgainstRps()
  }
 

  const SaveDrAgainstRps=()=>{
   // console.log("exp_date",currDate)
    let dd = currDate.getDate() > 9 ? currDate.getDate() : '0'+currDate.getDate()
    let mm = parseInt(currDate.getMonth()+1) > 9 ? parseInt(currDate.getMonth()+1) : '0'+parseInt(currDate.getMonth()+1)
    let dp = dd+'/'+mm+'/'+currDate.getFullYear()
    let fdate = exp_date.getDate() > 9 ? exp_date.getDate() : '0'+exp_date.getDate();
    let fMon = parseInt(exp_date.getMonth()+1) > 9 ?  parseInt(exp_date.getMonth()+1) : '0'+ parseInt(exp_date.getMonth()+1);
    let fyear = exp_date.getFullYear()
    let tdate = exp_to_date.getDate()> 9 ? exp_to_date.getDate() : '0'+exp_to_date.getDate();
    let tMon = parseInt(exp_to_date.getMonth()+1) > 9 ? parseInt(exp_to_date.getMonth()+1) : '0'+parseInt(exp_to_date.getMonth()+1);
    let tyear = exp_to_date.getFullYear()
    //let c = exp_to_date.split('/')
    let m =  localStorage.getItem("requestDate").split('/')
    let busFr = fdate+'/'+ fMon+'/'+fyear
    let busto = tdate+'/'+tMon+'/'+tyear
    let reDate = m[1]+'/'+m[0]+'/'+m[2]
    let id = props.match.params.id
    let p_srno = srNo == "add" ? localStorage.getItem('rps_srno') :srNo 
    let amt = totalAmount ? totalAmount.toString():'0'
    let data = {"Index":"EnterDoctorDetailsAgainstRPSEntryDetailsSaving", 
        "Data":{
        // "srno" : "1120,1119",
        "srno":p_srno,
        "doctor" : selectedDoc,
        "mob" :docNumber,
        "email" : docEmail,
        "mclNO":docMclNo,
        "busfr" : busFr,
        "busto" :busto,
        "RPSamt" : amt,
        "commit" : commitmentDoc,
        "requirement" : reuirmentDoc,
        "remarks":remark,
        "clossingdate" :"",
        "setupno" : setupId,
        "childfscode" : selectedFs,
        "reqdate" : dp,
      }
        }
        postToServer("Rps",data).then( (Result)=>{ 
          if(Result.data.Status == "Success"){
            //handleStepChange()
            // showSuccess(true)
            // getSuccess(true)
            // showMsg("Saved SuccessFully")
             handleStepChange(setupId,RMonth)
             
          }
      //    saveDetails(Result.data.setupdata)
          
        }).catch(  (Error)=> {  
      //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
      })
  }
  const changeNumber=()=>{
    const re = /^[0-9\b]+$/;
    if(localStorage.getItem("drphone_Mandatry") ==  "0"){
      const phno =  event.target.value
      if(phno === '' || re.test(phno)){
        if(phno.length > 10){
          showSuccess(true)
          getSuccess(false)
          showMsg("Please Enter 10 digit Number only")
          return
        }else{
          setSelectedNumber(phno)
        }
      
      }else{
        showSuccess(true)
        getSuccess(false)
        showMsg("Please Enter Number only")
        return
      }
    }else{
      showSuccess(true)
      getSuccess(false)
      showMsg("You Can't change Number")
    }
  }

  const changeEmail=()=>{
   // const emailVal = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
   // if(docEmailFlag ==  "0"){
      const email =  event.target.value
     // if(emailVal.test(email) == true){
        setSelectedEmail(email)
      // }else{
      //   showSuccess(true)
      // getSuccess(false)
      // showMsg("Enter Correvt Format Email")
      // }
     
    // }else{
    //   showSuccess(true)
    //   getSuccess(false)
    //   showMsg("You Can't change Email")
    // }
  }
  const handleMcl=()=>{
    const re = /^[0-9\b]+$/;
    const mcl = event.target.value
    if(mcl === '' || re.test(mcl)){
      setSelectedMclNo(mcl)
    }else{
     // setSelectedMclNo('')
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Enter Number only")
      return
    }
  }
  const editProfile=()=>{
    if(selectedDoc == ""){
      showSuccess(true)
      getSuccess(false)
      showMsg("'Please Select Doctor")
      return
    }else{
      let filterDoc=[]
      if(fullDocList.length > 0){
      {fullDocList.filter(x => x.DocCode.trim() == selectedDoc).map((a)=>filterDoc.push(a))}
      //console.log("sweta",filterDoc)
      let docname
      filterDoc.map((item)=>{
        docname = item.DocName
      })
      setSelectedDocName(docname)
      }
      setModalShow(true)
      setSelectedNumber(docNumber)
    }
    
  }
  const profileUpdate=(docCode,doc_phone)=>{
    let data = {"Index":"DocProfileUpdate","Data":{"DocCode":docCode,"Mobile":doc_phone},"Token":""}
    postToServer("Rps",data).then( (Result)=>{ 
        if(Result.data.Status == "Success"){
          setModalShow(false)
          showResultModal(true)
          // getSuccess(true)
          showResultMsg("Saved SuccessFully")
          setUpdateProfile("")
         }
        saveDetails(Result.data.setupdata)
        
      }).catch(  (Error)=> {  
    //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
  }
  const handleNext=()=>{
    handleStepChange(setupId,RMonth)
  }
  const validationEmail=()=>{
    const emailVal = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    //console.log("validation",emailVal.test(docEmail))
    if(emailVal.test(docEmail) == false){
      showSuccess(true)
      getSuccess(false)
      showMsg("Enter valid Email")
    }
  }
  const docVisitHistory=()=>{
    if(selectedDoc == ""){
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Select Doctor")
    }else{
      showHistoryModal(true)
      let data = {"Index":"DoctorVisitHistory","Data":{"doccode":selectedDoc},"Token":""}
      postToServer("Rps",data).then( (Result)=>{ 
         setHistoryData(Result.data.data)
       
      }).catch(  (Error)=> {  
        //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
   

  }
  const closeModal=()=>{
    showHistoryModal(false)
  }
  const openNav=()=>{
    if(selectedDoc != ""){
      document.getElementById("mySidenav").style.width = "300px";
    }else{
      showSuccess(true)
      getSuccess(false)
      showMsg("Please Select Doctor")
    }
   
  }
  const closeNav=()=>{
    document.getElementById("mySidenav").style.width = "0";
  }
  const loadDetails=(index,item,event) =>{
    var data =   {"Index":"RCPAProductDetails","Data":{"ExistBrandCode":index.key,"DocCode":selectedDoc.toString()},"Token":""}
          postToServer("Rps",data).then( (Result)=>{
            setRcpaDocDet(Result.data.data)
            Result.data.data.map((index)=>{
              // setdisplaytable(false)
              // tPrescribed = parseFloat(tPrescribed) + parseFloat(item.CltRx)
              // tval = parseFloat(tval) + parseFloat(item.CltVal)
            })
            if(item >= "0" ){
              setdisplaytable(true)
            }
          }).catch(  (Error)=> {  
           })
  }
  const closeddiv=() => {
    setdisplaytable(false)
  }
  return (
    <React.Fragment>
    {/* <div className="rcpasideBar">
    <div className="rightRcpabar">
      <div className="relative"></div>
    </div>
    </div> */}
    <div id="mySidenav" className="Rsidenav">
  <a href="javascript:void(0)" class="closebtn" onClick={()=>closeNav()}>&times;</a>
  {rcpalist.length > 0 ? rcpalist.map((list,index)=>(
  <div className="pad9_20 borderDash" disabled={displaytable}>
  <Collapsible onOpen={  (event)=>(loadDetails(list,index,event) ) } onClose={() =>closeddiv()} 
  trigger={
     <div className="product-sec">
     
         <div>
          <div className="product-img">
            <img src="../public/assets/images/medicine-img.svg" />
          </div>
          <div className="product-details">
            <div className="productName"> {list.text}</div>
            <div className="productSubTxt">Analysis based on chemist report </div>
          </div>
          <div className="toggle-img"><img src="../public/assets/images/arrow-grey@2x.png"/></div>
        </div>
      
   
 </div>}
 >
    <div>
      {/* {rcpalistDet ? rcpalistDet.map((item)=>( */}
        <div className="product-detail-list">
        <div>
        <ul>
          <li>prescribed: {list.kk}</li>
          <li>value:{list.tval}</li>
          <li>Competitor Product: <span className="playImgPad"><img src="../public/assets/images/play-button.svg"/></span></li>
        </ul>
         
          </div>
         
        </div>
      {/* )):''} */}
       <div className="tableBox">
          <Table responsive width="336px">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Prescribed</th>
                  <th>Value</th>
                  <th>Qt.</th>
                  <th>%</th>
                </tr>
            </thead>
            <tbody>
              {rcpalistDet.map((item) => { return item.CltProduct==""?null:
                  <tr>
                      <td>{item.CltProduct}</td>
                      <td>{item.CltRx}</td>
                      <td>{item.CltVal}</td>
                      <td>{item.CltQty}</td>
                      <td>{item.CltWeight}</td>
                  </tr>
                })} 
                                       
            </tbody>
          </Table>
        </div>
    </div>
    </Collapsible>
  </div>
  )):<div className="rcpaMsg">No RCPA Details</div>}
</div>
    <div className="rps-tab-sec1">
      
      <h4 className="rps-tab-sec-title">Enter Doctor Details Against RPS Entry Details</h4>
      <DoctorProfile 
        show={modalShow} 
        docCode={selectedDoc} 
        docEmail={docEmail}
        docphone={docNumber }
        profileUpdate={profileUpdate}
        selectedDocName={selectedDocName}
        onHide={() => setModalShow(false)} 
      />
      <DoctorHistoryModal 
        show={docHistoryModal} 
        docHistoryData={docHistoryData}
        onHide={()=>closeModal()}
      />
      <Row >
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Sr. No.</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Sr. No." 
            value={srNo == "add" ? localStorage.getItem("rps_srno"):srNo}
            onChange=""
          />
        </Col>
        {localStorage.getItem('type') == "2" && apprid == "0" ?
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3 rpsDrop">
        <div className=" selectlocation">
          <Form.Label className="customized-label">F.S. Name</Form.Label>
          {/* <Form.Control type="text" className="customized-input" placeholder="F.S. Name" value="Vijay Sharma" /> */}
          <Dropdown   
                name={"from"} 
                Type={1}     
                Selected={selectedFs}
                selectedProduct={(value)=>selectFsType(value)} 
                data={fslist} 
            />
            </div>
        </Col>
         :''} 
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3 rpspt16">
          <Form.Label className="customized-label">Request Date </Form.Label>
          {/* <Form.Control type="text" className="customized-input" placeholder="RPS Date " value="07-May-2020" /> */}
          <InputGroup className="datepickerAligment controls">
            {/* <DatePicker
                selected={rpsdate}
                dateFormat="dd/MM/yyyy"
                onChange={dateChanged}
                placeholderText="Ex: 09/01/19"
            /> */}
             <DatePicker
                selected={  currDate =="Invalid Date"?null:currDate }
                // dateFormat="dd/MM/yyyy"
                 dateFormat="dd/MM/yyyy"
                onChange={dateChanged}
                placeholderText="Ex: 09/01/19"
            />
            <InputGroup.Append>
            <InputGroup.Text>
                <img src="../public/assets/images/calendar.svg" alt="calendar" />
            </InputGroup.Text>
            </InputGroup.Append>
            </InputGroup>
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">No. Of RPS</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="No. Of RPS" 
            onChange=""
            value={srNo == "add" ? rpsCount : rpsno }
          />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">No. Of Months</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="No. Of Months" value={RMonth} />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3  rpsDrop">
          <div className="selectlocation">
          <Form.Label className="customized-label">Dr. Name <span className="colorRed">*</span></Form.Label>
          {/* <Form.Control type="text" className="customized-input" placeholder="Search & Select" /> */}
          {apprid == "1" ? 
            <Form.Control 
              type="text" 
              className="customized-input"
              placeholder="" 
              value={docName} 
            /> :
            <Dropdown   
                name={"from"} 
                Type={1}     
                Selected={selectedDoc}
                selectedProduct={(value)=>selectDoctor(value)} 
                data={doctorList} 
            />
          }
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3 rpspt16">
          <Form.Label className="customized-label">Dr. Category<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter" value={docCategory} />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr. Grade<span className="colorRed">*</span></Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Here" value={docGrade} />
        </Col>

        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">MCI No.</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter Here" 
            onChange={apprid == "1" ? '' :()=>handleMcl()} 
            value={docMclNo}
          />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Subarea/Area</Form.Label>
          <Form.Control type="text" className="customized-input" placeholder="Enter Area" value={docPlace} />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr. Phone No.</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter Here"  
            onChange={apprid == "1" ? '' :()=>changeNumber()} 
            value={docNumber} 
          />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Dr. E- Mail
          {/* <span className="colorRed">*</span> */}
          </Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter e-mail" 
            onChange={apprid == "1" ? '' :()=>changeEmail()} value={docEmail} 
            onBlur={()=>validationEmail()}
          />
        </Col>

        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">RPS Amount</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter Here" 
            value={srNo == 'add' ? totalAmount : rpsAmount} 
          />
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Expected Business From Date<span className="colorRed">*</span></Form.Label>
          {/* <Form.Control type="text" className="customized-input" placeholder="Enter here" value="07-May-2020" /> */}
          <InputGroup className="datepickerAligment controls">
            <DatePicker
                selected={exp_date== "Invalid Date"?null:exp_date }
                // onChange={expBusinessFromDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Ex: 09/01/19"
            />
            <InputGroup.Append>
            <InputGroup.Text>
                <img src="../public/assets/images/calendar.svg" alt="calendar" />
            </InputGroup.Text>
            </InputGroup.Append>
            </InputGroup>
        </Col>
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Expected Business To Date <span className="colorRed">*</span></Form.Label>
          {/* <Form.Control type="text" className="customized-input" placeholder="Enter here" value="07-Oct-2020" /> */}
          <InputGroup className="datepickerAligment controls">
            <DatePicker
                selected={exp_to_date =="Invalid Date"?null:exp_to_date}
                // onChange={expBusinessToDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Ex: 09/01/19"
            />
            <InputGroup.Append>
            <InputGroup.Text>
                <img src="../public/assets/images/calendar.svg" alt="calendar" />
            </InputGroup.Text>
            </InputGroup.Append>
            </InputGroup>
        </Col>
        {commitmentdman == 0 ? 
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Commitment From Doctor</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter Here" 
            onChange={apprid == "1" ? '' :()=>CommitmentDoctor()} 
            value={commitmentDoc} />
        </Col>:''}

        {requiredman == 0 ?  
        <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Requirement From Doctor</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter Here" 
            onChange={apprid == "1" ? '' :()=>ReqFromDoctor()} 
            value={reuirmentDoc}
          />
        </Col> :''}
        {remarkVal == 0 ? 
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="mt-3">
          <Form.Label className="customized-label">Remarks</Form.Label>
          <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Enter Here" 
            onChange={apprid == "1" ? '' :()=>handleRemark()} 
            value={remark} 
          />
        </Col>:''}
      </Row>

      <div className="mt-4 rps-notesec">
        {apprid == "1" ?
          <button className="primary primary-outline mr-3 mobileMargin" disabled  >Dr. Profile</button>:
          <button className="primary primary-outline mr-3 mobileMargin"  onClick={()=>editProfile()} >Dr. Profile</button>}
        {apprid == "1" ? 
          <button className="primary primary-outline mr-3 mobileMargin" disabled>RCPA Details</button>:
          <button className="primary primary-outline mr-3 mobileMargin" onClick={()=>openNav()}>RCPA Details</button>}
        {apprid == "1" ? 
          <button className="primary primary-outline mr-3 mobileMargin" disabled>Doctor Visit History</button>:
          <button className="primary primary-outline mr-3 mobileMargin" onClick={()=>docVisitHistory()}>Doctor Visit History</button>}
        {apprid == "1" ?
          <button className="primary" onClick={()=>handleNext()}>Next</button>:
          <button className="primary" onClick={()=>saveDrDetails()}>Submit</button>}
      </div>
     
      <StatusPopup 
        show={successPop} 
        success={false}
        message={sMsg} 
        onClose={()=>showSuccess(false)} 
      />
       <StatusPopup 
        show={sucessres} 
        success={true}
        message={resultMsg} 
        onClose={()=>showResultModal(false)} 
        
      />
    </div>
    </React.Fragment>
  )
}

export default withRouter(WizardDrDetails)