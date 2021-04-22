import React,{useState, useEffect } from 'react'
import DownlineMaterialTable from './DownlineMaterialTable'
import ApprovalAction from '../components/ApprovalAction'
import {Form} from 'react-bootstrap'
import MaterialDetails from '../popup/MaterialDetails'
import {postToServer} from '../../lib/comm-utils'
import ShowActionDrop  from '../components/ShowActionDrop'
import DeleteAlert from '../../lib/DeleteAlert'
import StatusPopup from '../../lib/StatusPopup'
import {withRouter} from 'react-router-dom'
import {getConfirmList} from '../../actions/Material'
import { connect } from "react-redux";
import SuccessMsg from '../popup/successMsg'

const ConfirmationList=(props)=>{
 //  const[approvedList,setData] = React.useState([])
   const [header,setHeader] = React.useState([])
   const [body,setBody] = React.useState([])
   const [monthlist,setMonths] = React.useState([])
   const [yearlist,setYears] = React.useState([])
//    const [month,selectedMonth] = React.useState(localStorage.getItem("sMonth")!= null ? localStorage.getItem("sMonth") : new Date().getMonth() + 1)
   const [month,selectedMonth] = React.useState(localStorage.getItem("sMonth") != null ? localStorage.getItem("sMonth") : new Date().getMonth() + 1)
   const [year,selectedYear] = React.useState(new Date().getFullYear())
   const [actionStatus,showAction] = React.useState(false)
   const [showModal,showDeatils] = React.useState(false)
   const [filterList,filterData] = React.useState([])
   const [resonPop,setRejectModal]= React.useState(false)
   const [successPop,showSuccess] = React.useState(false)
   const [sMsg,showSuccessMsg] = React.useState([])
   const [gsrno,getSrno] = React.useState([])
   const [gempcode,getEmpCode]=React.useState([])
   const [action,getAction] = React.useState([])
   const [showRejectPopup,onShowPopup] = React.useState(false)
   const [rejectmsg,showRejectMsg] = React.useState([])
   const [rejectStatus,showrejectStatus] = React.useState([])
   const [empname,getEmpName] = React.useState([])
   
    useEffect(()=>{
        var data = {"Index":"ConfirmList","Data":{"month":month.toString(),"year":year.toString()},"Token":""}
            props.getConfirmList(data)
            localStorage.removeItem("sMonth")
    },[month,year])
    console.log("sweta", localStorage.getItem("sMonth"))
    const getMonth=(month)=>{
        selectedMonth(month)
    }
    const getYear=(year)=>{
        selectedYear(year)
    }
    const sendResponse=(action,srno,empCode,empname)=>{
        getSrno(srno)
        getEmpCode(empCode)
        getAction(action)
        getEmpName(empname)
        let sub = action == "0" ? 
             "Your Request is confirmed":
             action == "1" ?
             "Your Request is Rejected":
             action == "2" ? 
             "Your Request is Postpone":null

        if(action == "1"){
            setRejectModal(true)
        }else if(action == "2"){
            setRejectModal(true)
        }else{
            var data = {"Index":"ConfirmRequest", "Token":"","Data":{"srno":srno.toString(),"senderempcode":empCode.toString(),"sub":sub.toString(),"note":"","action":action.toString()}}
            postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                if(Result.data.Status == "Success"){ 
                    let msg 
                    Result.data.data.map((item)=>{
                        msg= item.status
                    })
                    showSuccess(true)
                    showSuccessMsg(msg)
                    var data = {"Index":"ConfirmList","Data":{"month":month.toString(),"year":year.toString()},"Token":""}
                    props.getConfirmList(data)
                }
              
            }).catch(  (Error)=> {  
           // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            })
        }

       
    }
    
    const showModalDeatils=(srno,emp)=>{
        let filterList=[]
        props.approvedList.filter(x => x.n_srno == srno).map((a)=>filterList.push(a))
        showDeatils(!showModal)
        filterData(filterList)
    }
    const btnAction=(data,reason)=>{ 
        if(data == 'yes'){
            let sub = action == '1' ? 'Your Request Rejected' : "Your Request Postponed"
            var app =  {"Index":"ConfirmRequest", "Token":"",
            "Data":{"action":action.toString(),"srno":gsrno.toString(),"senderempcode":gempcode.toString(),"sub":sub.toString(),"note":reason.toString()}
        }
        postToServer("MaterialRequestApi",app).then( (Result)=>{ 
            let msg 
            Object.keys(Result.data.data[0]).map((item)=>{
                msg = Result.data.data[0][item]
            })
            setRejectModal(false)
            onShowPopup(true)
           // showSuccess(true)
            showRejectMsg(empname)
            showrejectStatus("reject")
            var data = {"Index":"ConfirmList","Data":{"month":month.toString(),"year":year.toString()},"Token":""}
            props.getConfirmList(data)

        }).catch(  (Error)=> {  
    // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
        }else{
            setRejectModal(false)
        }
    }
    const uploadInvoice =(srno,empcode)=>{
        localStorage.setItem("srno",srno)
        localStorage.setItem("material_Type",empcode)
        localStorage.setItem("sel_month",month)
        props.history.push('/upload_invoice')
    }
    const editRequest =(id,visitingcard,senderempcode)=>{
        localStorage.setItem("edit","edit")
        localStorage.setItem("visitingFlag",visitingcard)
        // localStorage.setItem("senderempcode",senderempcode)
        props.history.push('/add_material/'+id)
        
    }
    
    useEffect(()=>{
        
        let header =[]
        let body=[]
        if(props.approvedList){
            if(props.approvedList[0]){
                if(props.approvedList[0]["n_srno"]){
                    header.push( { prop: 'action', title: 'Action',filterable: true },)
                }
                if(props.approvedList[0]['Employee']){
                    header.push({ prop: 'Employee', title: 'Employee Name',filterable: true })
                }
                if(props.approvedList[0]['date']){
                    header.push({ prop: 'date', title: 'Request Date',filterable: true })
                }
                if(props.approvedList[0]['c_name']){
                    header.push({ prop: 'c_name', title: 'Material',filterable: true })
                }
               // if(props.approvedList[0]['c_approved_note']){
                    header.push({ prop: 'cnote', title: 'Note' })
              //  }
                if(props.approvedList[0]['c_status']){
                    header.push({ prop: 'cstatus', title: 'Confirm' })
                }
                header.push({ prop: 'adminStatus', title: 'Material Dispatch Status' ,filterable: true})
            }
        }
       
       
        props.approvedList ? props.approvedList.map((item)=>{
            let appliedText = <span className="appliedBtn">Applied</span>
            let approvedText = <span className="complete">Approved</span>
            let inprogress = <span className="confirmBtn">In Progress</span>
            let rejectedText = <span className="incomplete">Rejected</span>
            let notApproveText = <span className="incomplete">Not Approved</span>
            let dispatchedText = <span className="dispatch">Dispatched</span>
            
            const actionLink =  <ShowActionDrop 
            srno={item.n_srno}
            empCode={item.c_Empcode}
            empname = {item.Employee}
            sendResponse={sendResponse}
            show={actionStatus}
            loginUser="1"
        />
        item.cnote = <Form.Control
        type="text"
        className="notepad"
        value={item.c_confirmed_note}
    />
    
            if(item.c_status == "C"){
                item.cstatus = <img src="../public/assets/images/correct_green.svg" className="dcrimg mr-3" />
            }
            if(item.c_status == "R"){
                item.cstatus = <img src="../public/assets/images/Reject_red.svg" className="dcrimg mr-3" />
            }
            if(item.c_status == "A" ){
                item.cstatus = actionLink
            }
            if(item.c_status == 'P'){
                item.cstatus = actionLink
            }
            // if(item.c_status == 'C'){
            //      item.adminStatus = ConfirmedText
                
            // }
            if(item.Dispatched == 'Dispatched'){
                item.adminStatus = dispatchedText
            }
            if(item.Dispatched == "Approved"){
                item.adminStatus = approvedText
            }
            if(item.Dispatched == 'Postponed'){
                item.adminStatus = inprogress
            }
            if(item.Dispatched == 'Confirmed'){
                item.adminStatus = <img className="hcursur" onClick={()=>uploadInvoice(item.n_srno,item.c_name)} src="../public/assets/images/dispatchedImg.svg" />
            }
            // if(item.Dispatched == "Dispatched"){
            //     item.adminStatus = dispatchedText
            // }
            
            // if(item.Dispatched == "Material dispatch Note"){
            //     item.adminStatus = <img src="../public/assets/images/dashImg.svg" />
            // }
            item.action = item.c_status == "A" ? item.c_material_code == 'M000000001' ?
            <img 
                src="../public/assets/images/editRow.svg" 
                onClick={()=>editRequest(item.n_srno,item.visiting_card,item.c_emp_code)} 
                className="dcrimg mr-3" 
            />
            :
             <img 
                src="../public/assets/images/blue_eye.svg" 
                onClick={()=>showModalDeatils(item["n_srno"],item.Employee)} 
                className="dcrimg mr-3" 
            />:
            <img 
            src="../public/assets/images/blue_eye.svg" 
            onClick={()=>showModalDeatils(item["n_srno"],item.Employee)} 
            className="dcrimg mr-3" 
        />
            body.push(item)
        }): null
      
      
        setHeader(header)
        setBody(body)
    },[props.approvedList])

  
  //  console.log(props.approvedList,"approvedList")
      
         const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        }
        return(
            <div>
                 {body && header ?
                <DownlineMaterialTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    monthFilter={props.monthlist}
                    yearFilter={props.yearlist}
                    getMonth={getMonth}
                    month={month}
                    getYear={getYear}
                    year={year}
                />: null}
                 <MaterialDetails 
                    showNewTaskModal={showModal}
                    closeModal={()=>showDeatils(false)}
                    materialInfo={filterList}
                    type="manager"
                />
                <DeleteAlert 
                    show={resonPop}
                    btnAction={btnAction}
                    onClose={()=> setRejectModal(false)}
                />
                <StatusPopup 
                    show={successPop} 
                    success={true}
                    message={sMsg} 
                    onClose={()=>showSuccess(false)} 
                />
                {showRejectPopup ? 
                 <SuccessMsg   
                    tital={action == "1" ? "Material Request Rejected" : "Material Request Postponed"}
                    msg={"You have rejected the request of "+empname}
                    success={()=>onShowPopup(false)}
                    status={rejectStatus}
                /> : null}
                
            </div>
        )
    
}
const mapStateToProps = (state) => ({
    approvedList: state.Material.list_data
  })
  
  const mapDispatchToProps = (dispatch) => ({
    getConfirmList: (data) => dispatch(getConfirmList(data))
  })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmationList))