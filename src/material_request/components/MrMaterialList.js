import React,{Component} from 'react'
import MrMaterialTable from '../components/MrMaterialTable'
import {Form} from 'react-bootstrap'
import MaterialDetails from '../popup/MaterialDetails'
import {withRouter} from 'react-router-dom'
import ConfirmationBox from '../../lib/ConfirmationBox'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class MrMaterialList extends Component{
    constructor(props){
        super(props)
        this.state={
            showModal:false,
            deleteConfirm:false,
            deleteConfmMsg:'',
            monthList:[],
            yearList:[],
            materialList:[],
            visitingCardDetails:[],
            srNO:'',
            showStatusModal:false,
            successMsg:'',
            materialInfo:[],
            month:new Date().getMonth()+1,
            year:new Date().getFullYear(),
            userName:'',
            succ_status:''
        }
        this.handleModal = this.handleModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.showInvoice = this.showInvoice.bind(this)
        this.delete = this.delete.bind(this)
        this.getBtnResponse = this.getBtnResponse.bind(this)
        this.hideDeleteModal = this.hideDeleteModal.bind(this)
        this.getMonths = this.getMonths.bind(this)
        this.getYears = this.getYears.bind(this)
        this.getMaterialList = this.getMaterialList.bind(this)
        //this.getVisitingCardDetails = this.getVisitingCardDetails.bind(this)
        this.hide = this.hide.bind(this)
        this.getMaterialDetails = this.getMaterialDetails.bind(this)
        this.editRequest = this.editRequest.bind(this)
        this.filterMonth = this.filterMonth.bind(this)
        this.filterYear = this.filterYear.bind(this)
        this.handleMarkMat = this.handleMarkMat.bind(this)
    }
    handleModal(srno){
       // this.getVisitingCardDetails()
        this.getMaterialDetails(srno)
        this.setState({
            showModal:!this.state.showModal
        })
    }
    closeModal(){
        this.setState({
            showModal:!this.state.showModal
        })
    }
    showInvoice(id,material){
        localStorage.setItem("materialType",material)
        this.props.history.push('/invoice/'+id)
    }
    delete(srno){
        this.setState({
            deleteConfirm:!this.state.deleteConfirm,
            deleteConfmMsg:'You want to delete Request ?',
            srNO:srno
        })
    }
    // getVisitingCardDetails(){
    //     var data = {"Index":"CreditCardDetails", "Token":"token"} 
    //     postToServer("MaterialRequestApi",data).then( (Result)=>{ 
    //         if(Result.data.Status == "Success"){ 
    //             this.setState({ visitingCardDetails: Result.data.data })
               
    //         }
          
    //     }).catch(  (Error)=> {  
    //     this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    //     })
    // }
    getBtnResponse(data){
        if(data == "yes"){
            var data = {"index":"DeleteRequest","Token":"token","Data":{"srno":this.state.srNO}}  
            postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                this.getMaterialList()
                let msg
                Object.keys(Result.data.data[0]).map((item)=>{
                    msg = Result.data.data[0][item]
                })
                this.setState({ 
                    deleteConfirm:!this.state.deleteConfirm,
                    showStatusModal:!this.state.showStatusModal,
                    success:true,
                    successMsg:msg
                   
                })
            }
            }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            })
        }else{
            this.setState({
                deleteConfirm:!this.state.deleteConfirm,
                
            })
        }
    }
    hideDeleteModal(){
        this.setState({
            deleteConfirm:!this.state.deleteConfirm,
           
        })
    }
    componentDidMount(){
        //getMOnths
            this.getMonths()

        //get years
            this.getYears()
            
        this.getMaterialList()
         //userinfo
         var userInfo = {"Index":"NewRequestNo", "Token":""}
         postToServer("MaterialRequestApi",userInfo).then( (Result)=>{ 
         let userName
         let empCode
         let d_date 
         let new_srno
             if(Result.data.Status == "Success"){ 
                 Result.data.data.map((item)=>{
                     userName = item.empname
                   
                 })
             }
             this.setState({
                 userName:userName,
                
             })
             
         }).catch(  (Error)=> {  
         this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
         })

    }
    getMonths(){
        var months = {"Index":"GetMonth", "Token":""}   
        postToServer("MaterialRequestApi",months).then( (Result)=>{ 
    
           this.setState({ monthList: Result.data })
     
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
    getYears(){
        var year = {"Index":"GetYear", "Token":""}  
        postToServer("MaterialRequestApi",year).then( (Result)=>{ 
    
           this.setState({ yearList: Result.data })
     
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
    getMaterialList(month,year){
        
        let c_month = month ? month : this.state.month
        let c_year = year ? year : this.state.year
        
        var data = {
            "Index": "MaterialRequeatList",
            "Data":{
            "month":c_month.toString(),
            "year":c_year.toString()
            }, "Token":""} 
        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                this.setState({ materialList: Result.data.data })
     
            }
          
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
   
    hide(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
    }
    getMaterialDetails(srno){
        let m=[]
       // { this.props.downlineDoc.filter(x => x.N_Type == this.props.N_Type).map((a)=>m.push(a))}
        this.state.materialList ? 
            this.state.materialList.filter(x => x.n_srno == srno).map((a)=>m.push(a))
        : null
        this.setState({
            materialInfo:m
        })
    }
    editRequest(id,visitingcard,senderempcode){
        localStorage.setItem("edit","edit")
        localStorage.setItem("visitingFlag",visitingcard)
        localStorage.setItem("senderempcode",senderempcode)
        this.props.history.push('/add_material/'+id)
    }
    filterMonth(month){ 
        this.setState({
            month:month
        })
        this.getMaterialList(month,this.state.year)
    }
    filterYear(year){ 
        this.setState({
            year:year
        })
        this.getMaterialList(this.state.month,year)
    }
    handleMarkMat(srno){
        const check = event.target.checked
        if(check){
           this.updateRecipt(srno)
        }else{

        }
    }
    updateRecipt(srno){
        var data = {"Index":"updateReceipt", "Token":"token","Data":{"srno":srno}}
        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                this.setState({ 
                    showStatusModal: !this.state.showStatusModal,
                    success:true,
                    successMsg:'updated'
                 })
     
            }
          
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
    render(){
        const header = [
            { prop: 'action', title: 'Action' },
            { prop: 'n_srno', title: 'Sl. No.',filterable: true },
            { prop: 'date', title: 'Date',filterable: true},
            { prop: 'c_name', title: 'Material',filterable: true},
            { prop: 'c_description3', title: 'Change Request' },
            { prop: 'status1', title: 'Status', filterable: true},
            { prop: 'markmaterial', title: 'Mark Material Recieved'}
        ]

        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
        let appliedText = <span className="appliedBtn">Applied</span>
        let approvedText = <span className="complete">Approved</span>
        let ConfirmedText = <span className="confirmBtn">Confirmed</span>
        let rejectedText = <span className="incomplete">Rejected</span>
        let postponeText = <span className="confirmBtn">In Progress</span>
        let notApproveText = <span className="incomplete">Not Approved</span>
       

        this.state.materialList ? this.state.materialList.map((item,index)=>{
            if(item.status == "Applied"){
                item.status1 = appliedText
            }
            
            if(item.status == "Approved"){
                item.status1 = approvedText
            }
            if(item.status == "Confirmed"){
                item.status1 = ConfirmedText
            }
            if(item.status == "Rejected"){
                item.status1 = rejectedText
            }
            if(item.status == "Dispatched"){
                // item.status1 = <img className="hcursur" onClick={()=>this.showInvoice(item.n_srno,item.c_name)} src="../public/assets/images/dispatch.svg" />
                item.status1 =  <span className="dispatch hcursur" onClick={()=>this.showInvoice(item.n_srno,item.c_name)}><img   src="../public/assets/images/white_eye.svg" /><span className="dispatchFirt">Dispatched</span></span>
            }
            if(item.status == "Not Approved"){
                item.status1 = notApproveText
            }
            if(item.status == "Postponed"){
                item.status1 = postponeText
            }
            item.slno = index+1
           item.action =<div>
                        {item.status == "Applied" ?
                            <span>
                                <img 
                                    className="hcursur"
                                     onClick={()=>this.editRequest(item.n_srno,item.visiting_card,item.c_emp_code)} 
                                     src="../public/assets/images/editRow.svg" 
                                />
                            </span>
                            :
                            <span>
                                <img 
                                    className="hcursur" 
                                    onClick={()=>this.handleModal(item.n_srno)} 
                                    src="../public/assets/images/blue_eye.svg" 
                                />
                            </span>}
                            <span>
                                {item.status == "Applied" ?
                                 <img  
                                    className="pl32 hcursur" 
                                    onClick={()=>this.delete(item.n_srno)} 
                                    src = "../public/assets/images/deletetpd.svg"
                                />
                                :
                                <img  
                                    className="pl32 " 
                                    onClick=""
                                    src = "../public/assets/images/delete_gray.svg"
                                />}
                            </span>
                        </div>
                        let checked
                        if(item.n_rcvd == "1"){
                            checked = true
                        }else{
                            checked = null
                        }
                    if(item.status == "Dispatched"){
                        item.markmaterial = <div className="">
                        <Form.Check
                            custom
                            checked={checked}
                            type="checkbox"
                            id={item.n_srno}
                            label=""
                            name=""
                            onChange={()=>this.handleMarkMat(item.n_srno)}
                        />
                         </div>
                    }else{
                         item.markmaterial = <div className="">
                         <Form.Check
                             custom
                             checked={checked}
                             type="checkbox"
                             id=""
                             label=""
                             name=""
                             onChange=""
                         />
                          </div>
                    }
                   
                           
        }): null
        return(
            <div>
                <MrMaterialTable
                    tableHeader={header}
                    tableBody={this.state.materialList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    monthList={this.state.monthList}
                    yearList={this.state.yearList}
                    filterMonth={this.filterMonth}
                    filterYear={this.filterYear}
                    sYear={this.state.year}
                    sMonth={this.state.month}
                />
                <MaterialDetails 
                    showNewTaskModal={this.state.showModal}
                     carddata={this.state.visitingCardDetails}
                     materialInfo = {this.state.materialInfo}
                    closeModal={this.closeModal}
                    userName={this.state.userName}
                    type="mr"
                />
                 <ConfirmationBox 
                    show={this.state.deleteConfirm}
                    onClose={this.hideDeleteModal}
                    msg={this.state.deleteConfmMsg}
                    btnResponse={this.getBtnResponse}
                /> 
                <StatusPopup 
                    show={this.state.showStatusModal} 
                    success={this.state.success}
                    message={this.state.successMsg} 
                    status={this.state.succ_status}
                    onClose={this.hide} 
                />
            </div>
        )
    }
}

export default withRouter(MrMaterialList)