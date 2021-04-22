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


class AddCalloption extends Component{

    constructor(props){
        super(props)
   
        this.state={

            code:'0',
            name:'',
            Product:'',
            status:'',
            UPDATEON:false,
            shname:'',
            options:[],
            DSCA:"-1",
            DSCAType:"-1",
            msg:'',
            show:false,
            showFail:false,
            success:true,
            s:true


        }

        this.Product=this.Product.bind(this)
        this.Status=this.Status.bind(this)
        this.dscatype=this.dscatype.bind(this)
        this.btnsave=this.btnsave.bind(this)
        this.btnclear=this.btnclear.bind(this)
        this.namefun=this.namefun.bind(this)
        this.shnamefun=this.shnamefun.bind(this)
        this.hide=this.hide.bind(this)
        this.btlupdate=this.btlupdate.bind(this)
    }

    hide(){
        this.setState({  
        show:false,
        showFail:false   
        })
    }

    shnamefun(event){

     const  val=   event.target.value
     this.setState({shname:val})

    }

    namefun(event){
        const  val=   event.target.value
        this.setState({name:val})
    }
    dscatype(value){
        this.setState({DSCAType:value})

         this.state.options.map(res=>{

             if(res.text.trim() == value.trim()){
                this.setState({DSCA:res.key})

             }
         })
    }
//dcr_update_option




btlupdate(){
   
//         let mm= this.state.DSCA
//    let   ll= mm.split('%')


   
   if(this.state.name.trim()==''){
    this.setState({   msg:'Please Enter name' ,
    showFail:true})
    return
}


if(this.state.shname==''){
    this.setState({   msg:'Please Enter Short Name' ,
    showFail:true})
    return
}
// if(this.state.DSCA==''){
//     this.setState({   msg:'Please Select DSCA' ,
//     show:true})
//     return
// }
if(this.state.DSCAType=='-1'){
    this.setState({   msg:'Please Select DSCA Type' ,
    showFail:true})
    return
}


      var data={"index":"dcr_update_option","Data":{
         "n_srno":this.state.n_srno, "n_dis_type": this.state.DSCA,   "c_name":this.state.name,"n_active":this.state.status,"c_sort_name":this.state.shname
       }}
      postToServer("DCRAPI",data).then( (Result)=>{
              this.setState({   msg:'Updated Successfully',
              UPDATEON:false,name:'',shname:'',s:true, DSCA:'-1',DSCAType:'-1',
              show:true,
            //  code:this.state.code+1,
              success:true})
              this.props.loadfun();
          })
              
          this.btnclear()



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
        //     this.setState({   msg:'Please Select Digital Type' ,
        //     show:true})
        //     return
        // }
       

    //       let mm=
    //  let   ll= mm.split('%')


     


        var data={"index":"dcr_save_option","Data":{
            "n_dis_type": this.state.DSCA,   "c_name":this.state.name,"n_active":this.state.status,"c_sort_name":this.state.shname
         }}
        postToServer("DCRAPI",data).then( (Result)=>{

            if(Result.data["Data"][0]["status"]==0){
                this.setState({ 
                    UPDATEON:false,name:'',shname:'',s:true, DSCA:'-1',DSCAType:'-1',
                    msg:'Saved sucessfully',
                show:true,
                //code:this.state.code+1,
                success:true})
                this.props.loadfun();

            }else{

                const res=Result.data["Data"][0]["Result"]
                this.setState({ 
                    UPDATEON:false,name:'',shname:'', DSCA:'-1',DSCAType:'-1',s:true,
                    msg:res,
                    show:true,
                   // code:this.state.code+1,
                    success:false})
            }
                // this.setState({   msg:'Saved Successfully',
                // UPDATEON:false,name:'',shname:'', DSCA:'',s:true,
                // show:true,
                // //code:this.state.code+1,
                // success:true})
                this.props.loadfun();
            })
                




    }


  
    btnclear(){
        this.setState({ UPDATEON:false,name:'',shname:'', DSCA:'-1',DSCAType:'-1',s:true })




        var data = { "index": "Distnaceoptionview", "Data": { "doc": "" } }
        postToServer("DCRAPI", data).then((Result) => {
            let body = []
            let maxcode = '0'


            if(Result.data["max"]){

                if(Result.data["max"][0]){
                    if(Result.data["max"][0]["max"]){

                        if(Result.data["max"][0]["max"]==''){
                            maxcode='0'
                            this.setState({ code: maxcode })
                        }else{
                            maxcode=Result.data["max"][0]["max"]
                            this.setState({ code: maxcode })
                            
                        }
                    }
                   
                }

            }


        })
       // this.props.loadfun();
        }

    Product(status){

        

        if(status.target.checked  ==true){ 
            this.setState({Product :"1" }) 
        }
else{


        this.setState({Product :"0" }) 
}

    }

    Status(status){
        if(status.target.checked== true){ 
            this.setState({status :"0",s:true }) 
        }
else{


        this.setState({status :"1" ,s:false}) 
}
    }
componentDidUpdate(oldprops,oldstate){
  
  if(oldprops.maxcode!=this.props.maxcode){

   
      this.setState({ code:  parseInt(this.props.maxcode) })
  }

  if(this.props.editdata!= oldprops.editdata ){
    let kk=this.props.editdata["DCNRNO"]
    this.state.options.map(res=>{

        if(res.key.trim() == this.props.editdata["DCNRNO"].trim()){
           this.setState({DSCA:res.key,DSCAType:this.props.editdata.distance_type})

        }
    })
    this.setState({ n_srno:this.props.editdata["n_srno"] , UPDATEON:true,   s: this.props.editdata["n_active"]=="1"? false :true,  code:  this.props.editdata["n_srno"], shname: this.props.editdata["c_sort_name"] ,name: this.props.editdata["c_name"] })
}


}


    componentDidMount(){
        if(this.props.maxcode=="0"){
            this.setState({ code:"1"})
            }else{
                this.setState({ code:this.props.maxcode })
            }
        var data={"index":"Distnacetype","Data":{"doc":""}}
        postToServer("DCRAPI",data).then( (Result)=>{
            let  options=[]

            Result.data["Data"].map((a,index)=>{
             
               // options.push(  { key: index, text: a.c_name, value:  a.index }, )
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
                    <Form.Label disabled className="customized-label chemistlabel">Code</Form.Label>
                    <Form.Control   readOnly value={this.state.code}  disabled type="text" className="customized-input" placeholder="Enter Code" />
                </Col>
                <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                <Form.Label className="customized-label chemistlabel">Name<span className="colorRed">*</span></Form.Label>
                    <Form.Control type="text" onChange={this.namefun} value={this.state.name}  className="customized-input placholder-text" maxLength = "200" placeholder="Enter Name" />
                </Col>
                <Col lg={3} md={3} sm={6} xs={12} className="colPad">
                    <Form.Label className="customized-label chemistlabel">Short Name<span className="colorRed">*</span></Form.Label>
                    <Form.Control onChange={this.shnamefun} value={this.state.shname} type="text" className="customized-input placholder-text" maxLength = "200" placeholder="Enter Short Name" />
                </Col>
                <Col lg={3} md={3} sm={6} xs={12} className="colPad">

                <SearchDropdown
                            className="designation"
                            labelName="Digital Type"
                            important={true}
                            placeholder="Enter/Select Digital Type"
                            Selected={this.state.DSCAType}
                            dropdownList={this.state.options}
                            getValue={this.dscatype}
                          />
                    {/* <Form.Label className="customized-label chemistlabel">Digital Type<span className="colorRed">*</span></Form.Label>
                    <Dropdown value={this.state.DSCA}   onChange={this.dscatype} placeholder='Select Digital Type ' className="customized-input" fluid selection options={this.state.options} /> */}
                </Col>
                                     
                <Col lg={3} md={3} sm={6} xs={12} className="colPad toggleSwitch">
                    <Form.Label className="customized-label">Status</Form.Label>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className="paddTop5 statusLabel">
                            <label className="switch">
                                <input  checked={ this.state.s} onClick={ this.Status}  type="checkbox" id="togBtn" />
                                    <div className="slider round">
                                        <span className="on">Active</span>
                                        <span className="off">Inactive</span>
                                    </div>
                            </label>
                        </Col>

                    </Row>
                </Col>


                
               
            </Row>
            <Row className="marginTop21">
                <Col lg={6} md={6} sm={6} xs={12} className="colPad">
                 {this.state.UPDATEON ==false ?   <button   onClick={this.btnsave} className="primaryBtnPad  mb-2 ">Save</button>:
                 <button   onClick={this.btlupdate} className="primaryBtnPad  mb-2 ">Update</button>}
                    <button onClick={this.btnclear }className="danger danger-outline mr-2 mb-2 padleft">Cancel</button>
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
export default AddCalloption

