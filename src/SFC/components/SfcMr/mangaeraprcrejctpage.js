import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import EditModel from './EditModel'
import Managerapprvrejectable from './manageraprvrejectable'
import Sfclistdelete from './sfclistdelete'
import Sfclistreject from './sfclistreject'
import SfclistApprove from './sfclistapprove'
//import SfceditDropdn from './sfceditdropdn'
import Form from 'react-bootstrap/Form'
import { postToServer } from '../../../lib/comm-utils'
import { withRouter } from "react-router";
import Drop from './../../../BasicComponet/DropDown'
import TEXT from './../../../BasicComponet/Text'
import StatusPopup from './../../../lib/StatusPopup'
// import StatusPopup from '../../../lib/StatusPopup'
import ExpenseModal from '../SfcMr/ExpenseModal'
class Managerapprvrejectpage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDelModal: false,
      showReject: false,
      showApprove: false,
      showeditDrop: false,
      isFull: false,
      edit:false,
      manageraprjt:[],
      Localsub:{},
      sfc_code:'',
      name:'',
      status:'',
      reason:'',body:[] , id:"",Messagetype:true,Error: false, Errormsg:''
     ,locationfrom:[],EditArray:{},Textval:{},delete_n_srno:'',
      delete_rowid:'',
      AreaType:{"100":"HQ","102":"OS","101":"EX"},
      travtype:{"1":"BUS","2":"By Air","3":"Cycle"},
      imageshow:true,
      EditKey:'',
      Editdata:{},
      SFCLOCKED:false,
      travedrop:true,
      setup_id:'',
     hidearea:false,
     showapprovalpopup : false,
      header :[
         { prop: 'action', title: 'Action' ,filterable: true },
         { prop: 'sinum', title: 'SI. No',  filterable: true},
         { prop: 'locationfrom', title: 'Location (From)',filterable: true },
         { prop: 'locationto', title: 'Location (To)' , filterable: true },
         { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
         { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
         { prop: 'mode', title: 'Mode of Travel' , filterable: true },
         { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
         { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
        ], customLabels : {
         first: "<<",
         last: ">>",
         prev: "< Prev",
         next: "Next >", 
         show: "Show",
         entries: "items/page",
         filterPlaceholder: "Search",
         noResults: "There is no data to be displayed"
       },
      reason:'',
      showSuccesModal:false
    }
      this.handleShowModal = this.handleShowModal.bind(this)
      this.handleCloseModal = this.handleCloseModal.bind(this)
      this.handleCloseModal1 = this.handleCloseModal1.bind(this)
      this.getshowModal = this.getshowModal.bind(this)
      this.gethidereject = this.gethidereject.bind(this)
      this.gethidereject1 = this.gethidereject1.bind(this)
      this.getshowApprove = this.getshowApprove.bind(this)
      this.gethideApprove = this.gethideApprove.bind(this)
      this.handleView = this.handleView.bind(this)
      this.editSet = this.editSet.bind(this)
      this.sendReason = this.sendReason.bind(this)
      this.selectedProduct=this.selectedProduct.bind(this)
      this.handleClose=this.handleClose.bind(this)
      this.onHide=this.onHide.bind(this)
      this.Errorclose=this.Errorclose.bind(this)
      this.selectedText=this.selectedText.bind(this)
      this.SaveEditSFC=this.SaveEditSFC.bind(this)
      this.getExpense = this.getExpense.bind(this)
      this.handleCloseExpense = this.handleCloseExpense.bind(this)
      this.loadvalidation=this.loadvalidation.bind(this)
      this.ModelHide=this.ModelHide.bind(this)
  }


  ModelHide(status,data){


    if (status=="ok"){
      this.setState({ EditKey:'',
    Editdata:{}})
    }

    if(status==true){
    this.setState({ EditKey:'',
    Editdata:{}})
    this.setState({ Error: true,Errormsg: data })
    this.componentDidMount()
    }

    if(status==false){
      this.setState({ Error: true,Errormsg: data })
    }
  
  }



  loadvalidation(){
    var data = {
      "Index":"SFC_Validation",
      "Data":{"sfcno":this.props.match.params.id},
      // "Token":""
    }
   


    postToServer("SFC", data).then((Result) => {


 
  
       if (Result.data.Status == 'Success') {
        const  travedrop=Result.data.trave

        if (travedrop=="1"){
          this.setState({travedrop:true })
        }else{
          this.setState({travedrop:false })
        }
        // if(Result.data.SetupId){
        
          // if (Result.data.SetupId==''){  
          // //  this.setState({ setup_id:'5',   SFCLOCKED:false }) 
          //  this.setState({  SFCLOCKED:true }) 
          // }else{
          //   this.setState({ setup_id:Result.data.SetupId,   SFCLOCKED:false }) 
          // }
        //}

   if(Result.data.AREA_display=="True"){

  this.setState({  hidearea: true })
 
   }else{

    this.setState({  hidearea: false })
   }
  }
})}

    deleteSFC(n_srno,rowid){
      var data={"Index":"SFC_DetailDelete","Data":{ "rowid":rowid,"n_srno":n_srno}}
      postToServer("SFC",data).then( (Result)=>{
          if(Result.data.Status == 'Success'){
              this.setState({ Error: true, Errormsg: Result.data.Result[0].Result })
              this.componentDidMount();
          }}).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
            })
    }
    selectedText(Id,values){
      let Textval=this.state.Textval

     // console.log(this.state.Textval)
      Textval[Id]=values
      this.setState({Textval:Textval})
    }
    handleClose() {
      this.setState({
          showModal: false
      })
    }
    Errorclose(){
      this.setState({
          showModal: false,Error:false
      })
    }
    onHide() {
      this.setState({
          showModal: false
      })
    }
    SaveEditSFC(a){
      let distance=''
      let from=''
      let to=''
      let areatype=''
      let Type=''
      if(this.state.Textval[a.sinum]){
        distance=this.state.Textval[a.sinum]
      }
      if(this.state.EditArray[a.sinum]){
        if(this.state.EditArray[a.sinum]["from"])
        {
         from=this.state.EditArray[a.sinum]["from"]
        }
        if(this.state.EditArray[a.sinum]["to"]){
        to=this.state.EditArray[a.sinum]["to"]
        }
        if(this.state.EditArray[a.sinum]["Area"]){
        areatype=this.state.EditArray[a.sinum]["Area"]
        }
        if(this.state.EditArray[a.sinum]["Type"]){
            Type=this.state.EditArray[a.sinum]["Type"]
        }
      }


      if(distance  ==  undefined  && distance.trim()  =='' ){
        distance=0
        this.setState({Textval:'0'})
      }
      var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
      if(distance.match(decimal)) {
        
      }else{
        decimal=0
        // this.setState({Textval:'0'})
        // return
      }
    var data={
        "index": "SFC_Save_Downline",
        "Data": {
          "travelmode":Type,
            "subarea_from":from,
            "subarea_to":to,
            "distance":distance,
            "rowid":a.Rowid,
            "areaType":areatype,
            "n_srno":a.N_srno},
    }
    postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
        let res='Saved SFC'
          if(Result.data.Result[0]["result"]){
              res=Result.data.Result[0]["result"]
              this.state.body.map((b)=>{
                if(a.sinum==b.sinum){
                  b.locationfrom=this.state.Localsub[from]
                  b.locationto=this.state.Localsub[to]
                  b.type= this.state.AreaType[areatype]
                  b.mode=this.state.travtype[Type]
                if(distance!=''){
                  b.distance= distance
                }
                b.action =  <div> <img id={b.sinum}  onClick={()=>{this.editSet(b.sinum)}}  src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp; <img  onClick={ ()=>{  this.handleShowModal(b.N_srno,b.Rowid)  } } className="deletebtn" src = "../public/assets/images/delete.png"/> </div>
                }
              })
              this.setState(
                this.state.body
              )
          }
          this.setState({ Error: true, Errormsg: res })
        }else{
            this.setState({ Messagetype:false,  Error: true, Errormsg: "Something wrong" })
        }
      })
      this.Errorclose = this.Errorclose.bind(this)
    }
    selectedProduct(id,type,name){
      let EditArray={}
      EditArray=this.state.EditArray
      if(EditArray[type]){ 
        let k={}
        k[name]=id
        EditArray[type][name]=id
      }else{
        EditArray[type]={}
        EditArray[type][name]=id
      }
      this.setState({EditArray:EditArray})
    }
    componentDidMount(){
      this.loadvalidation()
      const fsname = localStorage.getItem("fsname");
      const status = localStorage.getItem("fsstatus");
      const sfccode = this.props.match.params.id;
      let code= sfccode.split("SFC No -")
      let test = code[0].split(",")
      let t = test[0].split(",")
        this.setState({
          sfc_code:sfccode,
          sid:sfccode,
          status:status,
          // name:fsname,
          tophead:code[0]
        })
      var data = {
        "Index":"MyDownlineApprovalListAction",
        "Data":{"sfcno":sfccode},
        "Token":""
      }
      var Textval={}
        postToServer("SFC",data).then( (Result)=>{
          if(Result.data.Status == 'Success'){
            var body = []
            Result.data.Result.map((sfclisteditdata,index)=>{
              let item={}


              // if(index==1){

              //   if(sfclisteditdata["EditStatusCode"] != "NO"){
              //   this.setState({status:"NO"})
              // }else{
              //   this.setState({status:"Pending"})
              // }
              // }
              item["action"] =     sfclisteditdata["EditStatusCode"] == "1" ? 
                <div> 
                  <img id={item.sinum}  
                      // onClick={()=>{this.editSet(item.sinum,item,sfclisteditdata)}} 
                      onClick={() => { this.editSet(item.sinum, sfclisteditdata) }}
                      src = "../public/assets/images/Group 895.png" 
                    />   &nbsp; &nbsp; 
                  <img onClick={ ()=>{  this.handleShowModal(sfclisteditdata.N_Srno,sfclisteditdata.N_RowID)  } } 
                    className="deletebtn" 
                    src = "../public/assets/images/delete.png"
                    /> 
                </div>:<img src = "../public/assets/images/overflow.svg" /> 
                  item["sinum"]=index+1, 
                  item["locationfrom"]= sfclisteditdata.From,
                  item["locationto"]=sfclisteditdata.To,
                  item["type"]= sfclisteditdata.C_a_type, 
                  item["distance"]= sfclisteditdata.Distance, 
                  item["mode"]=sfclisteditdata.TravelMode,
                  item["ta"]= sfclisteditdata.TA, 
                  item["da"]=sfclisteditdata.da
                  item["N_srno"]=sfclisteditdata.N_Srno
                  item["N_Srno"]=sfclisteditdata.N_Srno
                  item["Rowid"]=sfclisteditdata.N_RowID
                  item["N_RowID"]=sfclisteditdata.N_RowID

                  Textval[item.sinum]=sfclisteditdata.da
                  body.push(item)
                })
             this.setState({ body: body , Textval:Textval, name:Result.data.Result[0].Name})
            }
            }).catch(  (Error)=> {
                this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
             }  )

             var approval={"Index":"ApprovedStatus",
             "Data":{"sfcno":sfccode},
             "Token":""
             }
             postToServer("SFC",approval).then( (Result)=>{
             if(Result.data.Status == 'Success'){
             //console.log( Result.data.Result ,"soundarya")
             this.setState({ adminApproveBy: Result.data.Result })
             }
             }).catch(  (Error)=> {  
             this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
             })
          }
    handleShowModal(n_srno,rowid) {
  //  console.log( n_srno,rowid,'okok')
      this.setState({
        showDelModal: true ,
        delete_n_srno:n_srno ,
        delete_rowid:rowid
      });
    }
    handleCloseModal() {
      this.setState({
        showDelModal: false,
      });
      this.deleteSFC(this.state.delete_n_srno,this.state.delete_rowid)
    }
    handleCloseModal1() {
      this.setState({
        showDelModal: false,
      });
    }
    getshowModal(action,reason) {
      var data={"Index":"SFC_Approvel","Data":{ "status":action,"sfcno":this.state.sid,"reason":reason},"Token":""}
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
          this.setState({ showReject:false,showSuccesModal:true,Errormsg:true,Error:true,Errormsg:Result.data.Result[0].Result})
      
      }
      }).catch(  (Error)=> {  
          this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
       }  )
    //}
  }

  gethidereject(){
    this.setState({
      showReject: false
    })
  }


  gethidereject1(){
    this.setState({
      showReject: false
    })
  }
  
  getshowApprove(action) {
    var data={"Index":"SFC_Approvel","Data":{ "status":action,"sfcno":this.state.sid,"reason":this.state.reason, "deletesubarea" : ""},"Token":""}
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
          this.setState({ showApprove:true, showapprovalpopup: true })
        }
      }).catch(  (Error)=> {  
          this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
       }  )
  }
  gethideApprove(){
    this.setState({
      showApprove: false
    })
    //this.props.history.push('/sfcmr')
  }
  handleView() {
    this.setState({
        isFull: !this.state.isFull
    });
  }
  editSet(e,dataval){
    this.setState({
      EditKey:e,Editdata:dataval
    })
  }
//   editSet(e,dataval,sfclisteditdata){ 
//      dataval["Distance"] =dataval["distance"]
//     // dataval["from_code"]=''
//     // dataval["To_code"]=''
//     // dataval["C_a_type"]=''
  
// console.log(e,dataval)
//     const _this=this
//     _this.setState({
//       EditKey:e,Editdata:dataval,sfclisteditdata:sfclisteditdata
//     })
  
//   }
  sendReason(action,data){ 
    this.setState({
      reason:data,
      // showReject:true
    })
    this.getshowModal("R",data)
    this.props.history.push('/sfcmr')
  }
  showPopup(){
    this.setState({
      
      showReject:true
    })
  }
  Errorclose(){
    this.setState({
      Error:false
    })
    //this.props.history.push('/sfcmr')
  }
  getExpense(){
    var exp = {"Index":"SFC_EXP_View",
    "Data":{"sfcno":this.props.match.params.id},"Token":""}
    postToServer("SFC",exp).then( (Result)=>{
      if(Result.data.Status == 'Success'){
        this.setState({ 
          expenseList:Result.data.Result,
          expenseModal:true
        })
      }
    }).catch(  (Error)=> {  
          this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
    })
  }
  handleCloseExpense(){
    this.setState({
      expenseModal:!this.state.expenseModal
    })
  }
  componentDidUpdate(oldprop,oldstate){
    if(oldprop.reload != this.props.reload){
      this.componentDidMount()
    }


    //SFCLOCKED



    if(oldprop.SFCLOCKED != this.props.SFCLOCKED){
      if (this.props.travedrop==true){
     this.setState({

      header :  this.props.SFCLOCKED==false?  [
          {prop: 'action', title: 'Action' ,filterable: true } ,
          { prop: 'sinum', title: 'SI. No',  filterable: true},
          { prop: 'locationfrom', title: 'Location (From)',filterable: true },
          { prop: 'locationto', title: 'Location (To)' , filterable: true },
          { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
          { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
          { prop: 'mode', title: 'Mode of Travel' , filterable: true },
          { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
          { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
          ] :  [  { prop: 'sinum', title: 'SI. No',  filterable: true},
          { prop: 'locationfrom', title: 'Location (From)',filterable: true },
          { prop: 'locationto', title: 'Location (To)' , filterable: true },
          { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
          { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
          { prop: 'mode', title: 'Mode of Travel' , filterable: true },
          { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
          { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
          ] 
        



     })
    }else{

      this.setState({

        header :  this.props.SFCLOCKED==false?  [
          {    prop: 'action', title: 'Action' ,filterable: true } ,
            { prop: 'sinum', title: 'SI. No',  filterable: true},
            { prop: 'locationfrom', title: 'Location (From)',filterable: true },
            { prop: 'locationto', title: 'Location (To)' , filterable: true },
            { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
            { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
         //   { prop: 'mode', title: 'Mode of Travel' , filterable: true },
            { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
            { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
            ] :  [  { prop: 'sinum', title: 'SI. No',  filterable: true},
            { prop: 'locationfrom', title: 'Location (From)',filterable: true },
            { prop: 'locationto', title: 'Location (To)' , filterable: true },
            { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
            { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
           // { prop: 'mode', title: 'Mode of Travel' , filterable: true },
            { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
            { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
            ] 
          
  
  
  
       })



    }
    }
  }
  render() {
    let approvedBy
    let ApproveDate
    if(this.state.adminApproveBy){
      this.state.adminApproveBy.map((item) => { 
        approvedBy=item.Approver
        ApproveDate=item.ApproveDate
      })
    }
    const header = [
      { prop: 'action', title: 'Action', filterable: true },
      { prop: 'sinum', title: 'SI. No', filterable: true },
      { prop: 'locationfrom', title: 'Location (From)', filterable: true },
      { prop: 'locationto', title: 'Location (To)', filterable: true },
      { prop: 'type', title: 'Type ', sortable: true, filterable: true },
      { prop: 'distance', title: 'Distance (Kms)', filterable: true },
      { prop: 'mode', title: 'Mode of Travel', filterable: true },
      { prop: 'ta', title: 'TA (in Rupees)', filterable: true },
      { prop: 'da', title: 'DA (in Rupees)', filterable: true },
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


   
  return (
    <React.Fragment>

{this.state.EditKey !='' ?
        <EditModel     setup_id={this.state.setup_id}  hidearea={this.state.hidearea}  travedrop={this.state.travedrop}  Editdata={this.state.Editdata}  EditKey={ this.state.EditKey}  onClose={this.ModelHide} data={this.state.imaggedata} success={this.state.msgshow} message={this.state.errmsg} show={this.state.imageshow} sfclisteditdata={this.state.sfclisteditdata}  n_srno={this.props.match.params.id} EditArray={this.props.EditArray}/>
        :null
        
        }
      <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
      <div className="ongoing-orders-sfc">
      <div className="sfc-head-edit">
        <div>
            <h5 className="sfc-list-sec-head">
             {/* {this.state.sfc_code} */}
             <span>{this.state.name}</span>
             <span>,</span>&nbsp;
            <span>Srno.{this.state.sid}</span>
            </h5>
        </div>
        <div className="sfc-head-edit-options">
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
        {this.state.showDelModal ?
          <Sfclistdelete
            show={this.state.showDelModal}
            onHideconfirmation={this.handleCloseModal}
            onHidecancel={this.handleCloseModal1}
            onShoworderconfirm={this.handleShowModal} />
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
      <div>
        {this.state.showReject ?
        <Sfclistreject
          show={this.state.showReject}
      //  onHiderej={this.gethidereject}
          onHidecancel={this.gethidereject1}
          sendReason={this.sendReason}
        />
      : null}
      </div>
      <div>
        {this.state.showApprove ?
          <SfclistApprove
            show={this.state.showApprove}
            onHide={this.gethideApprove}
            sId={this.state.sid}
            sName={this.state.name}
            adminApproveBy={approvedBy}
            showapprovalpopup = {this.state.showapprovalpopup}
          />
        : null}
      </div>
      <ExpenseModal 
        show={this.state.expenseModal} data={this.state.expenseList}
        closeModal={this.handleCloseExpense}
      />
      <Managerapprvrejectable
        tableHeader={header}
        tableBody={this.state.body}
        keyName="userTable"
        tableClass="striped hover table-responsive"
        rowsPerPage={10}
        rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
        initialSort={{ prop: "username", isAscending: true, }}
        labels={customLabels}
        showRejectmodal={this.showPopup.bind(this)}
        showApprovemodal={this.getshowApprove}
        sfcStatus={this.state.status}
        getExpense ={this.getExpense}
        adminApproveBy={approvedBy}
        adminApproveDate={ApproveDate}
      />
      </div>
    </div>
  
    <StatusPopup
        message={this.state.Errormsg}
        show={this.state.Error}
        onClose={this.Errorclose}
        success={this.state.Messagetype}
    />
    </React.Fragment>
    )
  }
}

export default  withRouter(Managerapprvrejectpage);


