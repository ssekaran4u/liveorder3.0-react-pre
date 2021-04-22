import React, { Component } from 'react';
import MtpTable from './MtpTable';
import MainDrop from '../popup/MainDrop';
import { withRouter } from 'react-router-dom';
import StatusPopup from '../../../lib/StatusPopup'
import {postToServer} from '../../../lib/comm-utils'
import ConfirmationBox from '../../../lib/ConfirmationBox'

class MtpList extends Component {
    constructor(props){
        super(props)
        this.state={
            mtpDate:'',
            deleteConfirm:false,
            showdelete:false,
            deleteConfmMsg:'',
            month:'',
            year:''

        }
        this.editmtp = this.editmtp.bind(this)
        this.deleteMtp = this.deleteMtp.bind(this)
        this.hideDelete = this.hideDelete.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.getBtnResponse = this.getBtnResponse.bind(this)
        this.hideDeleteModal = this.hideDeleteModal.bind(this)
    }
    editmtp(month,year){
        let mon =  month > 9 ? month : '0'+month
        let mtpdate = mon+'/'+"01/"+year
       
        localStorage.setItem("mtpdate",mtpdate)
        this.props.history.push('/newTourPlan')
    }
    deleteData(month,year){
        // alert("delete")
        this.setState({
            month:month,
            year:year,
            deleteConfirm:!this.state.deleteConfirm,
            deleteConfmMsg:'You Want to delete TP'
        })
    }
    deleteMtp(){
        this.setState({   deleteConfirm:!this.state.deleteConfirm,})
        var data =  {"Data": {"Month": this.state.month.toString(),"Year":this.state.year.toString()},"index": "MTP_Delete","Token": "","menuid":"38"}
        postToServer("MTP",data).then( (Result)=>{ 
            if(Result.data){ 

                // message={this.state.deletemsg}
                // show={this.state.showdelete}
                // onClose={this.hideDelete}
                // success={this.state.success}
                Result.data.map((item)=>{

// alert(item["Result"])
// alert(item["status"])

if(item["status"]=="0"){
    this.setState({ showdelete:true ,success:false, deletemsg:item["Result"] })
}else{
    this.setState({ showdelete:true ,success:true, deletemsg:item["Result"] })
}

                    // Object.keys(item).map((key)=>{
                    //      //deletemsg = item[key]
                    //      this.setState({ 
                          
                    //         showdelete:!this.state.showdelete,
                    //         deletemsg:item[key],
                    //         success:true,
                    //     })
                    // })
                })
               
            }
            
        }).catch(  (Error)=> {  
            console.log(Error)
            _this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        }) 
    }
    hideDelete(){
        this.setState({
            showdelete:!this.state.showdelete,
        })
        this.props.getmylist()
    }
    getBtnResponse(data){
        if(data == 'yes'){
           this.deleteMtp()
        }else{
            this.setState({
                deleteConfirm:!this.state.deleteConfirm
            })
        }
    }
    hideDeleteModal(){
        this.setState({
            deleteConfirm:!this.state.deleteConfirm
        })
    }
    
    render() {

        const header = [
            // { prop: 'viewIcon' },
            { prop: 'action', title: 'Action',filterable: true },
            { prop: 'N_Srno', title: 'TP No.',filterable: true,sortable:true },
            { prop: 'mon', title: 'Month',filterable: true, sortable:true },
            { prop: 'N_Year', title: 'Year',filterable: true, sortable:true },
            { prop: 'Date', title: 'TP Created Date',filterable: true, sortable:true },
            { prop: 'status', title: 'Status',filterable: true, sortable:true },
              
        ];

        var approvedText= <span className="approvedText">Approved</span>
        var rejectedText= <span className="rejectedText">Rejected</span>
        var pendingText = <span className="pendingText">Sent For Approval</span>
        var editText= <span className="rejectedText">Edit</span>
        var noText =<span className="pendingText">Not Entered</span>
        var submittext =<span className="approvedText">Submit</span>

        var allmonth= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

        this.props.myTp?this.props.myTp.map((item) => {
            if(item.N_Month){
                item.mon = allmonth[item.N_Month-1]
            }
            if(item.c_approved == "A"){
                item.status = approvedText
                item.action = <div><img src="../public/assets/images/eye.svg" className="hcursur" onClick={()=>this.editmtp(item.N_Month,item.N_Year)}/> &nbsp; <img src="../public/assets/images/delete.svg" onClick={()=>this.deleteData(item.N_Month,item.N_Year)} /></div>
               // item.action = <img src="../public/assets/images/infoblue.svg" />
            }
            if(item.c_approved == "E"){
                item.status = pendingText
                item.action = <div><img src="../public/assets/images/editRow.svg" className="hcursur" onClick={()=>this.editmtp(item.N_Month,item.N_Year)}/>&nbsp; <img src="../public/assets/images/delete.svg" onClick={()=>this.deleteData(item.N_Month,item.N_Year)}/></div>
               // item.action = <img src="../public/assets/images/infoblue.svg" />
            }
            if(item.c_approved == "0"){
                item.status = editText
                item.action = <div><img src="../public/assets/images/editRow.svg" className="hcursur" onClick={()=>this.editmtp(item.N_Month,item.N_Year)}/> &nbsp;<img src="../public/assets/images/delete.svg" onClick={()=>this.deleteData(item.N_Month,item.N_Year)}/></div>
               // item.action = <img src="../public/assets/images/infoblue.svg" />
            }
            if(item.c_approved == null){
                item.status = noText
                item.action = <div> <img src="../public/assets/images/editRow.svg" className="hcursur" onClick={()=>this.editmtp(item.N_Month,item.N_Year)}/>&nbsp; <img src="../public/assets/images/delete.svg" onClick={()=>this.deleteData(item.N_Month,item.N_Year)}/></div>
               // item.action = <img src="../public/assets/images/infoblue.svg" />
            }
            if(item.c_approved == "1"){
                item.status = submittext
                item.action = <div><img src="../public/assets/images/eye.svg" className="hcursur" onClick={()=>this.editmtp(item.N_Month,item.N_Year)}/> &nbsp;<img src="../public/assets/images/delete.svg" onClick={()=>this.deleteData(item.N_Month,item.N_Year)}/></div>
               // item.action = <img src="../public/assets/images/infoblue.svg" />
            }
            if(item.c_approved == "s" || item.c_approved == "S"){
                item.status = pendingText
                item.action = <div> <img src="../public/assets/images/eye.svg" className="hcursur" onClick={()=>this.editmtp(item.N_Month,item.N_Year)}/>&nbsp; <img src="../public/assets/images/delete.svg" onClick={()=>this.deleteData(item.N_Month,item.N_Year)}/></div>
               // item.action = <img src="../public/assets/images/infoblue.svg" />
            }

            // if(item.Lock_flag == "0"){
            //     item.action = <MainDrop deleteData={()=>this.deleteData(item.N_Month,item.N_Year)} />
            // }else{
            //     item.action = <span>Tp Locked</span>
            // }
           
        }):null

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
        return (
            <div className="mtpList">
                <MtpTable
                    tableHeader={header}
                    tableBody={this.props.myTp ? this.props.myTp: null}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    mtpDate={this.props.date}
                />
                {/* <TourPlan mtp="manager" /> */}
                <StatusPopup
                message={this.state.deletemsg}
                show={this.state.showdelete}
                onClose={this.hideDelete}
                success={this.state.success}
            />
             <ConfirmationBox 
                    show={this.state.deleteConfirm}
                    onClose={this.hideDeleteModal}
                    msg={this.state.deleteConfmMsg}
                    btnResponse={this.getBtnResponse}
            /> 
            </div>
        );
    }
}

export default withRouter(MtpList)