import React,{useState, useEffect } from 'react'
import DownlineMaterialTable from './DownlineMaterialTable'
import ApprovalAction from '../components/ApprovalAction'
import {Form} from 'react-bootstrap'
import MaterialDetails from '../popup/MaterialDetails'
import {postToServer} from '../../lib/comm-utils'
import { setMasterData } from '../../actions/master'
import ShowActionDrop from '../components/ShowActionDrop'
import DeleteAlert from '../../lib/DeleteAlert'
import StatusPopup from '../../lib/StatusPopup'
import {withRouter} from 'react-router-dom'
import {getMaterialList} from '../../actions/Material'
import { connect } from "react-redux";
import SuccessMsg from '../popup/successMsg'

const DownlineApprovalList = (props) =>{

    const [month,selectedMonth] = React.useState(new Date().getMonth() + 1)
   // const [approvedData, setData] = React.useState([]);
    const [showModal,showDeatils] = React.useState(false)
    const [header,setHeader] = React.useState([])
    const [monthFilter,setMonths] = React.useState([])
    const [yearFilter,setYears] = React.useState([])
    const [year,selectedYear] = React.useState(new Date().getFullYear())
    const [body,setBody] = React.useState([])
    const [filterList,filterData] = React.useState([])
    const [actionStatus,showAction] = React.useState(false)
    const [resonPop,setRejectModal]= React.useState(false)
    const [successPop,showSuccess] = React.useState(false)
    const [gSrnno,getSrno] = React.useState([])
    const [gempcode,getEmpCode] = React.useState([])
    const [sMsg,showSuccessMsg] = React.useState([])
    const [showRejectPopup,onShowPopup] = React.useState(false)
    const [empname,getEmpName] = React.useState([])
    const [rejectStatus,showrejectStatus] = React.useState([])

    useEffect(()=>{
       
            let data = {"Index":"ApproveList",  
            "Data":{
                "month":month.toString(),
                "year":year.toString()
                }, 
                "Token":""}
        //     postToServer("MaterialRequestApi",data).then( (Result)=>{ 
        //         if(Result.data.Status == "Success"){ 
        //             let approvedData = Result.data.data
        //             setData(approvedData)
        //         }
              
        //     }).catch(  (Error)=> {  
        //    // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        //     })
            props.getMaterialList(data)
       
      },[month,year])
     // console.log(props.approvedData, "approvedData")
    
    
    const getMonth=(month)=>{
        
        selectedMonth(month)
    }
    const getYear=(year)=>{

        selectedYear(year)
    }
    const showModalDeatils=(srno,empname)=>{
        let filterList=[]
        props.approvedData.filter(x => x.n_srno == srno).map((a)=>filterList.push(a))
        showDeatils(!showModal)
        filterData(filterList)
    }
    const sendResponse =(data,srno,empCode,empname)=>{ 
        getSrno(srno)
        getEmpCode(empCode)
        getEmpName(empname)
        if(data == "1"){
            setRejectModal(true)
        }else{
            
            let sub="your request material Approved"
            var app =  {"Index":"ApproveRequest", "Token":"",
                            "Data":{"action":data.toString(),"srno":srno.toString(),"senderempcode":empCode.toString(),"sub":sub.toString(),"note":sub.toString()}
                        }
                        postToServer("MaterialRequestApi",app).then( (Result)=>{ 
                            let msg 
                            Object.keys(Result.data.data[0]).map((item)=>{
                                msg = Result.data.data[0][item]
                            })
                            setRejectModal(false)
                            showSuccess(true)
                            showSuccessMsg(msg)
                            let data = {"Index":"ApproveList",  
                            "Data":{
                                "month":month.toString(),
                                "year":year.toString()
                                }, 
                                "Token":""}
                                props.getMaterialList(data)   
                   
            })
      
    }
}
    
    const btnAction=(data,reason)=>{ 
        if(data == 'yes'){
            let sub = 'Your Request Rejected'
            var app =  {"Index":"ApproveRequest", "Token":"",
            "Data":{"action":"1","srno":gSrnno.toString(),"senderempcode":gempcode.toString(),"sub":sub.toString(),"note":reason.toString()}
        }
        postToServer("MaterialRequestApi",app).then( (Result)=>{ 
            // let msg 
            // Object.keys(Result.data.data[0]).map((item)=>{
            //     msg = Result.data.data[0][item]
            // })
            let data = {"Index":"ApproveList",  
            "Data":{
                "month":month.toString(),
                "year":year.toString()
                }, 
                "Token":""}
                props.getMaterialList(data)  
            setRejectModal(false)
            onShowPopup(true)
            showrejectStatus("reject")
            showRejectMsg(empname)
          
            

        }).catch(  (Error)=> {  
    // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
        }else{
            setRejectModal(false)
        }
    }
    const uploadInvoice=(srno,name)=>{
        props.history.push('/upload_invoice')
    }
    // render(){
    useEffect(()=>{
        let header = []
        let body = []
       
        if(props.approvedData){ 
        if(props.approvedData[0]){
            if(props.approvedData[0]["n_srno"]){
                header.push( { prop: 'action', title: 'Action',filterable: true },)
            }
            if(props.approvedData[0]["Employee"]){
                header.push({ prop: 'Employee', title: 'Employee Name' ,filterable: true})
            }
            if(props.approvedData[0]["date"]){
                header.push({ prop: 'date', title: 'Request Date',filterable: true,sortable:true })
            }
            if(props.approvedData[0]["c_name"]){
                header.push({ prop: 'c_name', title: 'Material' ,filterable: true})
            }
            if(props.approvedData[0]["priority"]){
                header.push({ prop: 'priority', title: 'Priority',sortable:true ,filterable: true})
            }
           // if(approvedData[0]["c_approved_note"]){
                header.push({ prop: 'cnote', title: 'Note' ,filterable: true})
           // }
           
            if(props.approvedData[0]["c_status"]){
                header.push({ prop: 'cstatus', title: 'Approval' ,filterable: true})
            }
        //    if(props.loginUser == '1'){
        //        // if(approvedData[0]["c_status"]){
        //             header.push({ prop: 'adminStatus', title: 'Material Dispatch Status' })
        //        // } 
        //    } 
            
          
        }
       
        props.approvedData ? props.approvedData.map(item => {
            let appliedText = <span className="appliedBtn">Applied</span>
            let approvedText = <span className="complete">Approved</span>
            let ConfirmedText = <span className="confirmBtn">Confirmed</span>
            let rejectedText = <span className="incomplete">Rejected</span>
            let notApproveText = <span className="incomplete">Not Approved</span>

             const edit = <img src="../public/assets/images/blue_eye.svg" onClick={()=>showModalDeatils(item["n_srno"],item.Employee)} className="dcrimg mr-3" />
            
             const actionLink =  <ShowActionDrop 
                                    srno={item.n_srno}
                                    empCode={item.c_emp_code.trim()}
                                    sendResponse={sendResponse}
                                    empname={item.Employee}
                                    show={actionStatus}
                                    loginUser={props.loginUser}
                                />
            //   <img src="../public/assets/images/overflow.svg" onClick={()=>showAction(true)} className="dcrimg mr-3" />
          
            item.cnote = <Form.Control
                            type="text"
                            className="notepad"
                            value={item.c_approved_note}
                        />
            item.action = edit
            
            if(item.c_status.trim() == "A"){
                item.cstatus = <img src="../public/assets/images/correct_green.svg" className="dcrimg mr-3" />
            }
            if(item.c_status.trim() == "N"){
                item.cstatus = <img src="../public/assets/images/Reject_red.svg" className="dcrimg mr-3" />
            }
            if(item.c_status != "A" && item.c_status != "N"){
                item.cstatus = actionLink
            }
            if(props.loginUser == '1'){
                if(item.c_status == 'A'){
                    // item.adminStatus = approvedText
                    item.adminStatus = <img className="hcursur" onClick={()=>uploadInvoice(item.n_srno,item.c_name)} src="../public/assets/images/dispatch.svg" />
                }
                if(item.c_status == 'D'){
                    item.adminStatus = <img className="hcursur" onClick={()=>uploadInvoice(item.n_srno,item.c_name)} src="../public/assets/images/dispatch.svg" />
                }
                
            }
           
            // item["ExpStatus"] = expenseLink
            body.push(item)
          }): null
        }
          setHeader(header)
          setBody(body)
    },[props.approvedData])
        

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
                    tital="Material Request Rejected" 
                     msg={"You have rejected the request of "+empname}
                    success={()=>onShowPopup(false)}
                    status={rejectStatus}
                /> : null}
            </div>
        )
    // }
}

const mapStateToProps = (state) => ({
    approvedData: state.Material.listdata
  })
  
  const mapDispatchToProps = (dispatch) => ({
    getMaterialList: (data) => dispatch(getMaterialList(data))
  })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DownlineApprovalList))