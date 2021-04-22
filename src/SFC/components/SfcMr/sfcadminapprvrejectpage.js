import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import Sfcadminapprvrejectable from './sfcadminapprvrejectable'
import Sfclistdelete from './sfclistdelete'
import Sfclistreject from './sfclistreject'
import SfclistApprove from './sfclistapprove'
import Form from 'react-bootstrap/Form'
// import SfcadmindropEdit from './sfcadmindropdnedit'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import TEXT from './../../../BasicComponet/Text'
import { withRouter } from "react-router";
import StatusPopup from '../../../lib/StatusPopup'
import ExpenseModal from '../SfcMr/ExpenseModal'
import EditModel from './EditModel'
class Sfcadminapprvrejectpage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDelModal: false,
      showReject: false,
      showApprove: false,
      showeditDrop: false,
      isFull: false,
      editlist:false,
      adminaprvrjt:[],
      id:"",Messagetype:true,Error: false, Errormsg:'',
      body:[],locationfrom:[],EditArray:{},Textval:{}, delete_n_srno:'',
      delete_rowid:'',
      sfcno:'',
      adminApproveBy:[],
      showSuccesModal:true,
      userName:'',
      sfcStatus:'',
      expenseList:[],
      expenseModal:false,
      travedrop:'',
      setup_id:'',
      SFCLOCKED:false,
      imageshow:true,
      EditKey:'',
      Editdata:{},
    }

    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleCloseModal1 = this.handleCloseModal1.bind(this)
    this.getshowModal = this.getshowModal.bind(this)
    this.gethidereject = this.gethidereject.bind(this)
    this.gethidereject1 = this.gethidereject1.bind(this)
    this.getshowApprove = this.getshowApprove.bind(this)
    this.gethideApprove = this.gethideApprove.bind(this)
    this.getshoweditdrop = this.getshoweditdrop.bind(this)
    this.handleView = this.handleView.bind(this)
    this.editlistSet = this.editlistSet.bind(this)
    this.editSet = this.editSet.bind(this)
    this.selectedProduct=this.selectedProduct.bind(this)
    this.selectedText=this.selectedText.bind(this)
    this.SaveEditSFC=this.SaveEditSFC.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.onHide=this.onHide.bind(this)
    this.Errorclose=this.Errorclose.bind(this)
    this.deleteSFC=this.deleteSFC.bind(this)
    this.sendReason= this.sendReason.bind(this)
    this.getExpense = this.getExpense.bind(this)
    this.handleCloseExpense = this.handleCloseExpense.bind(this)
    this.loadsfcvalidaton=this.loadsfcvalidaton.bind(this)

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

  loadsfcvalidaton(){
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
        
          if (Result.data.SetupId==''){  
            //this.setState({ setup_id:'5',   SFCLOCKED:false }) 
          this.setState({  SFCLOCKED:true }) 
          }else{
            this.setState({ setup_id:Result.data.SetupId,   SFCLOCKED:false }) 
          }
        //}

   if(Result.data.AREA_display=="True"){

  this.setState({  hidearea: true })
  // this.Get_area();
   }else{

    this.setState({  hidearea: false })
   }

         


       } }).catch( (Error)=> { 
      })



  }

//   deleteSFC(n_srno,rowid){
//     var data={"Index":"SFC_DetailDelete","Data":{ "rowid":rowid,"n_srno":n_srno}}
//   // componentDidMount(){
//   //   var sfcno = this.props.match.params.id
//   //   this.setState({
//   //     sfcno:sfcno
//   //   })
//   //   var data={
//   //       "Index":"SFC_detail"
//   //   }
//     postToServer("SFC",data).then( (Result)=>{
//         if(Result.data.Status == 'Success'){
//             this.setState({ Error: true, Errormsg: "Delete Successfully" })
//             this.componentDidMount();
//         }}).catch((Error) => {
//             this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
//           })
// }

    handleClose() {
      this.setState({
          showModal: false})
      
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
    selectedText(Id,values){
      let Textval=this.state.Textval
      Textval[Id]=values
      this.setState({Textval:Textval})
    }
    deleteSFC(n_srno,rowid){
      var data={"Index":"SFC_DetailDelete","Data":{ "rowid":rowid,"n_srno":n_srno}}
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
          if( Result.data.Result[0]){
            if( Result.data.Result[0]["Result"]){
              const msg= Result.data.Result[0]["Result"]
                this.setState({ Error: true, Errormsg: msg })
              }else{
                this.setState({ Error: true, Errormsg: "successfully Deleted" }) 
              }
          }else{
            this.setState({ Error: true, Errormsg: "successfully Deleted" }) 
          }
          this.componentDidMount();
        }}).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
          })
    }
    SaveEditSFC(a){
  //   console.log(a,'kunal sinha')
      let distance=''
      let from=''
      let to=''
      let areatype=''
      let Type=''
      if(this.state.Textval[a.sinum]){
        distance=this.state.Textval[a.sinum]
      }
      if(distance  ==  undefined  && distance.trim()  =='' ){
        distance=0
        this.setState({Textval:'0'})
      }
      var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
      if(distance.match(decimal)) {
        
      }else{
        distance=0
        // this.setState({Textval:'0'})
        // return
      }
      
      if(this.state.EditArray[a.sinum]){
        if(this.state.EditArray[a.sinum]["from"]){
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



      if(from =='' || form=='-1'){
      
      
        this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter from" })
        return
      }
      if( to=="" || to =='-1'){
       
        this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter To" })
        return
      }

      if( areatype =="" || areatype=='-1'){
       
        this.setState({ Messagetype:false,  Error: true, Errormsg: "Please  Select Area Type" })
        return
      }







    var data={
      "index": "SFC_Save",
      "Data": {
          "travelmode":Type,
          "subarea_from":from,
          "subarea_to":to,
          "distance":distance,
          "rowid":a.Rowid,
          "areaType":areatype,
          "n_srno":a.N_srno},
      "Index":"SFC_detail",
      "Data":{"sfcno": this.props.match.params.id},
    }
    postToServer("SFC",data).then( (Result)=>{
      if(Result.data.Status == 'Success'){
        let res='Saved SFC'
          if(Result.data.Result[0]["result"]){
              res=Result.data.Result[0]["result"]
              this.state.body.map((b)=>{
                if(a.sinum==b.sinum){
                  b.locationfrom=from
                  b.locationto=to
                  b.type= areatype
                  b.mode=Type==''?b.mode:Type
                  b.distance= distance==''?b.distance:distance
                  b.action =  <div> <img id={b.sinum}  onClick={()=>{this.editSet(b.sinum)}}  src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp; <img  onClick={ ()=>{  this.handleShowModal(b.N_Srno,b.N_RowID)  } } className="deletebtn" src = "../public/assets/images/delete.png"/> </div>
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
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
     }  )
    // var approval={"Index":"ApprovedStatus",
    //               "Data":{"sfcno": this.props.match.params.id},
    //               "Token":""
    //             }
    // postToServer("SFC",approval).then( (Result)=>{
    //   if(Result.data.Status == 'Success'){
    //   //console.log( Result.data.Result ,"soundarya")
    //       this.setState({ adminApproveBy: Result.data.Result })
    //   }
    //   }).catch(  (Error)=> {  
    //       this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
    //     }  )
    }
    editSet(e,dataval){
      this.setState({
        EditKey:e,Editdata:dataval
      })

    //   var data={"index":"getSubarea"  ,"Data": {
    //     "area": ''
    //   },  }
    //   let locationfrom=[]
    //   locationfrom.push({key: -1,
    //     text: "--Please Select--",
    //     value: "-1",
    //   })
    //   postToServer("SFC",data).then( (Result)=>{
    //     const cv=Result["data"]["Result"]
    //       cv.map((a)=>{  
    //       let M={}
    //       M={
    //         key: a["C_Code"],
    //         text: a["C_Name"],
    //         value: a["C_Code"],
    //       }
    //       locationfrom.push(M)
    //       })
    //     this.setState({ locationfrom:locationfrom })
    //   })
    //    let travel=[]
    //     travel.push({
    //       "key": '-1',
    //       "text": '--Please Select--',
    //       "value": '-1',
    //     })
    //   var travelModes = { "index": "TravelMode" ,data:{  "distance":'0' }}
    //   postToServer("SFC", travelModes).then((Result) => {
    //   if (Result.data.Status == 'Success') {
    //     Result.data.Result.map((item) => { 
    //       travel.push({
    //         "key": item.n_id,
    //         "text": item.c_name,
    //         "value": item.n_id,
    //       })
    //     })
    //   }
    //   }).catch((Error) => {
    //   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    // })
    // let Aretype = [
    //  {key: -1,
    //      text: "--Please Select--",
    //      value: "-1",
    //      },
    //  {
    //  key: 'HQ',
    //  text: 'HQ',
    //  value: '100',
    //  },
    //  {
    //  key: 'OS',
    //  text: 'OS',
    //  value: '102',
    //  },
    //  {
    //      key: 'EX',
    //      text: 'Ex',
    //      value: '101',
    //      },
    // ]
    // let  item={}
    // let Textval={}
    // this.state.body.map((a)=>{
    //   if(a.sinum==e){
    //     let from= <div className="editDropdown"><Drop  name={"from"} Type={a.sinum}  Selected={-1}  selectedProduct={this.selectedProduct} data={locationfrom} ></Drop> </div>
    //     let to= <div className="editDropdown"><Drop  name={"to"} Type={a.sinum}  Selected={-1}  selectedProduct={this.selectedProduct} data={locationfrom} ></Drop> </div>
    //     let Type=  <div className="editDropdown"> <Drop  name={"Type"} Type={a.sinum}  Selected={-1}  selectedProduct={this.selectedProduct} data={travel} ></Drop> </div>
    //     let TypeL=   <div className="editDropdown typedrop"><Drop   name={"Area"} Type={a.sinum}  Selected={-1} selectedProduct={this.selectedProduct} data={Aretype} ></Drop> </div>
    //     a.locationfrom=from
    //     a.locationto=to
    //     a.type= TypeL
    //     a.mode=Type
    //     //a.da=<input  value={a.da}  />
    //     this.state.Textval[a.sinum]=a.da
    //     // a.distance= <TEXT  selectedText={this.selectedText} id={a.sinum}  Textval={  this.state.Textval[a.sinum]  } /> 
    //     a.distance= <TEXT  selectedText={this.selectedText} id={a.sinum}  Textval="0.00" /> 
    //     //<Form.Control type="text"  onChange={  (Event)=>{ this.textch(Event,a.sinum) } } value={this.state.Textval[a.sinum] } className="customized-input inputBox" placeholder="Enter Here" />
    //     //a.ta=<input  value={a.ta}  />
    //     a.action = <div> <img   onClick={  ()=>{this.SaveEditSFC(a)}  } src = "../public/assets/images/checked.svg" />  &nbsp; &nbsp; <img  onClick={ ()=>{  this.handleShowModal(a.N_srno,a.Rowid)  } } className="deletebtn" src="../public/assets/images/delete.png" /></div>
    //   }
    // })
    // this.setState(
    //   this.state.body
    // )
    // this.setState({
    //   Textval:Textval
    // })
    }
    componentDidMount(){
    
      var sfcno = this.props.match.params.id
      this.loadsfcvalidaton()
      const sfcStatus = localStorage.getItem("sfcStatus");
      const userName= localStorage.getItem("sfcUserName");
      var sfcno = this.props.match.params.id
      this.setState({
        sfcno:sfcno,
        // userName:userName,
        sfcStatus:sfcStatus
      })
    var data={"Index":"MyDownlineApprovalListAction","Data":{"sfcno":this.props.n_srno}}
    postToServer("SFC",data).then( (Result)=>{
      if(Result.data.Status == 'Success'){
      var body = []
      Result.data.Result.map((sfclisteditdata,index)=>{
      let item={}
      item["action"] = <div>
      {sfcStatus == "Confirmed" || sfcStatus == "Rejected" ? 
      <div>
        <img id={item.sinum} 
            src = "../public/assets/images/eye.svg" />   
      </div>:
        sfclisteditdata["EditStatusCode"] == "0" ? 
        <div>
          <img src="../public/assets/images/overflow.svg" />
        </div> : 
        <div>
          <img id={item.sinum}
            onClick={() => { this.editSet(item.sinum, sfclisteditdata) }}
            src="../public/assets/images/Group 895.png" />   &nbsp; &nbsp;
            <img
              onClick={() => { this.handleShowModal(sfclisteditdata.N_Srno, sfclisteditdata.N_RowID) }}
              className="deletebtn"
              src="../public/assets/images/delete.png"
        /></div>}
      </div>
      //item["action"]= 
      item["sinum"]=index+1, 
      item["locationfrom"]= sfclisteditdata.From,
      item["locationto"]=sfclisteditdata.To,
      item["type"]= sfclisteditdata.C_a_type, 
      item["estimatedist"]= sfclisteditdata.Distance, 
      item["TravelMode"]=sfclisteditdata.TravelMode,
      item["ta"]= sfclisteditdata.TA, 
      item["da"]=sfclisteditdata.da
      item["N_srno"]=sfclisteditdata.sfcno
      item["Rowid"]=sfclisteditdata.slno
      // console.log(sfclisteditdata, "soun")
      body.push(item)
    })
    this.setState({ body: body, userName:Result.data.Result[0].Name })
    }}).catch(  (Error)=> {
      this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
   }  )
    var approval={"Index":"ApprovedStatus",
    "Data":{"sfcno":sfcno},
   
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
      this.setState({
        showDelModal: true,
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
    getshowModal(data) {
      this.setState({
        showReject: true,
        reason:data
      })
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
    getshowApprove(action,reason) {



       if (action=="C"){

        var data={"Index":"SFCconfirmed","Data":{ "status":action,"sfcno": this.props.match.params.id,"reason":reason, "deletesubarea" : ""},"Token":""}
        postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
          this.setState({ showApprove:!this.state.showApprove})
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
         })
        

       }else{
      var data={"Index":"SFC_Confirmed","Data":{ "status":action,"sfcno": this.props.match.params.id,"reason":reason},"Token":""}
      postToServer("SFC",data).then( (Result)=>{
      if(Result.data.Status == 'Success'){
        this.setState({ showApprove:!this.state.showApprove})
      }
      }).catch(  (Error)=> {  
          this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
       })
      }
    }
    gethideApprove(){
      this.setState({
        showApprove: false
      })
      this.props.history.push('sfcadminlist')
    }
    getshoweditdrop(){
      this.setState({
        showeditDrop:true
      })
    }
    handleView() {
      this.setState({
          isFull: !this.state.isFull
      });
    }
    editlistSet(e){
      this.setState({
        editlist: !this.state.editlist,
        id:e.target.id
      })
    }
    sendReason(action,reason){
      this.rejectionRequest("R",reason)
    }
    rejectionRequest(action,reason){
      var data={"Index":"SFC_Confirmed","Data":{ "status":action,"sfcno": this.props.match.params.id,"reason":reason},"Token":""}
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
          this.setState({ showReject:false,showSuccesModal:true,Errormsg:true,Error:true,Errormsg:Result.data.Result[0].Result})
        }
      }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
     })
    }
    Errorclose(){
      this.setState({
        Error:false
      })
      //this.props.history.push('/sfclistadmin')
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
              { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
              { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
              ] :  [  { prop: 'sinum', title: 'SI. No',  filterable: true},
              { prop: 'locationfrom', title: 'Location (From)',filterable: true },
              { prop: 'locationto', title: 'Location (To)' , filterable: true },
              { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
              { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
              { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
              { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
              ]     
         })
      }
      }
    }
  render() {

    var body = []
    this.state.adminaprvrjt.map((adminaprvrjtdata,index)=>{
        body.push({action: 'editdelete', 
        sinum: index+1, 
        locationfrom: adminaprvrjtdata.From,
        locationto: adminaprvrjtdata.To,
         type:  adminaprvrjtdata.C_a_type,
         distance: adminaprvrjtdata.Distance,
          estimatedist:  adminaprvrjtdata.Distance,
           mode: adminaprvrjtdata.TravelMode,
            ta:  adminaprvrjtdata.TA,  
            da: adminaprvrjtdata.da, 
            oe: '100', })
         
    })


    const header = [
      { prop: 'action', title: 'Action', filterable: true },
      { prop: 'sinum', title: 'SI. No', filterable: true },
      { prop: 'locationfrom', title: 'Location (From)', filterable: true },
      { prop: 'locationto', title: 'Location (To)', filterable: true },
      { prop: 'type', title: 'Type ', sortable: true, filterable: true },
      // { prop: 'distance', title: 'Distance by Google (Kms)', filterable: true },
      { prop: 'estimatedist', title: 'Estimated Distance (Kms)', filterable: true},
      { prop: 'TravelMode', title: 'Mode of Travel', filterable: true },
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

    // var editdelete = <div> <img onClick={this.getshoweditdrop} src="../public/assets/images/Group 895.png" />   &nbsp; &nbsp; <img onClick={this.handleShowModal} className="deletebtn" src="../public/assets/images/delete.png" />
    // </div>
   
  //  var locationfrom = <div><SfcadmindropEdit/> </div>

    var rightchecksave = <div> <img onClick={this.editlistSet} src = "../public/assets/images/checked.svg" />  &nbsp; &nbsp; <img onClick={this.handleShowModal} className="deletebtn" src="../public/assets/images/delete.png" /></div>
    
        var distance = <div> <Form className="ghh">
        <Form.Group className="formdrpeditdistance" >
          <Form.Control className="formeditdistance"/>
          {/* <img src="../public/assets/images/gps..png"/> */}
        </Form.Group>
        </Form></div>

      //   var distance = <div className="form-order">
      //   <InputGroup className="formgrp-no" controlid="formBasicEmail">
      //     <Form.Control  className="placeholder-order-no" />  
      //     <InputGroup.Append>
      //     <Button className="outline-secondary">send?</Button>
      //     </InputGroup.Append>
      //   </InputGroup>
      // </div>

        var ta = <div> <Form className="ghh">
          <Form.Group className="formdrpeditdistance" >
          <Form.Control  className="formeditdistance"/>
          </Form.Group>
          </Form></div>

        var da = <div> <Form className="ghh">
        <Form.Group className="formdrpeditdistance" >
        <Form.Control  className="formeditdistance"/>
        </Form.Group>
        </Form></div>

        var oe = <div> <Form className="ghh">
        <Form.Group className="formdrpeditdistance" >
        <Form.Control  className="formeditdistance"/>
        </Form.Group>
        </Form></div>

        var estimatedist = <div> <Form className="ghh">
        <Form.Group className="formdrpeditdistance" >
        <Form.Control  className="formeditdistance"/>
        </Form.Group>
        </Form></div>

 

    body.map((item) =>{
      if (item.action == "editdelete") {
        item.action =<div>
                      {sfclisteditdata["EditStatusCode"] == "1"  ? 
                        <div> 
                          <img id={item.sinum} onClick={this.editlistSet} src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp; <img  onClick={this.handleShowModal} className="deletebtn" src = "../public/assets/images/delete.png"/> 
                        </div>
                      :
                        <div>
                          <img src="../public/assets/images/overflow.svg" /></div>}
                        </div> 
                      }

      if (this.state.editlist == true ){
      if(item.sinum == this.state.id){
        item.locationfrom = locationfrom
        item.locationto = locationfrom
        item.type = locationfrom
        item.mode = locationfrom
        item.action = rightchecksave
        item.distance = distance
        item.ta = ta
        item.da = da
        item.oe = oe
        item.estimatedist = estimatedist
      }
    }
    })
    let approvedBy
    let ApproveDate
    let ConfirmedDate
    let Confirmer
    if(this.state.adminApproveBy){
      this.state.adminApproveBy.map((item) => { 
        approvedBy=item.Approver
        ApproveDate=item.ApproveDate
        ConfirmedDate = item.ConfirmedDate
        Confirmer = item.Confirmer
      })
    }
    

    return (
      <React.Fragment>
            <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>

        <div className="ongoing-orders-sfc">
        <div className="sfc-head">
                <div>
                    <h5 className="sfc-list-sec-head">
                   Srno - { this.props.match.params.id}
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
            {this.state.showDelModal ?
              <Sfclistdelete
                show={this.state.showDelModal}
                onHideconfirmation={this.handleCloseModal}
                onHidecancel={this.handleCloseModal1}
                onShoworderconfirm={this.handleShowModal} />
              : null}
          </div>
          <div>
            {this.state.showReject ?
            <Sfclistreject
              show={this.state.showReject}
              // onHiderej={this.gethidereject}
              onHidecancel={this.gethidereject1}
              sendReason={this.sendReason}
            />
            : null}
          </div>
          <div>
            {this.state.showApprove   ?
              <SfclistApprove
                show={this.state.showApprove}
                onHide={this.gethideApprove}
                sId={ this.props.match.params.id}
                sName={this.state.userName}
                adminApproveBy={approvedBy}
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
         
          <ExpenseModal 
            show={this.state.expenseModal} data={this.state.expenseList}
            closeModal={this.handleCloseExpense}
            />
          
          

          <Sfcadminapprvrejectable
            tableHeader={header}
            tableBody={this.state.body}
            keyName="userTable"
            tableClass="striped hover table-responsive"
            rowsPerPage={10}
            rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
            initialSort={{ prop: "username", isAscending: true, }}
            labels={customLabels}
            showRejectmodal={this.getshowModal}
            showApprovemodal={this.getshowApprove}
            adminApproveBy={approvedBy}
            adminApproveDate={ApproveDate}
            sfcStatus={this.state.sfcStatus}
            getExpense={this.getExpense}
            ConfirmedDate={ConfirmedDate}
            Confirmer={Confirmer}
          />



        </div>
        </div>

        {this.state.EditKey !='' ?
        <EditModel     setup_id={this.state.setup_id}  hidearea={this.state.hidearea}  travedrop={this.state.travedrop}  Editdata={this.state.Editdata}  EditKey={ this.state.EditKey}  onClose={this.ModelHide} data={this.state.imaggedata} success={this.state.msgshow} message={this.state.errmsg} show={this.state.imageshow} n_srno={this.props.match.params.id}/>
        :null}
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

export default withRouter(Sfcadminapprvrejectpage);


