import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import SfcmrLoactiondrpdn from './sfcmrloactiondropdown'
import MysfclistTable from './mysfclisTable'
import Sfcapprovalpage from './approvalistpage'
import Sfclistdelete from './sfclistdelete'
import { postToServer } from '../../../lib/comm-utils'
import StatusPopup from './../../../lib/StatusPopup'
class Sfcmrbar extends Component {
    constructor(props) {
    super(props);
    this.state = {
        active: 1,
        showDelModal: false,
        isFull: false,
        mysfclist: [],
        sfNtype:'',
        sfcDownline:[],
        Messagetype:false,
        Errormsg : ""
    }
    this.onTabChange = this.onTabChange.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleCloseModal1 = this.handleCloseModal1.bind(this)
    this.handleView = this.handleView.bind(this)
    this.getNtype = this.getNtype.bind(this)
    this.getDownlineList= this.getDownlineList.bind(this)
    this.getNewSfcDropData = this.getNewSfcDropData.bind(this)
    this.redirectPage = this.redirectPage.bind(this)
    this.redirecEditPage = this.redirecEditPage.bind(this)
    this.NewSFC=this.NewSFC.bind(this)
		this.Errorclose=this.Errorclose.bind(this)
		this.deleteRequest = this.deleteRequest.bind(this)
}
Errorclose(){
    this.setState({
        showModal: false,Error:false
    })
}
NewSFC(){
    var data={
        "Index":"New_SFC"
    }
    postToServer("SFC",data).then( (Result)=>{

        // console.log(Result.data.Result,'pl')
       //  console.log(Result.data.Status,'pl')
    if(Result.data.Status.trim() == 'Success'){
 
    this.setState({ Messagetype:true ,Error: true, Errormsg: Result.data.Result[0]["msg"] })
    this.componentDidMount()
    }
    }).catch(  (Error)=> {  
        this.setState({  Messagetype:false ,Error: true, Errormsg: "Error in App At SFC API " })
     }  )
     
}
     
componentDidMount(){
    var data={
        "Index":"SFC"
    }
    postToServer("SFC",data).then( (Result)=>{
    if(Result.data.Status == 'Success'){
    // console.log( Result.data.Result ,"soundarya")
        this.setState({ mysfclist: Result.data.Result })
    }
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
     }  )
		 this.getNtype()
		 this.getDownlineList()
		 if (sessionStorage.getItem("approvalTab") != null) {
			this.setState({ active: sessionStorage.getItem("approvalTab") })
	}
	else {
			this.setState({ active: "1" })
	}
}

getNtype(){
    var nType=
        {"Index":"FsType",
        "Token":""
    }
    postToServer("SFC",nType).then( (Result)=>{
        if(Result.data.Status == 'Success'){
         //console.log( Result.data.Result ,"soundarya")
             this.setState({ sfNtype: Result.data.Result })
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
        })
}

onTabChange(tab) {
    if (this.state.active !== tab) {
        this.setState({
            active: tab
        })
    }
    if(tab == 3){
        this.getDownlineList()
    }
    if(tab == 2){
        this.getNewSfcDropData()
    }
    sessionStorage.setItem("approvalTab", tab)
}

handleShowModal() {
    this.setState({
      showDelModal: true,
    });
}
handleCloseModal() {
    this.setState({
      showDelModal: false,
    });
}
handleCloseModal1() {
    this.setState({
      showDelModal: false,
    });
}
handleView() {
    this.setState({
        isFull: !this.state.isFull
    });
}
getDownlineList(){
    var downline ={
                "Index":"MyDownlineApprovalList",
                "Token":""
            }
    postToServer("SFC",downline).then( (Result)=>{
        if(Result.data.Status == 'Success'){
            //console.log( Result.data.Result ,"soundarya")
                this.setState({ sfcDownline: Result.data.Result })
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
    })
}
getNewSfcDropData(){
    var data={
        "Index":"SFC_detail",
        "Data":{ "sfcno":""} ,
      }
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
        
           // this.setState({ mysfclist: Result.data.Result })
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
        })
}
redirectPage(status,sfcno){
    localStorage.setItem('status',status)
    this.setState({
        sfcStatus:status
    })
    this.props.history.push('./sfclistedit/'+sfcno)
}
redirecEditPage(status,sfcno){
  
    // alert(status)
    localStorage.setItem('status',status)
    this.setState({
        sfcStatus:status
    })
    this.props.history.push('./SfcEdit/'+sfcno)
}
deleteRequest(N_Srno,sinum ){
	var data={"Index":"SFC_Delete","Data":{"n_srno":N_Srno}}
	postToServer("SFC",data).then( (Result)=>{
			if(Result.data.Status == 'Success'){
					this.setState({Messagetype:true ,Error: true, Errormsg: "Deleted Successfully" })
					this.componentDidMount();
			}}).catch((Error) => {
					this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
	})
}
render() {
    var body = []
    let statusVal 
    this.state.mysfclist.length > 0 ? this.state.mysfclist.map((mysfcdata,index)=>{
        body.push({ sinum: index+1, 
                   sfcno: mysfcdata.N_Srno, 
                   submittedate: mysfcdata.c_create_date, 
                   status: mysfcdata.C_Status,
                   action: 'editdelete',
                   from: mysfcdata.from,
                   to:mysfcdata.to,
                   Reason:mysfcdata.Reason,
                   CanEdit: mysfcdata.CanEdit,
                   CanAdd : mysfcdata.CanAdd,
                   CanDelete : mysfcdata.CanDelete,
                   stp_no : mysfcdata.stp_no ? mysfcdata.stp_no : "--",
                   fsname: mysfcdata.fsname,
                   C_FS_Code : mysfcdata.C_FS_Code

                })
        // console.log(mysfcdata, "soun")
    }) : null
    const header = [
        { prop: 'action', title: 'Action' ,filterable: true },
        // { prop: 'sinum', title: 'SI. No',  filterable: true},
        { prop: 'sfcno', title: 'Srno',filterable: true, sortable: true },
        { prop: 'fsname', title: 'FSName', filterable: true, sortable: true },
        { prop: 'C_FS_Code', title: 'FSCode', filterable: true, sortable: true },
        { prop: 'submittedate', title: 'Submitted Date' ,sortable: true, filterable: true },
        {prop: 'from', title: 'From' ,filterable: true},
        {prop: 'to', title: 'To' ,filterable: true},
        { prop: 'status1', title: 'Status' , sortable: true, filterable: true },
        { prop: 'stp_no', title: 'SFC No.' , sortable: true, filterable: true },     
    ];
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
    var activeText= <span className="activeTextGreenpending">Pending</span>
    var partiallyActiveText = <span className="partiallyActiveTextYellowapproved">Approved</span>
    var confirmText = <span className="partiallyActiveTextYellowapproved">Confirmed</span>
    var rejectedtext = <span className="incomplete">Rejected</span>
    var editdelete =    <div> <Link to = "./sfclistedit" ><img  src = "../public/assets/images/Group 895.png" />  </Link>   &nbsp; &nbsp; <img onClick={this.handleShowModal}  className="deletebtn" src = "../public/assets/images/delete.png"/> </div>
    var viewdelete =  <div> <Link to="./sfcdetail"> <img  src = "../public/assets/images/eye.svg" />  </Link>  &nbsp; &nbsp; <img onClick={this.handleShowModal}  className="deletebtn" src = "../public/assets/images/delete.png"/> </div>
    var RequestedText= <span className="activeTextGreenpending">Requested</span>
    var savedText= <span className="activeTextGreenpending">Saved</span>
    body.map((item) => { 

    if(item.status == "Saved" ){
        item.status1 = savedText
    }
    if(item.status == "Pending" ){
        item.status1 = activeText
    }
    if(item.status == "Approved" ){
        item.status1 = partiallyActiveText
    }
    if(item.status == "Confirmed" ){
        item.status1 = confirmText
    }
    if(item.status == "Rejected" ){
        item.status1 = rejectedtext
    }
    if(item.status == "Requested"){
        item.status1 = RequestedText
    }
    
        item.action =   item.CanEdit == "1"  ?
                           
					<div><img  className="hcursur" onClick={()=>this.redirecEditPage(item.status,item.sfcno)} src = "../public/assets/images/Group 895.png" />{item.CanDelete == 1 ? <img  src = "../public/assets/images/delete.png" className="deletebtn ml10"  onClick={()=>this.deleteRequest(item.sfcno,item.sinum)}/> : null}</div>  :
					<div> <img  className="hcursur" onClick={()=>this.redirectPage(item.status,item.sfcno)} src = "../public/assets/images/eye.svg" /> </div>
                            {/* </Link>  */}
                {/* &nbsp; &nbsp; <img onClick={this.handleShowModal}  className="deletebtn" src = "../public/assets/images/delete.png"/>  */}
                       
    
    if(item.Reason == ""){
        item.Reason1 = "-"
    }else{
        item.Reason1 = item.Reason
    }
    // if(item.action == "viewdelete"){
    //     item.action =  viewdelete
    // }
    statusVal = item.status
})

    return (
        <React.Fragment>
            <div className="ongoing-orders-links">
                <ul className="ul-link">
                    <li className="order-link">
                        <div className={this.state.active == 1 ? "active-li-link" : "li-link"} onClick={() => { this.onTabChange('1') }} activeKey={this.state.active} eventKey="prp-request-list">
                            My SFC List
                        </div>
                    </li>
                    {/* {statusVal == "Confirmed" ? null :
                    <li className="order-link">
                        <div className={this.state.active == 2 ? "active-li-link" : "li-link"} onClick={() => { this.onTabChange('2') }}>
                            New SFC Chart
                        </div>
                    </li>} */}
                    {this.state.sfNtype ? this.state.sfNtype != 1 ?  
                    <li className="order-link">
                        <div className={this.state.active == 3 ? "active-li-link" : "li-link"} onClick={() => { this.onTabChange('3') }}>
                        My Downline Approval List
                        </div>
                    </li>:'' : ''}
                </ul>
            </div>
            
            {/* <div className="sfcheadmain"> */}
            
            <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
            {this.state.active == 1 ? 
                <div className="ongoing-orders-sfc">
                    <div className="sfc-head">
                        <div>
                            <h5 className="sfc-list-sec-head">
                            My Standard Fare Chart (SFC) List
                            </h5>
                        </div>
                        <div className="sfc-head-options">
                        {this.state.isFull ? (
                                <img
                                    src="../public/assets/images/collapse-grey.svg"
                                    className="fullscreen_img1"
                                    alt="fullscreen_img"
                                    onClick={this.handleView}
                                />) : (
                            
                                <img
                                    src="../public/assets/images/fullscreen.svg"
                                    className="fullscreen_img1"
                                    alt="fullscreen_img"
                                    onClick={this.handleView}
                                />
                                )}
                        </div>
                    </div>
                    <MysfclistTable
                        NewSFC={this.NewSFC}
                        tableHeader={header}
                        tableBody={body}
                        keyName="userTable"
                        tableClass="striped hover table-responsive"
                        rowsPerPage={10}
                        rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                        initialSort={{ prop: "username", isAscending: true, }}
                        labels={customLabels}
                    />
                </div> : null}
            {/* {this.state.active == 2 ? <SfcmrLoactiondrpdn data={this.state.mysfclist}  />   : null} */}
            {this.state.active == 3 ?  <Sfcapprovalpage data={this.state.sfcDownline} /> : null}
            <div>
                {this.state.showDelModal ?
                    <Sfclistdelete
                        show={this.state.showDelModal}
                        onHideconfirmation={this.handleCloseModal}
                        onHidecancel={this.handleCloseModal1}   
                        onShoworderconfirm={this.handleShowModal} />
                    : null}
            </div>
        </div>


        <StatusPopup
          message={this.state.Errormsg}
          show={this.state.Error}
          onClose={this.Errorclose}
          success={this.state.Messagetype}
        />
    </React.Fragment>
    )}
}

export default withRouter(Sfcmrbar);


