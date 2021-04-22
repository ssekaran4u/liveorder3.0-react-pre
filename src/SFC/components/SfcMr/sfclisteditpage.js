import React, { Component } from "react";

import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'

import Sfceditable from './sfclisteditable'
import Sfclistdelete from './sfclistdelete'
//import DropdownExampleSelection from './afcdropdowneditmr'
import Form from 'react-bootstrap/Form'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import TEXT from './../../../BasicComponet/Text'
import StatusPopup from './../../../lib/StatusPopup'
import { Dropdown } from 'semantic-ui-react'
import { withRouter } from "react-router";
import ExpenseModal from '../SfcMr/ExpenseModal'

class Sfclisteditpage extends Component {

    constructor(props){
        super(props)
          this.state = {
          showModal: false,
          showModal1:false,
          open: false,
          isFull: false,
          edit:false,
          sfclistedit:[],
          tempitem:{},
          id:"",Messagetype:true,Error: false, Errormsg:'',
          body:[],locationfrom:[],EditArray:{},Textval:{},
          delete_n_srno:'',
          delete_rowid:'', Localsub:{},
          expenseModal:false,
          body:[],locationfrom:[],
          sfc_no:'',
          ApproveBy:[],
          ApproveBy1:'',
          sfcStatus:'',
          header : [
            // { prop: 'action', title: 'Action' ,filterable: true },
            { prop: 'sinum', title: 'SI. No',  filterable: true},
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
        },  AreaType:{"100":"HQ","102":"OS","101":"EX"}, travtype:{"1":"BUS","2":"By Air","3":"Cycle"},
        }
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleCloseModal1 = this.handleCloseModal1.bind(this)
        this.handleView = this.handleView.bind(this)
        this.editSet = this.editSet.bind(this)
        this.selectedProduct=this.selectedProduct.bind(this)
        this.selectedText=this.selectedText.bind(this)
        this.SaveEditSFC=this.SaveEditSFC.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.onHide=this.onHide.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        this.deleteSFC = this.deleteSFC.bind(this)
        this.getExpense = this.getExpense.bind(this)
        this.handleCloseExpense = this.handleCloseExpense.bind(this)
      }


      deleteSFC(n_srno,rowid){
         
        var data={"Index":"SFC_DetailDelete","Data":{ "rowid":rowid,"n_srno":n_srno}}
        postToServer("SFC",data).then( (Result)=>{
            if(Result.data.Status == 'Success'){
                const msg= Result.data.Result[0]["Result"]
                this.setState({ Error: true, Errormsg:msg })
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


          if (from==''  ||  from=='-1'){
            this.setState({ Error: true, Errormsg: "Please Select From" })
            return 
          }

          if (to=='' || to=='-1' ){
            this.setState({ Error: true, Errormsg: "Please Select To" })
            return 
          }
       

          if (areatype=='' || areatype=='-1'  ){
            this.setState({ Error: true, Errormsg: "Please Select Area Type" })
            return 
          }

          if (Type==''  ||  Type=='-1'){
            this.setState({ Error: true, Errormsg: "Please Select Type  Of travel" })
            return 
          }
       
        //   item["sinum"]=index+1, 
        //   item["locationfrom"]= sfclisteditdata.From,
        //   item["locationto"]=sfclisteditdata.TO,
        //   item["type"]= sfclisteditdata.C_a_type, 
        //   item["distance"]= sfclisteditdata.Distance, 
        //   item["mode"]='Bus',
        //   item["ta"]= sfclisteditdata.TA, 
        //   item["da"]=sfclisteditdata.da
        //   item["N_srno"]=sfclisteditdata.N_Srno
        //   item["Rowid"]=sfclisteditdata.N_RowID

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
                "stpSetupNo" :' '            
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
          })

      }

      selectedText(Id,values){
        let Textval=this.state.Textval

       // console.log(this.state.Textval)
        Textval[Id]=values
        this.setState({Textval:Textval})
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
        //console.log(EditArray,'fdfff')
      }

      componentDidUpdate(oldprops,oldstate){
       




        // let item={}
        // if(this.state.edit!=oldstate.edit){
        //     if (this.state.edit == true ){
        //         if(this.state.id){

        //             alert('kunal')

        //             var locationfrom = <div><DropdownExampleSelection/> </div>

        //             

        //             var distance = <div> <Form className="ghh">
        //                 <Form.Group className="formdrpeditdistance" >
        //                 <Form.Control className="formeditdistance"/>
        //                 </Form.Group>
        //                 </Form></div>


        //             var ta = <div> <Form className="ghh">
        //                 <Form.Group className="formdrpeditdistance" >
        //                 <Form.Control  className="formeditdistance"/>
        //                 </Form.Group>
        //                 </Form></div>
                   
                 
        //         let update= <Drop  Selected={-1}  selectedProduct={this.selectedProduct} data={friendOptions} ></Drop> 
        //         item.locationfrom =update
        //         item.locationto =update
        //         item.type = update
        //         item.mode = update
        //         item.action = rightchecksave
        //         item.distance = distance
        //         item.ta = ta
        //         item.id=this.state.id

        //         this.setState({tempitem:item})
         //   } 
       // }
   // }
}
    
      componentDidMount(){

       
        let sfc_no = this.props.match.params.id
        let sfcStatus = localStorage.getItem('status')

        // alert('okok')
        
        this.setState({ 
          sfc_no: sfc_no,
          sfcStatus:sfcStatus
         })
        var data={
            "Index":"SFC_detail",
            "Data":{ "sfcno":sfc_no} ,
        }
        postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
       
        var body = []
        var Textval={}
         Result.data.Result.map((sfclisteditdata,index)=>{
        //  if(index==1){
            this.setState({ ApproveBy1: sfclisteditdata.approvedFs,  approvedDate:sfclisteditdata.apprDate  })
        //  }
            let item={}
            item["action"] = <div> 
                              {sfcStatus == 'Pending'   || sfcStatus == 'Saved' ?
                                <div>
                                  <img id={item.sinum}  onClick={()=>{this.editSet(item.sinum)}}  src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp;
                                  <img  onClick={ ()=>{  this.handleShowModal(sfclisteditdata.N_Srno,sfclisteditdata.N_RowID)  } } className="deletebtn" src = "../public/assets/images/delete.png"/>
                                </div>:
                                <img  src = "../public/assets/images/overflow.svg" />}
                            </div>
            //item["action"]= 
            item["sinum"]=index+1, 
            item["locationfrom"]= sfclisteditdata.From,
            item["locationto"]=sfclisteditdata.To,
            item["type"]= sfclisteditdata.C_a_type, 
            item["distance"]= sfclisteditdata.Distance, 
           // item["mode"]='Bus',
            //item["ta"]= sfclisteditdata.TA, 
          //  item["da"]=sfclisteditdata.da
            item["N_srno"]=sfclisteditdata.N_Srno
            item["Rowid"]=sfclisteditdata.N_RowID
            item["type"]= sfclisteditdata.C_a_type,
            item["distance"]= sfclisteditdata.Distance,
            item["mode"]=sfclisteditdata.TravelMode,
            item["ta"]= sfclisteditdata.TA,
            item["da"]=sfclisteditdata.da
            Textval[item.sinum]=sfclisteditdata.da
            body.push(item)
        })
         this.setState({ body: body, Textval:Textval })
        }
        }).catch(  (Error)=> {
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
         }  )

    //      var approval={"Index":"ApprovedStatus",
    //               "Data":{"sfcno":sfc_no},
    //               "Token":""
    //             }
    // postToServer("SFC",approval).then( (Result)=>{
    //   if(Result.data.Status == 'Success'){
    //   //console.log( Result.data.Result ,"soundarya")
    //       this.setState({ ApproveBy: Result.data.Result })
    //   }
    //   }).catch(  (Error)=> {  
    //       this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
    //     }  )
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

    handleCloseModal1(){
      this.setState({
        showDelModal:false,
        // showModal1:false,
      });
    }

      handleView(){
        this.setState({
            isFull: !this.state.isFull
      });
    }

    editSet(e){
       // alert(e)

       var data={"index":"getSubarea"}
       let locationfrom=[]

  
       locationfrom.push({key: -1,
       text: "--Please Select--",
       value: "-1",
       })
       let Localsub={}
    postToServer("SFC",data).then( (Result)=>{
        const cv=Result["data"]["Result"]["Result"]
        cv.map((a)=>{  
            let M={}
            Localsub[a["C_Code"]]=a["C_Name"]
            M={key: a["C_Code"],
            text: a["C_Name"],
            value: a["C_Code"],
            }
            locationfrom.push(M)
        })
        this.setState({ locationfrom:locationfrom,Localsub:Localsub })
    })
    let travel=[]
    travel.push({
        "key": '-1',
        "text": '--Please Select--',
        "value": '-1',
      })
    var travelModes = { "index": "TravelMode" ,   data:{  "distance":'0' }  }
    postToServer("SFC", travelModes).then((Result) => {
    if (Result.data.Status == 'Success') {
      Result.data.Result.map((item) => { 
        travel.push({
          "key": item.n_id,
          "text": item.c_name,
          "value": item.n_id,
        })
      })
    }
    }).catch((Error) => {
    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
    
    let Aretype = [
        {key: -1,
            text: "--Please Select--",
            value: "-1",
            },
        {
        key: 'HQ',
        text: 'HQ',
        value: '100',
        },
        {
        key: 'OS',
        text: 'OS',
        value: '102',
        },
        {
            key: 'EX',
            text: 'Ex',
            value: '101',
            },
            
    ]

      
      let  item={}
      //  var rightchecksave =<div> <img  src = "../public/assets/images/Group 895.png" />   &nbsp; &nbsp; <img  onClick={this.handleShowModal} className="deletebtn" src = "../public/assets/images/delete.png"/> </div>
      
        // item.locationfrom =update
        // item.locationto =update
        // item.type = update
        // item.mode = update
        
        // item.distance = '90'
        // item.ta = '90'
        // item.id=e
        //item.action=

      let Textval={}
        this.state.body.map((a)=>{

            if(a.sinum==e){
                let from= <Drop  name={"from"} Type={a.sinum}  Selected={-1}  selectedProduct={this.selectedProduct} data={locationfrom} ></Drop> 
                
                let to= <Drop  name={"to"} Type={a.sinum}  Selected={-1}  selectedProduct={this.selectedProduct} data={locationfrom} ></Drop> 
                let Type=   <Drop  name={"Type"} Type={a.sinum}  Selected={-1}  selectedProduct={this.selectedProduct} data={travel} ></Drop> 
                let TypeL=   <Drop   name={"Area"} Type={a.sinum}  Selected={-1} selectedProduct={this.selectedProduct} data={Aretype} ></Drop> 
                a.locationfrom=from
                a.locationto=to
                a.type= TypeL
                a.mode=Type
                //a.da=<input  value={a.da}  />
                this.state.Textval[a.sinum]=a.da
                // a.distance= <TEXT  selectedText={this.selectedText} id={a.sinum}  Textval={ a.distance  } /> 
                a.distance= <TEXT  selectedText={this.selectedText} id={a.sinum}  Textval="0.00" />
                //<Form.Control type="text"  onChange={  (Event)=>{ this.textch(Event,a.sinum) } } value={this.state.Textval[a.sinum] } className="customized-input inputBox" placeholder="Enter Here" />
                //a.ta=<input  value={a.ta}  />
                a.action = <div> <img   onClick={  ()=>{this.SaveEditSFC(a)}  } src = "../public/assets/images/checked.svg" />  &nbsp; &nbsp; <img onClick={ ()=>{  this.handleShowModal(a.N_srno,a.Rowid)  } } className="deletebtn" src="../public/assets/images/delete.png" /></div>
            }


        })

        this.setState(
               
              this.state.body
              )
              this.setState({
                Textval:Textval
              })
      
     
    }
    getExpense(){
      var exp = {"Index":"SFC_EXP_View",
          "Data":{"sfcno":this.props.match.params.id},"Token":""}
          postToServer("SFC",exp).then( (Result)=>{
            if(Result.data.Status == 'Success'){
            //console.log( Result.data.Result ,"soundarya1")
            
           
       
              this.setState({ 
                expenseList:Result.data.Result,
                expenseModal:true
              })
           
            }
            }).catch(  (Error)=> {  
                this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
             }  )
    }
    handleCloseExpense(){
      this.setState({
        expenseModal:!this.state.expenseModal
      })
    }
  

render() { 


 



// let approvedBy
// let approvedDate
//   if(this.state.ApproveBy){
//     this.state.ApproveBy.map((item) =>{
//       approvedBy = item.Approver
//       approvedDate = item.ApproveDate
//     })
//   }

    return (
        <React.Fragment>
           <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
            <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
            {this.state.showDelModal == true ?
                   <Sfclistdelete
                   show={this.state.showDelModal}
                   onHideconfirmation={this.handleCloseModal}
                   onHidecancel={this.handleCloseModal1}
                    onShoworderconfirm={this.handleShowModal}
                   />
              :null}

            <div className="sfc-head-edit">
                <div>
                    <h5 className="sfc-list-sec-head">
                    Srno - {this.state.sfc_no}
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

                <Sfceditable
                Appby={this.props.Appby}
                Appdate={this.props.Appdate}
                    tableHeader={this.state.header}
                    tableBody={this.state.body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={this.state.customLabels}
                    approvedDate={this.state.approvedDate}
                    approvedBy={this.state.ApproveBy1}
                    getExpense={this.getExpense}
                    sfcStatus={this.state.sfcStatus}
                    ApproveBy1={this.state.ApproveBy1}
                    approvedDate={this.state.approvedDate}
                />

            <ExpenseModal 
            show={this.state.expenseModal} data={this.state.expenseList}
            closeModal={this.handleCloseExpense}
            />

                 <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={this.state.Messagetype}
                    />
                </div>
                </div>

        </React.Fragment>
    )
}
}

export default withRouter(Sfclisteditpage);


