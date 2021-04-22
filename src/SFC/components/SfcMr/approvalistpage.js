import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import { Link } from "react-router-dom";
import Sfcapprovaltable from './approvalistable'
import { withRouter } from "react-router";

class Sfcapprovalpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
        }
        this.handleView = this.handleView.bind(this)
        this.getData = this.getData.bind(this)
        this.redirectPage = this.redirectPage.bind(this)
    }

    handleView() {
        this.setState({
            isFull: !this.state.isFull
     });
    }
    getData(code,status,name){
        localStorage.setItem("fsname",name)
        localStorage.setItem("fsstatus",status)

        // alert(status)
        this.props.history.push('./managerapprvreject/'+code)
    }

    redirectPage(Status,SFCNo){
        localStorage.setItem('status',Status)
        this.setState({
            sfcStatus:Status
        })
        this.props.history.push('./sfclistedit/'+SFCNo)
      }
      
render() {
  const header = [
    { prop: 'Action1', title: 'Action' ,filterable: true },
    { prop: 'SFCNo', title: 'Srno',  filterable: true, sortable: true},
    { prop: 'FSCode', title: 'FSCode',  filterable: true},
    { prop: 'FSName', title: 'FSName', sortable: true, filterable: true},
    // { prop: 'SFCNo', title: 'SFC No.',filterable: true },
    { prop: 'SubmittedDate', title: 'Submitted Date' ,sortable: true, filterable: true },
    { prop: 'Status1', title: 'Status' , sortable: true, filterable: true },
    // { prop: 'Reason1', title: 'Reason' , sortable: true, filterable: true },
    { prop: 'Leader', title: 'Approved By' , sortable: true, filterable: true },
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

var activeText= <span className="submittedTextBlue01">Pending</span>
var partiallyActiveText = <span className="complete">Approved</span>

var Partially  = <span className="complete">Partially Approved</span>
var rejectedText = <span className="incomplete">Rejected</span>
var confirmText = <span className="complete">Confirmed</span>
var editdelete =  <Link to="./sfclistedit"> <img  src = "../public/assets/images/eye.svg" /> </Link>
var viewdelete = 

this.props.data.map((item) => { 
    
    if(item.Status == "Pending" ){
        item.Status1 = activeText
    }


    if(item.Status == "Partially Approved" ){
        item.Status1 = Partially
    }
    if(item.Status == "Approved" ){
        item.Status1 = partiallyActiveText
    }   
    if(item.Status == "Rejected"){
        item.Status1 = rejectedText
    }
    if(item.Status == "Confirmed"){
        item.Status1 = confirmText
    }
    if(item.action == "editdelete"){
        item.action =  editdelete
    }

    if(item.CanEdit ==  "1" ){
        // item.Action1 =  <Link to={"./managerapprvreject/"+item.SFCNo}> <img  src = "../public/assets/images/eye.svg" /> </Link>
       item.Action1 =  <img  src = "../public/assets/images/Group 895.png"  onClick={()=>this.getData(item.SFCNo,item.Status,item.FSName)} />
           // { //  item.Status == 'Pending' ? 
                               
                                // :
                               // <img  src = "../public/assets/images/eye.svg"  onClick={()=>this.getData(item.SFCNo,item.Status,item.FSName)} /> }
                        // </div>
    }else{
        item.Action1 = <img  src = "../public/assets/images/eye.svg"  onClick={()=>this.redirectPage(item.Status,item.SFCNo)} />
    }
    if(item.Reason == ""){
        item.Reason1 = "-"
    }else{
        item.Reason1 = item.Reason
    }
    
    if(item.fsname !== ""){
        item.fsname = <Link to="/"><span>{item.fsname}</span></Link>
    }
    
})

    return (
        <React.Fragment>
             
             <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
              <div div className="ongoing-orders-sfc">

              <div className="sfc-head">
                <div>
                    <h5 className="sfc-list-sec-head">
                    My Downline Approval List
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
                  <Sfcapprovaltable  
                   tableHeader={header}
                    tableBody={this.props.data}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}/>  
             </div>
             </div>

            
              
        </React.Fragment>
    )
}
}

export default withRouter(Sfcapprovalpage);


