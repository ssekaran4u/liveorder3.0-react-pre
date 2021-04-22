import React, {Component} from 'react';
import { Modal, Button,Dropdown } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
// import { Dropdown } from "semantic-ui-react";
import ProductList from '../components/ProductList'
import ProductCheckbox from './ProductCheckbox'
import DatePicker from "react-datepicker";
import {postToServer} from '../../../lib/comm-utils'
import SamplePromotions from '../components/SamplePromotions'
import { format } from "date-fns";
import Moment from "moment";
import ProductDropDown from '../components/ProductDropDown'
import StatusPopup from '../../../lib/StatusPopup'

class ProductMapping extends Component{
    constructor(props) {
        super(props)
      
        this.state = {
        n_type: this.props.ntype,
        n_MTP_ProductMandatory:false,
        n_MTP_SampleMandatory:false,
        n_mtp_DoctorMandatory:false,
          showConfirm: false,
          data:{},
          showProductMapping:false,
          datakey:[],
          selectedData:{},
          selectedKey:{},
          fromTime:'',
          toTime:'',
          desc:'',
          samplesdata:{},
          appoinementToTime:{},
          fromAppoinementTime:{},
          appoinemntDate:{},
          appointDesc:{},
          editdate:'',
          date:'',
          ftime:'',
          tval:'',
        
          sampletUnit:'',
          autoSelectProduct:[],
          autoSelectedSample:[],
          productdata:{},
          sampleEnable:false,
          ProductEnable:false
          ,coreproduct:{},
          n_core_product_autosave:'0'
        }
        this.handleShowModal = this.handleShowModal.bind(this)
        this.getExpenseData = this.getExpenseData.bind(this)
        this.handleClose = this.handleClose.bind(this)
       // this.getProducts = this.getProducts.bind(this)
        this.sendProduct = this.sendProduct.bind(this)
        this.dateChanged = this.dateChanged.bind(this)
        this.FromTimeChanged = this.FromTimeChanged.bind(this)
        this.ToTimeChanged = this.ToTimeChanged.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getSamples = this.getSamples.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.MTP_Action_item=this.MTP_Action_item.bind(this)
        this.getCoreproductSelected= this.getCoreproductSelected.bind(this)
      }

      getCoreproductSelected(){
        // var data = {
        //     "index": "MTP_getAutoProduct",
        //     "Token": "",
        //     "menuid":"38",
        //     "Data": { "N_type":this.props.ntype
        //     }
        // }
        let editproduct=[]

  let coreproduct={}

         // alert( this.props.ntype)
         var data = {
            "index": "MTP_getAutoProduct",
            "Token": "",
            "menuid":"38",
            "Data": { "subarea":this.props.areacode,"Year":this.props.year,"Month":this.props.monthCode,
            "day":this.props.day,
            "Doc":this.props.doc_code
            }
        }


        editproduct=this.state.autoSelectProduct

        postToServer("MTP", data).then((result) => {

            if(result.data["data"]){ 
                result.data["data"].map((item)=>{ 
                    if(item.C_ITEM_EXP){
                        editproduct.push({
                            id:item.C_ITEM_EXP.trim()
                            
                        })

                        coreproduct[item.C_ITEM_EXP.trim()]=true
                        
                    }
                })

                this.setState({
                    coreproduct:coreproduct,
                    autoSelectProduct:editproduct,
                    // ProductEnable:true,showProductMapping:true
                
                })
            }


           if(result.data["validation"]){
               if(result.data["validation"]){
                



       let n_MTP_ProductMandatory =result.data["validation"]["n_MTP_ProductMandatory"]
       let n_MTP_SampleMandatory=result.data["validation"]["n_MTP_SampleMandatory"]
       let n_mtp_DoctorMandatory=result.data["validation"]["n_mtp_DoctorMandatory"]

        let n_core_product_autosave=result.data["validation"]["n_core_product_autosave"]

        this.setState({n_core_product_autosave:n_core_product_autosave})
       if(n_MTP_ProductMandatory=="1"){
           this.setState({n_MTP_ProductMandatory:true})
       }

       if(n_MTP_SampleMandatory=="1"){
        this.setState({n_MTP_SampleMandatory:true})
        }


    if(n_mtp_DoctorMandatory=="1"){
        this.setState({n_mtp_DoctorMandatory:true})
    }
      

       
           }
        }




        }).catch( (Error)=>{

             console.log(Error)
        })
      }




      MTP_Action_item(){
        var data = {
            "index": "MTP_Action_item",
            "Token": "",
            "menuid":"38",
            "Data": { "N_type":this.props.ntype
            }
        }


        postToServer("MTP", data).then((result) => {
            if(result.data){

                result.data.map((s)=>{
                    if(s.c_name=="Product Detailing & Doctor"){
                        this.setState({ProductEnable:true})
                    }

                    if(s.c_name=="Samples & pramotions"){
                        this.setState({sampleEnable:true})
                    }
                })
               
           // console.log('okok',result.data) 
                
            }
        }).catch( (Error)=>{
            this.setState({ Error: true, Errormsg: "Error in App" })
        })

      }
      componentDidMount(){

       
        this.MTP_Action_item()
      // alert( this.props.ntype)
        var data = {
            "index": "MTP_doc_Selected",
            "Token": "",
            "menuid":"38",
            "Data": { "subarea":this.props.areacode,"Year":this.props.year,"Month":this.props.monthCode,
            "day":this.props.day,
            "Doc":this.props.doc_code
            }
        }
       
         
        postToServer("MTP", data).then((result) => {
            if(result.data){
               
              
               let time='00:00'
               let time_to='00:00'
               let editproduct=[]
               let sampletUnit
               let editSample =[]
               let descdata={} 
               let desc=''
               editproduct=this.state.autoSelectProduct

                if (result.data.length==0){
                    this.getCoreproductSelected();
                }
                result.data.map((item,index)=>{
                   // try{

                        if(index==0){
                            if(item.C_meet_from !='00:00' && item.C_meet_from !='' ){
                                let dc =item.D_Date.split("T")[0]

                          //  let pD=    DateTime.ParseExact("2/22/2015 9:54:02 AM", "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                                let dk = new Date(dc+' '+item.C_meet_from )
                                time = dk.toLocaleTimeString() 
                                this.setState({fromTime:dk,  ftime:time})
                            }

                            if(item.C_meet_to !='00:00' && item.C_meet_to !='' ){
                                let as =item.D_Date.split("T")[0]
                                let dj = new Date(as+' '+item.C_meet_to )
                                console.log(dj.toLocaleTimeString() ,'okokio')
                               const nn = dj.toLocaleTimeString() 
                                this.setState({ toTime:dj, tval:nn})
                            }
                        }
                 
                    desc=item.c_note

                    
                    descdata[this.props.ntype]={}
                    descdata[this.props.ntype.trim()][this.props.doc_code.trim()] = desc
                    
                   
                    
                    this.props.Remark(descdata)
                  
                        if(item.C_ITEM_EXP){
                            editproduct.push({
                                id:item.C_ITEM_EXP.trim()
                            })
                        }
                        if(item.C_Item_Code){
                            editSample.push({
                                id :item.C_Item_Code,
                                qty:item.n_Product_Unit
                            })
                        }
                    // }
                    // catch(Error){
                    //     console.log(Error,'ddddd')
                    // }
                })
                this.setState({
                   // editdate:date,
                   appointDesc:descdata,
                    desc:desc,
                    autoSelectProduct:editproduct,
                //    sampletUnit:sampletUnit,
                   autoSelectedSample:editSample,
                  
                })

            
               
            }
        }).catch( (Error)=>{
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
        
      }
      handleShowModal() {

//console.log(this.state.fromTime.toLocaleTimeString(),this.state.toTime.toLocaleTimeString())

//return
           

        if(this.state.n_MTP_ProductMandatory==true  &&  this.state.ProductEnable==true ){ 

            
            if(!this.state.productdata[this.props.ntype]){
                this.setState({  showStatusModal: true, msg: "Please Select Product" })
                return
            }
            if(!this.state.productdata[this.props.ntype][this.props.doc_code]){
                this.setState({  showStatusModal: true, msg: "Please Select Product" })
                return
            }
                if(this.state.productdata[this.props.ntype][this.props.doc_code].length == 0){
                    this.setState({  showStatusModal: true, msg: "Please Select Product" })
                    return
                }
        }
        if(this.state.n_MTP_SampleMandatory==true &&  this.state.sampleEnable==true ){     
            if(this.state.samplesdata[this.props.ntype]){   
                if  (    Object.keys(this.state.samplesdata[this.props.ntype][this.props.doc_code])){
            if(  Object.keys(this.state.samplesdata[this.props.ntype][this.props.doc_code]).length == 0){

                // message={this.state.msg}
                // show={this.state.showStatusModal}
                // onClose={this.hideStatusModal}
                // success={this.state.success}
                this.setState({  showStatusModal: true, msg: "Please Select Sample" })
                return
            }
        }else{
            this.setState({  showStatusModal: true, msg: "Please Select Sample" })
            return 
        }

        }else{
            this.setState({  showStatusModal: true, msg: "Please Select Sample" })
            return 
        }
    }

        
        this.props.hideMOdal()
        let fromtime
        let edate
        let tTime
        if(this.state.fromTime){ 
            if(this.state.fromTime != ''){
            fromtime=  this.state.fromTime.toLocaleTimeString("en-GB")//this.state.fromAppoinementTime
        
        }
    
    }else{
            let fromTimedic={}
            fromTimedic[this.props.ntype]={}

            if(this.state.fromTime!=''){
            fromTimedic[this.props.ntype][this.props.doc_code] = this.state.fromTime.toLocaleTimeString("en-GB")
            fromtime =this.state.fromTime.toLocaleTimeString("en-GB")
            }else{
                fromTimedic[this.props.ntype][this.props.doc_code] = ''
                fromtime =''
            }
        }
        if(this.state.date){
            edate = this.state.appoinemntDate
        }else{
            let date = this.state.editdate ? format(this.state.editdate, "YYYY-MM-DD") : "";
            let selecteddate={}
            selecteddate[this.props.ntype]={}
            selecteddate[this.props.ntype][this.props.doc_code] = date
            edate = selecteddate
        }
        if(this.state.toTime){

            if(this.state.toTime!=''){
            tTime = this.state.toTime.toLocaleTimeString("en-GB")
            }else{
                tTime=''
            }
        }else{
            tTime=''
        }
      
          //  this.props.saveData(selecteddate,fromAppoinementTime,'',this.state.selectedKey,this.state.samplesdata,this.state.appointDesc)
       // }else{alert("hi")
            this.props.saveData(edate,fromtime,tTime,this.state.productdata,this.state.samplesdata,this.state.appointDesc,this.props.doc_code)
       // }
        this.props.prosamData(this.state.productdata,this.state.samplesdata,this.props.doc_code)
      }
     
    getExpenseData(data){ 
        this.setState({
            data:data
        })
    }
    handleClose(){
        this.props.hideMOdal()  
    }
    handleCheckboxChange(){
          this.setState({
              showProductMapping:!this.state.showProductMapping
          })
         // this.getProducts(this.props.doc_code)

    }
    
    // getProducts(doccode){
    //     var data = {
    //         "Data":{"doc": doccode},
    //         "index": "downloadDcrPdt",
    //         "Token": ""
    //     }
    //     //  this.props.getProductDetail(data)
    //     postToServer("DCRAPI", data).then((result) => {
    //         if( result.data["Status"]=="Fail"){
    //             this.setState({ Error: true, Errormsg: " NO Product Data" })
    //             return
    //         }else{
    //             if(result.data["Status"]=="Success"){
    //         this.setState({ datakey: result.data.downloadDcrPdt })
    //             }
    //         }
    //     }).catch( (Error)=>{
    //         this.setState({ Error: true, Errormsg: "Error in App" })
    //     })
    // }
    dateChanged(d){ 
        let date = d ? format(d, "YYYY-MM-DD") : "";
        let selecteddate={}
        selecteddate[this.props.ntype]={}
        selecteddate[this.props.ntype][this.props.doc_code] = date
        this.setState({ 
            date: d ,
            appoinemntDate:selecteddate
        });
    }
    FromTimeChanged(d){ 

if(this.state.toTime == ''){

        this.setState({fromTime:d})
}else{
    if(this.state.toTime>d){
        this.setState({fromTime:d})
    }else{
        this.setState({
            showStatusModal:!this.state.showStatusModal,
            msg:"Please Enter Time less than To(time) ",
            success:false,
           
        })
    }
}


        return
        let fromTime = d ? d.toLocaleTimeString() : "";
        let to = this.state.toTime ? this.state.toTime.toLocaleTimeString():""
        let AM=  fromTime.search("AM")
        let PM=  fromTime.search("PM")
        let toAM=  to.search("AM")
        let toPM=  to.search("PM")
        let t = fromTime
        t = t.split(" ")[0];

        let fromTimedic={}
      
        to = to.split(" ")[0]
        fromTimedic[this.props.ntype]={}
        fromTimedic[this.props.ntype][this.props.doc_code] = t

     


        let bool=false

    //   if(toAM != -1 ){
    //                 if(AM)
    //      }

     
     
    //   if(toAM != -1){
    //     alert("PM"+toAM)
    //         }
     

    to=to.replace(":", ".");
    t=t.replace(":", ".");
    to=to.replace(":00", "");
    t=t.replace(":00", "");


      if(AM != -1 ){

        if(toAM != -1){
            if ( parseFloat(to) >  parseFloat(t)){
                bool=true
            }
        }

        if(toPM != -1){
            bool=true
        }
        
         }

     
     
      if(PM != -1){

      // console.log(PM,toAM,toPM, parseFloat(to) >   parseFloat(t),parseFloat(to) ,   parseFloat(t))
        if(toAM != -1){
            bool=true
        }

        if(toPM != -1){

      
            if (parseFloat(to) >   parseFloat(t)){

                
                bool=true
            }
        }
         }
     
        if(this.state.toTime){
        if(bool==false){ 
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                msg:"Please Enter Time less than To(time) ",
                success:false,
                fromTime:''
            })
        }else{
            this.setState({ 
                fromTime: d,
                fromAppoinementTime:fromTimedic
            });
        }
    }else{
        this.setState({ 
            fromTime: d,
            fromAppoinementTime:fromTimedic
        });
    }
        // this.setState({ 
        //     fromTime: d,
        //     fromAppoinementTime:fromTimedic
        // });
    }
    ToTimeChanged(d,A){

       



        if(this.state.fromTime == ''){

            this.setState({
                showStatusModal:!this.state.showStatusModal,
                msg:"Please Enter From Time   ",
                success:false,
               
            })
            return
    }else{
        if(this.state.fromTime<d){
            this.setState({toTime:d})
        }else{
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                msg:"Please Enter Time less than To(time) ",
                success:false,
               
            })
        }
    }

        // this.setState({ 
            
        //     toTime:d
        // }) 



    //     let toTime = d ? d.toLocaleTimeString() : "";
    //     let to = this.state.toTime ? this.state.toTime.toLocaleTimeString():""
    //     let t = toTime
    //     let t11='00:00:00 AM'
    //     t = t.split(" ")[0];
      
    //     let toTimedic={}
    //     toTimedic[this.props.ntype]={}
    //     toTimedic[this.props.ntype][this.props.doc_code] = t
    //     let from = this.state.fromTime ? this.state.fromTime.toLocaleTimeString():""
    //     to = from.split(" ")[0]
    //    let  ti=from.split(" ")[0]
    //     let AM =  from.search("AM")
    //     let PM =  from.search("PM")
    //     let toAM =  toTime.search("AM")
    //     let toPM =  toTime.search("PM")


    //     let bool=false

   
     

    // to=to.replace(":", ".");
    // t=t.replace(":", ".");
    // to=to.replace(":00", "");
    // t=t.replace(":00", "");


    //   if(AM != -1 ){

    //     if(toAM != -1){
    //         if ( parseFloat(to) <  parseFloat(t)){
    //             bool=true
    //         }
    //     }

    //     if(toPM != -1){
           
    //         bool=false
           
    //     }
        
    //      }

     
     
    //   if(PM != -1){

    //    console.log(PM,toAM,toPM, parseFloat(to) >   parseFloat(t),parseFloat(to) ,   parseFloat(t))
    //     if(toAM != -1){
    //         bool=true
    //     }

    //     if(toPM != -1){

      
    //         if (parseFloat(to) <  parseFloat(t)){

                
    //             bool=true
    //         }
    //     }
    //      }

        

    //     from = from.split(" ")[0]
    //     if(bool==false){ 
    //         this.setState({
    //             showStatusModal:!this.state.showStatusModal,
    //             msg:"Please Enter Time greater than From(time) ",
    //             success:false,
    //             toTime:''
    //         })
    //     }else{
    //         this.setState({ 
    //             tval:t11,
    //             toTime:d,
    //             appoinementToTime: toTimedic
    //         });
    //     }
     
    }
    handleChange(){

        let descdata={}
        let desc = event.target.value
        descdata[this.props.ntype]={}
        descdata[this.props.ntype.trim()][this.props.doc_code.trim()] = desc
        if(this.state.desc.length<300){
        

        this.setState({
            desc:desc,
            appointDesc:descdata
        })
        this.props.Remark(descdata)
    }else{
        this.setState({
            msg:'Note Allowed Only 300 Charcter ',
            showStatusModal:true,
            success:false
        })
    }
    
}
    getSamples(data){ 

        this.setState({samplesdata:data})
        //this.props.sampleData(data)
    }
    sendProduct(data){

     
        this.setState({productdata:data})
       // this.props.productData(data)
    }
    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal
        })
    }
    render(){ 
        
        let dataselection
        if(this.state.autoSelectProduct.length != 0  || this.state.autoSelectedSample.length != 0 ){
            dataselection = true
        }else{
            dataselection =null
        }
        return(
            <div>
                <Modal   className="master-success-sfcaddexpense "
          {...this.props}
          show={this.props.show}
          ntype={this.props.ntype}
          
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={this.handleClose}
          centered>
                        <Modal.Header ntype={this.props.ntype}   className="plan-this-task applyLeaveHeader ">
                            <Modal.Title  ntype={this.props.ntype}  className="modalTitle">
                            ADD PRODUCT AND SAMPLE DETAILS
                                <span
                                    className="modalCancelBtn"
                                    onClick={this.props.hideMOdal}
                                >
                                    <img src="../public/assets/images/cancel.png" />
                                </span>
                            </Modal.Title>
                        </Modal.Header>
                     
                     <div className="modal-head-addexp ">
                         {/* <p className="addpersoname">Person Name</p> */}
                            {/* <p className="addmrname">{this.props.expenseUsename} - {this.props.userDesg}</p> */}
                     </div>
                        <Modal.Body  ntype={this.props.ntype} className="">
                            <Form>
                               
                               <div className="pl20 pt20">
                                    <Form.Group className="m-0 mb-2 padd48">
                                        {/* <Form.Label className="customized-label">
                                            Date 
                                        </Form.Label>
                                        <div className="datepickerAligment">
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.dateChanged}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Select Date"
                                                value={this.state.date == "" ? this.state.editdate :this.state.date}
                                            />
                                            
                                        </div> */}
                                        <Form.Label className="customized-label pt20">
                                            Time(From & To) 
                                        </Form.Label>
                                        <div className="flexDisplay fromtodate">
                                        <div  className="datepickerAligment width50">
                                        <DatePicker
                                               id="from"
                                                selected={this.state.fromTime}
                                                onChange={this.FromTimeChanged}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={10}
                                                dateFormat="h:mm aa"
                                                timeCaption="Time"
                                                placeholderText="Select Time"
                                               /// value={this.state.fromTime == ""?this.state.ftime:this.state.fromTime}
                                            />
                                            </div>
                                            <div  className="datepickerAligment width50">
                                            <DatePicker
                                               id="from"
                                              
                                                selected={this.state.toTime}
                                               // selected= "6:30:00  "// {this.state.toTime}
                                                onChange={this.ToTimeChanged}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={10}
                                                dateFormat="h:mm aa"
                                                timeCaption="Time"
                                                placeholderText="Select Time"
                                                //value={this.state.toTime}
                                                //value={this.state.fromTime == ""?this.state.ftime:this.state.fromTime}
                                            />
                                        </div>
                                        </div>
                                       
                                    </Form.Group>
                                   {/* <ProductCheckbox checkbox="Do you Want Product Mapping" /> */}
                                   {dataselection  ?  
                                        <div>
                                            <div className="singledropdown mb-2  padd48  ">
                                                {this.state.ProductEnable==true ? <div>  <Form.Label className="customized-label" placeholder="Password">Products</Form.Label>
                                                      <ProductDropDown 
                                                        doc_code={this.props.doc_code} 
                                                        autoSelectProduct={this.state.autoSelectProduct}
                                                        n_type={this.state.n_type} 
                                                        ntype={this.props.ntype} 
                                                        sendProduct={this.sendProduct}
                                                        coreproduct={this.state.coreproduct}
                                                        subarea={this.props.areacode}
                                                        doc={this.props.doc_code}
                                                        month={this.props.monthCode}
                                                        day={this.props.day}
                                                        n_core_product_autosave={this.state.n_core_product_autosave}
                                                        year={this.props.year}
                                                    /> </div> :null}
                                          {this.state.sampleEnable==true ?<div>       <Form.Label className="customized-label" placeholder="Password">Samples & Promotions</Form.Label>
                                                    <SamplePromotions 
                                                       doc_code={this.props.doc_code} 
                                                        autoSelectedSample={this.state.autoSelectedSample} 
                                                        
                                                        ntype={this.props.ntype} 
                                                        sendSelectedSample={this.getSamples}
                                                        // sampletUnit={this.state.sampletUnit}
                                                        
                                                        subarea={this.props.areacode}
                                                        doc={this.props.doc_code}
                                                        month={this.props.monthCode}
                                                        day={this.props.day}
                                                        year={this.props.year}
                                                    /> </div>:null}
                                               
                                            </div>
                                        </div>
                                   :this.state.showProductMapping ?
                                   <div>
                                            <div className="singledropdown mb-2  padd48  ">
                                           { this.state.ProductEnable==true ? <div> <Form.Label className="customized-label" placeholder="Password">Products</Form.Label>
                                                <ProductDropDown 
                                                        n_core_product_autosave={this.state.n_core_product_autosave}
                                                        doc_code={this.props.doc_code}
                                                        coreproduct={this.state.coreproduct} 
                                                        autoSelectProduct={this.state.autoSelectProduct}
                                                        sendProduct={this.sendProduct}
                                                        ntype={this.props.ntype} 
                                                        subarea={this.props.areacode}
                                                        doc={this.props.doc_code}
                                                        month={this.props.monthCode}
                                                        day={this.props.day}
                                                        year={this.props.year}
                                                    /> </div> :null}
                                           {this.state.sampleEnable==true ?<div><Form.Label className="customized-label" placeholder="Password">Samples & Promotions</Form.Label>
                                                    <SamplePromotions 
                                                        autoSelectedSample={this.state.autoSelectedSample} 
                                                        doc_code={this.props.doc_code} 
                                                        ntype={this.props.ntype} 
                                                        sendSelectedSample={this.getSamples}
                                                                                                            
                                                        subarea={this.props.areacode}
                                                        doc={this.props.doc_code}
                                                        month={this.props.monthCode}
                                                        day={this.props.day}
                                                        year={this.props.year}
                                                        // sampletUnit={this.state.sampletUnit}
                                                    />
                                               </div> :null}
                                            </div>
                                        </div>
                                   : null}
                                   <div className="padd48 ">
                                    <Form.Label className="customized-label" placeholder="Password">Remarks</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="textarea"
                                                    rows="3"
                                                    maxLength="300"
                                                    placeholder="Add message here"
                                                    className="popup-textbox"
                                                    value={this.state.desc}
                                                    onChange={this.handleChange}
                                                />
                                    </div>
                                   {this.state.sampleEnable==true || this.state.ProductEnable==true? <Form.Check 
                                        custom
                                        type="checkbox"
                                        checked={ dataselection }
                                        id="id1"
                                        label="Do Product Mapping"
                                        className="mb-2 productCheck pt10 pb10"
                                        name="id1"
                                        onChange={this.handleCheckboxChange.bind(this)}
                                    />:null}
                               </div>
                                
                            </Form>
                        </Modal.Body>
                     
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                className="cancelBtn"
                                onClick={this.props.hideMOdal}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                onClick={this.handleShowModal}
                            >
                                Save
                            </Button>
                        </Modal.Footer>  
                    </Modal>
                    <StatusPopup
                    message={this.state.msg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
            />
            </div>
        )
    }
}

export default ProductMapping