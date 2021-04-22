import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import Sfclistadmintable from './sfclistadmintable'
import {Link} from 'react-router-dom'
import Addexpensesadmin from './addexpenses'
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
import {withRouter} from 'react-router-dom'

class SfclistadminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          showaddexpense: false,
          isFull: false,
          adminList:[],
          expenseUsename:'',
          userDesg:'',
          sfcno:'',
          desig:'',
          desg:'',
          status:'',
          showSuccesModal:true,
          Errormsg:'',
          Error:false,
          selectedData:{},
          totalAmt:{},
          statusRes:{},
          SaveProducts:{},
          nopermission : ""
        }
        this.showAddexp = this.showAddexp.bind(this)
        this.hidecancelexp = this.hidecancelexp.bind(this)
        this.hidecancelexp1 = this.hidecancelexp1.bind(this)
        this.handleView = this.handleView.bind(this)
        this.saveData = this.saveData.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.getExpenseListData = this.getExpenseListData.bind(this)
        this.redirect = this.redirect.bind(this)
        this.deleteRequest = this.deleteRequest.bind(this)
      }
      componentDidMount(){
        var data={"Index":"sfclistadmin","Data":{"designation":"","status":""},"Token":""}
        postToServer("SFC",data).then( (Result)=>{
          if(Result.data.Status == 'Success'){
            if(!Result.data.Result[0]["Result"]){
              this.setState({ adminList:Result.data.Result })
            }
          //   let adminList =[]
          //   var status={}
          //  adminList = Result.data.Result
        //  console.log( Result.data.Result ,"soundarya1")
          // adminList.map((item) =>{ 
            
          //   status[item.SFCNo] = item.Status;
          // })
          // localStorage.setItem("sfcStatus",status);
            else{
              this.setState({nopermission : Result.data.Result[0]["Result"]})
            }
         
            
          }
          }).catch(  (Error)=> {  
              this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
           }  )


        var expense = {"Index":"Expence", "Token":""}
        //   postToServer("SFC",expense).then( (Result)=>{
        //   if(Result.data.Status == 'Success'){
        //   //console.log( Result.data.Result ,"soundarya1")
         
        //     this.setState({ expenseList:Result.data.Result })
         
        //   }
        //   }).catch(  (Error)=> {  
        //       this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
        //    }  )


         
      }
   
      showAddexp(data,desg,sfcno) {
        this.setState({
          showaddexpense: true,
          expenseUsename:data,
          userDesg:desg,
          sfcno:sfcno
        });
        this.getExpenseListData(sfcno)
      }
   
      hidecancelexp() {
        this.setState({
          showaddexpense: false,
        });
      }
   
      hidecancelexp1() {
        this.setState({
          showaddexpense: false,
        });
      }
      handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    getDesignation(desg,status){
      this.setState({
        desig:desg,
        status:status
      })
     
    }
   
   
    filterDesignation(desg,status){
      var data={"Index":"sfclistadmin","Data":{"designation":desg,"status":status},"Token":""}
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
        //console.log( Result.data.Result ,"soundarya1")
       
          this.setState({ adminList:Result.data.Result })
       
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
         }  )
    }
    saveData(sfcno,data){
     // console.log("daa",data)
      let stringval = ''
        {
            Object.keys(data).map((item, index) => {
                //console.log(data,this.state.finalvalues[data]["amt"],this.state.finalvalues[data]["amtdet"])

                stringval = stringval + item + "~" +data[item] + "#"

            })
        }

      // Object.keys(data).map((item) =>{

      // })
     var data={"Index":"SFC_EXP_SAVE",
              "Data":{"data":stringval,"sfcno":sfcno},
              "Token":""}
            postToServer("SFC",data).then( (Result)=>{
              if(Result.data.Status == 'Success'){
              //console.log( Result.data.Result ,"soundarya1")
             
                this.setState({
                  showSuccesModal:true,
                  Errormsg:Result.data.Result[0].Result,
                  showaddexpense:false,
                  Error:true
                })
               
              }
              }).catch(  (Error)=> {  
                  this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
                }  )
    }
    Errorclose(){
      this.setState({
        Error:false
      })
    }

    getExpenseListData(sfcno){
      var exp = {"Index":"SFC_EXP_View",
      "Data":{"sfcno":sfcno},"Token":""}
      postToServer("SFC",exp).then( (Result)=>{
        if(Result.data.Status == 'Success'){
        //console.log( Result.data.Result ,"soundarya1")
        let amountIds ={}
        let totalAmt ={}
        let SaveProducts ={}
        Result.data.Result.map((item) =>{
            if(item.Amount != 0.00){
            const id =  item.Code+"$"+item.Name+"$"+this.props.sfcno;
            amountIds[id] = item.Name
            totalAmt[item.Name] = item.Amount
            SaveProducts[item.Code] = item.Amount

         //   selectedData[id]= amountIds[id]
            }
        })
       
   
          this.setState({ expenseList:Result.data.Result ,selectedData :amountIds,totalAmt:totalAmt,SaveProducts:SaveProducts})
       
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
         }  )
    }
     
     
    redirect(data,sfcno){


      // alert(data)
     
      localStorage.setItem("sfcStatus", data)
      this.props.history.push('/sfcadminapprvrejct/'+sfcno)
    }
    deleteRequest(rowid,n_srno){
      var data={"Index":"SFC_Delete","Data":{ "rowid":rowid,"n_srno":n_srno}}
      postToServer("SFC",data).then( (Result)=>{
          if(Result.data.Status == 'Success'){
              this.setState({ Error: true, Errormsg: "Deleted Successfully" })
              this.componentDidMount();
          }}).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
      })
    }
      
      
   
   
render() {
  const header = [
    { prop: 'action', title: 'Action' ,filterable: true },
    { prop: 'SFCNo', title: 'Srno',  filterable: true,sortable: true},
    { prop: 'FSCode', title: 'Person Code',filterable: true },
    { prop: 'FSName', title: 'Person Name' ,sortable: true, filterable: true },
    { prop: 'Designation', title: 'Designation ' , sortable: true, filterable: true },
    // { prop: 'SFCNo', title: 'SFC No.' , filterable: true },
    { prop: 'SubmittedDate', title: 'Submitted Date' ,sortable: true, filterable: true },
    { prop: 'otherexp', title: 'Other Expenses' , sortable: true,filterable: true },
    { prop: 'Status', title: 'Status' , sortable: true,filterable: true },
    // { prop: 'Reason', title: 'Reason' , sortable: true,filterable: true },
    
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


//var activeText= <span className="activeTextGreenpending">Pending</span>
var rejectText=<span className="incomplete">Rejected</span>
//var partiallyActiveText = <span className="partiallyActiveTextYellowapproved">Approved</span>
// var addexpense =  

// this.state.adminList.map((item) => {

    
   // var partiallyActiveText = <span className="partiallyActiveTextYellowapproved">Approved</span>


  // if(this.state.adminList){
this.state.adminList.map((item) => { 
//  var activeText = <span className="activeTextGreenpending">Pending</span>
  var viewedit =    <img  src = "../public/assets/images/eye.svg" onClick={()=>this.redirect(item.Status,item.SFCNo)}/>  //<div> <Link to="./sfcadminapprvrejct"><img  src = "../public/assets/images/eye.svg" /> </Link></div>
  //<div> <Link to={"./sfcadminapprvrejct/"+item.SFCNo } ><img  src = "../public/assets/images/eye.svg" /> </Link></div>
var editdelete =   <img  src = "../public/assets/images/eye.svg" onClick={()=>this.redirect(item.Status,item.SFCNo)}/>  //<div> <Link to="./sfcadminapprvrejct"><img  src = "../public/assets/images/eye.svg" /> </Link></div>
// var partiallyActiveText = <span className="partiallyActiveTextYellowapproved">Confirmed</span>
// var addexpense =  
  localStorage.setItem("sfcUserName", item.FSName)
// var partiallyActiveText = <span className="partiallyActiveTextYellowapproved">Approved</span>
// var confirmActiveText = <span className="partiallyActiveTextYellowapproved">Confirmed</span>
var activeText= <span className="submittedTextBlue01">Pending</span>
var partiallyActiveText = <span className="complete">Partially Approved</span>
var Approved = <span className="complete">Approved</span>
var rejectedText = <span className="incomplete">Rejected</span>
var confirmText = <span className="complete">Confirmed</span>
// var addexpense =  

// if(this.state.adminList)
// this.state.adminList.map((item) => {

      item.action = <div >  {item.CanEdit == "0" ?
                        <img  src = "../public/assets/images/eye.svg" onClick={()=>this.redirect(item.Status,item.SFCNo)}/>: 
                        <span>  <img  src = "../public/assets/images/Group 895.png" onClick={()=>this.redirect(item.Status,item.SFCNo)}/>
    <img  src = "../public/assets/images/delete.png" className="deletebtn ml10" onClick={()=>this.deleteRequest(item.SlNo,item.SFCNo)}/></span> }
                    </div>
    


     
    // if(item.action == "editdelete"){
    //     item.action =  editdelete
    // }
    if(item.Status == "Pending" ){
      item.status1 = activeText
  }



    if(item.Status == "Partially Approved" ){
        item.status = partiallyActiveText
    }
    if(item.Status == "Approved" ){
        item.status = Approved
    }
     if(item.Status == "Confirmed" ){
        item.status = confirmText
    }
    if(item.Status == "Rejected" ){
     item.status = rejectedText
  }
    if(item.OtherExp == "1"){
        item.otherexp =   item.CanEdit == "1" ? <div>   <img  onClick={()=>this.showAddexp(item.FSName,item.Designation,item.SFCNo)} src="../public/assets/images/eye.svg"/></div> :
        <div>   <img  onClick={()=>this.showAddexp(item.FSName,item.Designation,item.SFCNo)} src="../public/assets/images/eye.svg"/></div>
    }
    else if(item.OtherExp == "0"){
      item.otherexp = <div><p>--</p></div>
    }
    if(item.personame !== " "){
        item.personame = <Link to="/"><span>{item.personame}</span></Link>
    }
    // if(item.Reason == ""){
    //   item.Reason1 = "-"
    // }else{
    //   item.Reason = item.Reason
    // }
    //if(item.Status == 'Pending'){ 
      // var status ={}
      // status[item.SFCNo] = item.Status
      //  localStorage.setItem("sfcStatus",status);
   // }
})


    return (
        <React.Fragment>
            <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>

            <div className="ongoing-orders-sfc">

            <div className="sfc-head">
                <div>
                    <h5 className="sfc-list-sec-head">
                     SFC List
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
            <div>
            {this.state.showaddexpense ?
              <Addexpensesadmin
                show={this.state.showaddexpense}
                // onHideconfirmation={this.hidecancelexp}
                onHidecancel={this.hidecancelexp1}
                onShoworderconfirm={this.showAddexp}
                expenseUsename={this.state.expenseUsename}
                userDesg={this.state.userDesg}
                data={this.state.expenseList}
                sfcno={this.state.sfcno}
                saveData={this.saveData}
                selectedData={this.state.selectedData}
                totalAmt={this.state.totalAmt}
                SaveProducts={this.state.SaveProducts}
                 />
              : null}
          </div>
          <div>
            {this.state.showSuccesModal == true ?
            <StatusPopup
            message={this.state.Errormsg}
            show={this.state.Error}
            onClose={this.Errorclose}
            success={true}
    />:null
            }
          </div>
                {!this.state.nopermission  ? 
                <Sfclistadmintable
                    tableHeader={header}
                    tableBody={this.state.adminList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    getDesignation={this.getDesignation.bind(this)}
                    filterDesignation={this.filterDesignation.bind(this)}
                    // getStatus={this.getStatus.bind(this)}
                
                />
                : <p className="sfc-list-sec-head">{this.state.nopermission}</p>}
                </div>
                </div>

        </React.Fragment>
    )
}

}
// export default SfclistadminPage;
export default withRouter(SfclistadminPage);

