/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Form} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
// import { header, body, customLabels, options } from '../../testdata/missedreport'
import { postToServer } from '../../lib/comm-utils' 
import StatusPopup from '../../lib/StatusPopup'
import StatusFailPopup from '../popup/StatusFailPopup'
import SearchDropdown from '../../BasicComponet/searchDropdown'
import '../../../public/assets/css/masterSample.css'
import DashLoader from '../../lib/DashboardLoader'

class AddCalltype extends Component{


    constructor(props){
        super(props)
   
        this.state={

            code:'0',
            name:'',
            Product:'',
            status:'0',
           
            shname:'',
            options:[],
            DSCA:"-1",
            DSCAType:"-1",
            msg:'',
            show:false,
            showFail:false,
            success:true,
            p:false,
            s:true,
            UPDATEON:false


        }

        this.Product=this.Product.bind(this)
        this.Status=this.Status.bind(this)
        this.dscatype=this.dscatype.bind(this)
        this.btnsave=this.btnsave.bind(this)
        this.btnclear=this.btnclear.bind(this)
        this.namefun=this.namefun.bind(this)
        this.shnamefun=this.shnamefun.bind(this)
        this.hide=this.hide.bind(this)
        this.btnupdate=this.btnupdate.bind(this)
    }

    hide(){
        this.setState({  
        show:false,
    showFail:false       })
    }

    shnamefun(event){

     const  val=   event.target.value
     this.setState({shname:val})

    }

    namefun(event){
        const  val=   event.target.value
        this.setState({name:val})
    }
    // dscatype(event,value){
    //     this.setState({DSCA:value.value})
    // }
    dscatype(value){
        this.setState({DSCAType:value})

         this.state.options.map(res=>{

             if(res.text.trim() == value.trim()){
                this.setState({DSCA:res.key})

             }
         })
    }


    btnupdate(){



        if(this.state.name==''){
            this.setState({   msg:'Please Enter name' ,
            showFail:true})
            return
        }


        if(this.state.shname==''){
            this.setState({   msg:'Please Enter Short Name' ,
            showFail:true})
            return
        }
        if(this.state.DSCAType=='-1'){
            this.setState({   msg:'Please Select DSCA Type' ,
            showFail:true})
            return
        }
      
        var  data={"index":"dcr_update_distance_calloption","Data":{
         "n_srno":this.state.n_srno  , "c_name":this.state.name,"n_type": (this.state.code).toString(),"n_product":this.state.Product,"c_dsca_type":this.state.DSCA,"n_active":this.state.status,"c_sort_name":this.state.shname
         }}
        
        
        
         postToServer("DCRAPI",data).then( (Result)=>{
                this.setState({   msg:'Updated Sucessfully ',
                show:true,
                UPDATEON:false,
                success:true,
                name:'',shname:'',  DSCA:'-1',DSCAType:'-1'
            })
            this.props.loadfun();
            this.btnclear();   
            })
               

    }

    btnsave(){


        if(this.state.name==''){
            this.setState({   msg:'Please Enter name' ,
            showFail:true})
            return
        }


        if(this.state.shname==''){
            this.setState({   msg:'Please Enter Short Name' ,
            showFail:true})
            return
        }
        if(this.state.DSCAType=='-1'){
            this.setState({   msg:'Please Select DSCA Type' ,
            showFail:true})
            return
        }
        // if(this.state.DSCA==''){
        //     this.setState({   msg:'Please Select DSCA Type' ,
        //     show:true})
        //     return
        // }
       
        var data={"index":"dcr_save_distance_calloption","Data":{
            "c_name":this.state.name,"n_type": (this.state.code).toString(),"n_product":this.state.Product,"c_dsca_type":this.state.DSCA,"n_active":this.state.status,"c_sort_name":this.state.shname
         }}
        
        
        
         postToServer("DCRAPI",data).then( (Result)=>{
            if(Result.data["Data"][0]["status"]==0){
                this.setState({ 
                name:'',shname:'',p:false,s:true, DSCA:'-1',DSCAType:'-1',
                msg:'Saved sucessfully',
                show:true,
                //code:this.state.code+1,
                success:true})
                this.props.loadfun();

            }else{

                const res=Result.data["Data"][0]["Result"]
                this.setState({ 
                    name:'',shname:'', DSCA:'-1',DSCAType:'-1',p:false,s:true,    
                    msg:res,
                    show:true,
                   // code:this.state.code+1,
                    success:false})
            }
            })
               




    }


  

btnclear(){

    this.setState({ UPDATEON:false,name:'',shname:'', DSCA:'-1',DSCAType:'-1',p:false,s:true })
    const _this=this

var data = { "index": "Viewtbl_dcr_distance_calloption", "Data": { "doc": "" } }
postToServer("DCRAPI", data).then((Result) => {
    let body = []
    let maxcode = '0'

    if(Result.data["max"]){

        if(Result.data["max"][0]){
            if(Result.data["max"][0]["max"]){

                if(Result.data["max"][0]["max"]==''){
                    maxcode='0'
                    _this.setState({ code: maxcode })
                }else{
                    maxcode=Result.data["max"][0]["max"]
                    _this.setState({ code: maxcode })
                    
                }
            }
           
        }

    }
 
})



}

    Product(status){

        

        if(status.target.checked  ==true){ 
            this.setState({Product :"1",p:true }) 
        }
else{


        this.setState({Product :"0",p:false }) 
}

    }

    Status(status){
        if(status.target.checked== true){ 
            this.setState({status :"0" ,s:true }) 
        }
else{

        this.setState({status :"1",s:false }) 
}
    }
componentDidUpdate(oldprops,oldstate){
  


    if(this.props.editdata!= oldprops.editdata  &&  Object.keys(this.props.editdata).length  != 0  ){  
        this.state.options.map(res=>{    
            if(res.key.trim() == this.props.editdata['dsca'].trim()){
               this.setState({DSCA:res.key,DSCAType:this.props.editdata.c_dsca_type})
    
            }
        })
        this.setState({ n_srno:this.props.editdata["n_srno"] , UPDATEON:true,   s: this.props.editdata["n_active"]=="1"? false :true,   p: this.props.editdata["n_product"]=="1"? true :false, code:  this.props.editdata["n_srno"], shname: this.props.editdata["c_sort_name"] ,name: this.props.editdata["c_name"] })
    }

  if(oldprops.maxcode!=this.props.maxcode){

   
   
      this.setState({ code: this.props.maxcode })
  }


 


}
    componentDidMount(){

        if(this.props.maxcode=="0"){
        this.setState({ code:"1"})
        }else{
            this.setState({ code:this.props.maxcode })
        }


     
        var data={"index":"DSCA","Data":{"doc":""}}
        postToServer("DCRAPI",data).then( (Result)=>{
            let  options=[]

            Result.data["Data"].map((a,index)=>{
             
              //  options.push(  { key: index, text: a.c_name, value: a.n_type }, )
                options.push(  { key: a.n_type, text: a.c_name, value: a.c_name }, )


               
            })
            this.setState({options:options})

         }).catch((Error) => {
         })

    }
    
    render(){
        return(
                
                <div className="leftpad"> 

           <StatusPopup
                message={this.state.msg}
                show={this.state.show}
                onClose={this.hide}
                success={this.state.success}
            />
             <StatusFailPopup
                message={this.state.msg}
                show={this.state.showFail}
                onClose={this.hide}
                success={this.state.success}
            />
                    <Row>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label  className="customized-label chemistlabel">Code</Form.Label>
                            <Form.Control  readOnly value={this.state.code} disabled type="text" className="customized-input" placeholder="Enter Code" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                        <Form.Label className="customized-label chemistlabel">Name<span className="colorRed">*</span></Form.Label>
                            <Form.Control onChange={this.namefun} value={this.state.name}  maxLength="200" type="text" className="customized-input placholder-text" placeholder="Enter Name" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            <Form.Label className="customized-label chemistlabel">Short Name<span className="colorRed">*</span></Form.Label>
                            <Form.Control  onChange={this.shnamefun} value={this.state.shname}  maxLength="200" type="text" className="customized-input placholder-text" placeholder="Enter Short Name" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                            {/* <Form.Label className="customized-label chemistlabel">DSCA Type<span className="colorRed">*</span></Form.Label> */}

                           {/* <Dropdown value={this.state.DSCA}   onChange={this.dscatype} placeholder='Select DSCA Type' className="customized-input" fluid selection options={ this.state.options} /> */}
                            {/* <div className="user-heirarchy-field-containers campaign-dd"> */}
                          <SearchDropdown
                            className="designation"
                            labelName="DSCA Type"
                            important={true}
                            placeholder="Enter/Select DSCA Type"
                            Selected={this.state.DSCAType}
                            dropdownList={this.state.options}
                            getValue={this.dscatype}
                          />
                        
                       
                        </Col>
                                             
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad toggleSwitch">
                            <Form.Label className="customized-label">Status</Form.Label>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12} className="paddTop5 statusLabel">
                                    <label className="switch">
                                        <input   checked={ this.state.s} onClick={ this.Status} type="checkbox" id="togBtn" />
                                            <div className="slider round">
                                                <span   className="on">Active</span>
                                                <span   className="off">Inactive</span>
                                            </div>
                                    </label>
                                </Col>

                            </Row>
                        </Col>


                        
                        <Col lg={3} md={3} sm={6} xs={12} className="colPad toggleSwitchsm toggleFlex">
                             
                            <div>      
                               <Form.Label className="customized-label chemistlabel toggleY">Product Detailing</Form.Label>
                                    <div>
                                        <label className="switchY toggleY">
                                            <input  checked={ this.state.p} onClick= { this.Product }  type="checkbox"  />
                                                <div className="sliderY round">
                                                    <span   className="onY">Yes</span>
                                                    <span   className="offY">No</span>
                                                </div>
                                        </label>
                                    </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="marginTop21">
                        <Col lg={6} md={6} sm={6} xs={12} className="colPad">
                         {this.state.UPDATEON==false ?   <button onClick={this.btnsave} className="primaryBtnPad  mb-2 ">Save</button>
                         : <button onClick={this.btnupdate} className="primaryBtnPad  mb-2 ">Update</button>}
                            <button  onClick={this.btnclear } className="danger danger-outline mr-2 mb-2 padleft">Cancel</button>
                        </Col>
                        <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                        <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                       
                    </Row>
                    {this.props.showLoad == true ?
                            <DashLoader></DashLoader> : null} 
                </div>
                
                );
    }
}
export default AddCalltype

