import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import Sfchartable from './sfcchartable'
import MrsubmitChart from './mrsubmitchart'
import Sfclistdelete from './sfclistdelete'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import TEXT from './../../../BasicComponet/Text'
import StatusPopup from './../../../lib/StatusPopup'
import EditModel from './EditModel'
// import { defaultButtonList } from "sweetalert/typings/modules/options/buttons";
class Newsfchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showsubmit: false,
      showDelModal: false,
      delete_n_srno:'',
      delete_rowid:'',
      isFull: false,
      AreaType:{"100":"HQ","102":"OS","101":"EX"},
      sfclistdetail:[],Messagetype:true,Error: false, Errormsg:'',showModal:false,
      body:[],locationfrom:[],EditArray:{},Textval:{},srno:'',
      Localsub:{},
      sfcInfo:[],
      rate:'',
      imageshow:true,
      EditKey:'',
      Editdata:{},
      Appdate:'',
      Appby:'',
      // travtype:{"1":"BUS","2":"By Air","3":"Cycle"},
      rowperPage:10,
      showExportPopup:false,
      from_data : "",
      to_date : "",
      header :  this.props.SFCLOCKED==false?  [
      {    prop: 'action', title: 'Action' ,filterable: true } ,
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
        ]  , 

        header1 :  this.props.SFCLOCKED==false?  [
           {    prop: 'action', title: 'Action' ,filterable: true } ,
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
            ],

            header2 :  this.props.SFCLOCKED==false?  [
              // {    prop: 'action', title: 'Action' ,filterable: true } ,
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
               ],
        customLabels : {
          first: "<<",
          last: ">>",
          prev: "< Prev",
          next: "Next >", 
          show: "Show",
          entries: "items/page",
          filterPlaceholder: "Search",
          noResults: "There is no data to be displayed"
        },
      }
        this.selectedProduct=this.selectedProduct.bind(this)
        this.getshowsubmit = this.getshowsubmit.bind(this)
        this.gethidesubmit = this.gethidesubmit.bind(this)
        this.editSet = this.editSet.bind(this)
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleCloseModal1 = this.handleCloseModal1.bind(this)
        this.handleView = this.handleView.bind(this)
        this.SaveEditSFC = this.SaveEditSFC.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.onHide=this.onHide.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        this.deleteSFC=this.deleteSFC.bind(this)
        this.selectedText=this.selectedText.bind(this)
        this.showpage = this.showpage.bind(this)

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

    selectedText(Id,values){
        let Textval=this.state.Textval

      //  console.log(this.state.Textval)
        Textval[Id]=values
        this.setState({Textval:Textval})
    }

    deleteSFC(n_srno,rowid){
      //console.log(n_srno,rowid)
        var data={"Index":"SFC_DetailDelete","Data":{ "rowid":rowid,"n_srno":this.props.sfcno}}
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
        this.componentDidMount()
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


      if(this.state.EditArray[1]){
        if(this.state.EditArray[1]["from"])
          {
           from=this.state.EditArray[1]["from"]
          }
          else{
            this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter from" })
            return
          }
          if(this.state.EditArray[1]["to"]){
            to=this.state.EditArray[1]["to"]
          }
          else{
            this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter To" })
            return
          }
          if(this.state.Textval[a.sinum]){
            distance=this.state.Textval[a.sinum].toString()
          }else{
            distance='0'
           // this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter Distance" })
            //return
          }
          if(this.state.EditArray[1]["Area"]){
            areatype=this.state.EditArray[1]["Area"]
          }else{
            this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter Area Type" })
            return
          }
         if(this.state.EditArray[1]["Type"]){
            Type=this.state.EditArray[1]["Type"];
        }
        else{
           // this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter Travel Type" })
            //return
            Type='0' 
          }
        }else{
          this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Select given Input" })
        
          return
        }
      
    //  console.log("travel",this.state.travel[Type]['key'],this.state.travel,this.state.EditArray[1]["Type"])
    var data={
      "index": "SFC_Save",
      "Data": {
      "travelmode":Type,
      "subarea_from": from,
      "subarea_to":to,
      "distance":distance,
      "rowid":a.Rowid,
      "areaType":areatype,
      "n_srno":this.props.sfcno,
     "stpSetupNo":this.props.setup_id
    
    },
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
                  b.mode=this.state.travel[Type]['text'] ? this.state.travel[Type]['text'] :'0' 
                  if(distance!=''){
                    b.distance= distance
                  }
                  if(distance != ''){
                    b.ta =distance*this.state.rate
                  }
                  
                  b.action =  <div> <img id={b.sinum}  onClick={()=>{this.editSet(b.sinum)}}  src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp; <img  onClick={ ()=>{  this.handleShowModal(b.N_srno,b.Rowid)  } } className="deletebtn hcursur" src = "../public/assets/images/delete.png"/> </div>
                }
            })
            this.setState(
              this.state.body
            )}
            this.setState({ Error: true, Errormsg: res })
      }else{
        this.setState({ Messagetype:false,  Error: true, Errormsg: "Something wrong" })
      }
      })
    }
    editSet(e,dataval){ 
    
      this.setState({
        EditKey:e,Editdata:dataval
      })
    
    }



      componentDidMount(){
      let sfc_no = this.props.sfcno
      let sfcStatus = localStorage.getItem("status")
     


     
      this.props.data.map((item) =>{ 
        // sfc_no = item.sfcno
        sfcStatus =item.C_Status
      })
    //  if(sfc_no){
      var data={
          "Index":"SFC_detail",
          "Data":{"sfcno":this.props.sfcno}
       }
      let srno=''
      postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
          var body = []
          var Textval={}
          var rate
          Result.data.Result.map((sfclisteditdata,index)=>{
//             if(index==1){


//             sessionStorage.setItem("approvedFs",sfclisteditdata.approvedFs)
//             sessionStorage.setItem("apprDate",sfclisteditdata.apprDate)
// //this.setState({  Appby:sfclisteditdata.approvedFs,Appdate:sfclisteditdata.apprDate })
//             }approvedFs
          let item={}
          item["action"] = <div> 
                            {sfclisteditdata.EditStatusCode == '1'  ?
                              <div>
                               <img id={item.sinum}  onClick={()=>{this.editSet(item.sinum,sfclisteditdata)}}  className="hcursur" src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp; 
                                <img  className="hcursur" onClick={ ()=>{  this.handleShowModal(sfclisteditdata.N_Srno,sfclisteditdata.N_RowID)  } } className="deletebtn hcursur" src = "../public/assets/images/delete.png"/> 
                              </div>: sfclisteditdata.DeleteRequestStatusCode == '1' ? <div> <img className="hcursur" src="../public/assets/images/overflow.svg" /></div> : 
                         <div>     <img className="hcursur" src="../public/assets/images/overflow.svg" /> </div> }
                          </div>
          //item["action"]= 
          item["sinum"]=index+1, 
          item["locationfrom"]= sfclisteditdata.From,
          item["locationto"]=sfclisteditdata.To,
          item["type"]= sfclisteditdata.C_a_type, 
          item["distance"]= sfclisteditdata.Distance, 
          item["mode"]=sfclisteditdata.TravelMode,
          item["ta"]= sfclisteditdata.TA, 
          item["da"]=sfclisteditdata.da
          item["N_srno"]=sfclisteditdata.N_Srno
          srno=sfclisteditdata.N_Srno
          item["Rowid"]=sfclisteditdata.N_RowID
          item["AddStatusCode"] = sfclisteditdata.AddStatusCode
          item["DeleteRequestStatusCode"] = sfclisteditdata.DeleteRequestStatusCode
          item["DeleteStatusCode"] = sfclisteditdata.DeleteStatusCode
          item["EditStatusCode"] = sfclisteditdata.EditStatusCode
          item["ReqSubAreaRemove"] = sfclisteditdata.ReqSubAreaRemove
          Textval[item.sinum]=sfclisteditdata.da
          body.push(item)
          rate = sfclisteditdata.rateperkm
        })
          this.setState({ body: body  ,srno:this.props.sfcno,rate:rate })
          this.setState({
            Textval:Textval
          })
        }
        }).catch(  (Error)=> {
          //  console.log(Error,'<<-')
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
         })
         var details = {
          "index":"SFC_Det",
          "Data":{"sfcno":sfc_no},
         }
         postToServer("SFC",details).then((Result) => {
            if(Result.data.Result){
              this.setState({from_data : Result.data.Result[0]["from"] ,
              to_date : Result.data.Result[0]["to"]})
            }
         }).catch((Error) => {

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
    getshowsubmit(data2) {
      if(this.state.body.length < 0){
        this.setState({ Messagetype:false, Error: true, Errormsg: "No Data Found  " })
      }
      if(this.state.srno){
      let data={"Index":"SFC_Submitted","Data":{"sfcno":this.state.srno,SubAreaRowId: ""}}
      postToServer("SFC", data).then((Result) => {
        if (Result.data.Status == 'Success') {
          this.setState({ Error: true, Errormsg: Result.data.Result[0].Result})
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
      })
      }else{
        this.setState({
          Error:true,
          Messagetype:false,
          Errormsg:'No Data Found'
        })
      }
    }
    gethidesubmit(){
      this.setState({
          showsubmit: false
      })
    }
    handleShowModal(n_srno,rowid) {
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
    handleView() {
      this.setState({
          isFull: !this.state.isFull
      });
    }
    showpage(pgno){ 
      this.setState({
        rowperPage:pgno
      })
    }

    render() { 
    let sfc_no = this.props.sfcno
    // let from_data
    // let to_date
    // if(this.props.data){
    //   this.props.data.map((item) =>{
    //     from_data =item.from
    //     to_date = item.to
    //   })
    // }
   
    return (
        <React.Fragment>
          <div>
         {this.state.showsubmit   ?
            <MrsubmitChart
           show={this.state.showsubmit}
           onHide={this.gethidesubmit}
            />
          : null}
          </div>
          <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
            <div className="ongoing-orders-sfc">
            <div className="flex-row">
                <div>
                    <h5 className="sfc-list-sec-head">
                    New SFC Chart Details &nbsp;{sfc_no ? <span className="sfchartvalid">, Srno : {sfc_no} - Valid from {this.state.from_data} to {this.state.to_date}.</span>: null}
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
            <Sfchartable
          Appby={this.state.Appby}
          Appdate={this.state.Appdate}
SFCLOCKED={this.props.SFCLOCKED }
                tableHeader={this.state.header}
                tableBody={this.state.body}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={this.state.rowperPage}
                rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true, }}
                labels={this.state.customLabels}
                showsubmit={this.getshowsubmit}
                showpage={this.showpage}
                exportStatus={this.state.showExportPopup}
                tableHeader1={this.state.header1}
                tableBody1={this.state.body}
                tableHeader2={this.state.header2}
            />
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
        </div>
       {this.state.EditKey !='' ?
        <EditModel     setup_id={this.props.setup_id}  hidearea={this.props.hidearea}  travedrop={this.props.travedrop}  Editdata={this.state.Editdata}  EditKey={ this.state.EditKey}  onClose={this.ModelHide} data={this.state.imaggedata} success={this.state.msgshow} message={this.state.errmsg} show={this.state.imageshow} n_srno={this.props.sfcno}/>
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

export default Newsfchart;


