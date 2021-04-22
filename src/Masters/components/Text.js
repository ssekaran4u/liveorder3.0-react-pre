import React, {Component} from 'react'
import {Form} from 'react-bootstrap'
import { connect } from 'react-redux';
import { postToServer } from '../../lib/comm-utils'
class Text extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textval:'',
            isload:false,
            //isloadnew:addkey,
           error:'',
           Editkey:'',
           SelectedVal:''
           
        };
       
        if (this.props.mandatory=="1" || this.props.mandatory=="true"){
            this.state.isload=true  
        }else {
            this.state.isload=false  
        }
        this.ontextchange= this.ontextchange.bind(this)   
        this.updatestate=this.updatestate.bind(this)  
}
    ontextchange(event) {

        if (event.target.value != "") {
            if (this.props.RegularExpression != '' |this.props.RegularExpression != null) {

                var expres = this.props.RegularExpression

                var regex = RegExp(expres);
                //alert(regex)
                if (!regex.test(event.target.value)) {

                    if (regex == "/^\d{10}$/") {

                        this.setState({ error: 'Mobile number must be 10 digits.' })

                    }
                    else if(regex == "/null/")
                    {
                        this.setState({ error: '' })
                    }
                    else {
                        this.setState({ error: 'Not a valid input' })
                    }

                } else {

                    this.setState({ error: '' })
                }
            }
        }
        else {
            this.setState({ error: '' })
        }

        this.setState({ textval: event.target.value })
        if (this.props.RegularExpression != "") {
            let express = new RegExp(this.props.RegularExpression);
            if (express.exec(event.target.value) != null) {
                this.setState({ textval: event.target.value })
                this.props.Onclientchange(event, this.props.displayname)
                //console.log(express.exec(event.target.value))
            } else {

            }
        } else {
            this.props.Onclientchange(event, this.props.displayname)
        }
    }

static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("cccccccccc",nextProps.header, nextProps.Edit)
    //  if(prevState.header !== nextProps.header)
    //      return {...prevState, header:nextProps.header}
     if(prevState.Edit !== nextProps.Edit){
         return {...prevState, Edit:nextProps.Edit}
     }
     return null
 }


 updatestate(){
    this.setState({textval:''})
    this.setState({Dropdownval:'2'})
 }


 updatestatenew(){
    this.setState({Editkey:'1'}) 
    this.setState({textval:''}) 
 }

 componentDidUpdate(oldprops,oldsate){
    const _this=this
    if(oldprops.Clear!=_this.props.Clear){

       if( _this.props.P_key=="true"){
        _this.props.setprimarykey( _this.props.name);
        //Max Code
        var data = { "index": "MaxCode", "TableName": _this.props.urlid, "Query": "", "Token": "", "ColumnName": "0", "Key_ID": "0" }
        postToServer("SfaApi", data).then(function (result) {
            _this.setState({textval:result.data["MaxCode"] })
            _this.props.setmax(result.data["MaxCode"])          
             }).catch((Error) => {
                _this.setState({
                    show: true, meg: 'Error In App  Control load'
                })
            })
    }

        if( this.props.P_key=="false"){        
            this.updatestate()
        }
    }
    
    if(oldprops.Clearnew!=this.props.Clearnew){
      
         if(this.props.P_key=="false"){
             this.updatestatenew()
         }
     }
    
 }


 componentDidMount(){
    const _this=this
    if( _this.props.P_key=="true"){

        _this.props.setprimarykey( _this.props.name);

        //MaxCode

        var data = { "index": "MaxCode", "TableName": this.props.urlid, "Query": "", "Token": "", "ColumnName": "0", "Key_ID": "0" }
        postToServer("SfaApi", data).then(function (result) {


                // _this.setState({textval:result.data["MaxCode"] })
                // _this.props.setmax(result.data["MaxCode"])
               // alert(result.data["MaxCode"])
               if( _this.props.ReadOnly=="true"){
                _this.setState({textval:result.data["MaxCode"] })
                _this.props.setmax(result.data["MaxCode"])
            }
             }).catch((Error) => {
                this.setState({
                    show: true, meg: 'Error In App  Control load'
                })

            })

      //  alert(this.props.name)
    }
    //  /alert('i came here')
 }


    render(){

        const{Edit}=this.state
        //const{addkey}=this.state
        
        if(Edit==null)
        {
            
            
                return(
                    <div>
              {/* <Form.Group controlId="formBasicEmail" className="login-form-group">  <Form.Label className="login-label">{this.props.name} </Form.Label>
                  <Form.Control  className="login-form-control"  />   </Form.Group> */}
                    <Form.Group controlId="formBasicEmail">
                    { this.state.isload ? 
                    <Form.Label className="customized-label chemistlabel">{this.props.displayname}  {this.props.ReadOnly == "true" ? "true":"false"}  <span className="colorRed">*</span></Form.Label> :
                    <Form.Label className="customized-label chemistlabel">{this.props.displayname} { this.props.Mandatory=="true"? <span className="colorRed"> *</span> :'' }  </Form.Label>}
                    
                
                    {this.props.ReadOnly=="true" ?
                    <Form.Control type="text" onChange={this.ontextchange} value={this.state.textval}  defaultValue={this.state.textval ||  Edit ?  Edit!=null ? Edit[[this.props.displayname]] :this.state.textval || this.state.textval : this.state.textval }  readonly="true" className="customized-input" placeholder={this.props.displayname} />
                   :<Form.Control type="text" onChange={this.ontextchange} value={this.state.textval} defaultValue={ this.state.textval ||  Edit   ? Edit!=null? Edit[[this.props.displayname]] :this.state.textval  || this.state.textval : this.state.textval } className="customized-input" placeholder={this.props.displayname}  />}
               
                    </Form.Group>
                    <label className="error-msg red-clr m-0"> {this.state.error}</label>
                    </div>
                )
                    }
                    else{

                    if(this.state.Editkey!="1")
                    {

                        if(this.props.ReadOnly=="false" && this.props.P_key=="true"  )
                        {
                            return(
                                <div>
                          {/* <Form.Group controlId="formBasicEmail" className="login-form-group">  <Form.Label className="login-label">{this.props.name} </Form.Label>
                              <Form.Control  className="login-form-control"  />   </Form.Group> */}
                                <Form.Group controlId="formBasicEmail">
                                { this.state.isload ? 
                                <Form.Label className="customized-label chemistlabel">{this.props.displayname}  {this.props.ReadOnly == "true" ? "true":"false"}  <span className="colorRed">*</span></Form.Label> :
                                <Form.Label className="customized-label chemistlabel">{this.props.displayname} { this.props.Mandatory=="true"? <span className="colorRed"> *</span> :'' }  </Form.Label>}
                                
                            
                                {this.props.ReadOnly=="false" ?
                                <Form.Control type="text" onChange={this.ontextchange}  defaultValue={this.state.textval ||  Edit ?  Edit!=null ? Edit[[this.props.displayname]] :this.state.textval || this.state.textval : this.state.textval }   readonly="true" className="customized-input" placeholder={this.props.displayname} />
                               :<Form.Control type="text" onChange={this.ontextchange}  defaultValue={ this.state.textval ||  Edit   ? Edit!=null? Edit[[this.props.displayname]] :this.state.textval  || this.state.textval : this.state.textval }  className="customized-input" placeholder={this.props.displayname}  />}
                           
                                </Form.Group>
                                <label className="error-msg red-clr m-0"> {this.state.error}</label>
                                </div>
                            )
                        }
                        else{
                        return(
                            <div>
                      {/* <Form.Group controlId="formBasicEmail" className="login-form-group">  <Form.Label className="login-label">{this.props.name} </Form.Label>
                          <Form.Control  className="login-form-control"  />   </Form.Group> */}
                            <Form.Group controlId="formBasicEmail">
                            { this.state.isload ? 
                            <Form.Label className="customized-label chemistlabel">{this.props.displayname}  {this.props.ReadOnly == "true" ? "true":"false"}  <span className="colorRed">*</span></Form.Label> :
                            <Form.Label className="customized-label chemistlabel">{this.props.displayname} { this.props.Mandatory=="true"? <span className="colorRed"> *</span> :'' }  </Form.Label>}
                            
                        
                            {this.props.ReadOnly=="true" ?
                            <Form.Control type="text" onChange={this.ontextchange}  defaultValue={this.state.textval ||  Edit ?  Edit!=null ? Edit[[this.props.displayname]] :this.state.textval || this.state.textval : this.state.textval }   readonly="true" className="customized-input" placeholder={this.props.displayname} />
                           :<Form.Control type="text" onChange={this.ontextchange}  defaultValue={ this.state.textval ||  Edit   ? Edit!=null? Edit[[this.props.displayname]] :this.state.textval  || this.state.textval : this.state.textval } className="customized-input" placeholder={this.props.displayname}  />}
                       
                            </Form.Group>
                            <label className="error-msg red-clr m-0"> {this.state.error}</label>
                            </div>
                        )
                    }
                            }
                            else{

                                return(
                                    <div>
                              {/* <Form.Group controlId="formBasicEmail" className="login-form-group">  <Form.Label className="login-label">{this.props.name} </Form.Label>
                                  <Form.Control  className="login-form-control"  />   </Form.Group> */}
                                    <Form.Group controlId="formBasicEmail">
                                    { this.state.isload ? 
                                    <Form.Label className="customized-label chemistlabel">{this.props.displayname}  {this.props.ReadOnly == "true" ? "true":"false"}  <span className="colorRed">*</span></Form.Label> :
                                    <Form.Label className="customized-label chemistlabel">{this.props.displayname} { this.props.Mandatory=="true"? <span className="colorRed"> *</span> :'' }  </Form.Label>}
                                    
                                
                                    {this.props.ReadOnly=="true" ?
                                    <Form.Control type="text" onChange={this.ontextchange} value={this.state.textval}  defaultValue={this.state.textval ||  Edit ?  Edit!=null ? Edit[[this.props.displayname]] :this.state.textval || this.state.textval : this.state.textval }  readonly="true" className="customized-input" placeholder={this.props.displayname} />
                                   :<Form.Control type="text" onChange={this.ontextchange} value={this.state.textval} defaultValue={ this.state.textval ||  Edit   ? Edit!=null? Edit[[this.props.displayname]] :this.state.textval  || this.state.textval : this.state.textval } className="customized-input" placeholder={this.props.displayname}  />}
                               
                                    </Form.Group>
                                    <label className="error-msg red-clr m-0"> {this.state.error}</label>
                                    </div>
                                )
                            }
                    }
            
    }
}


const mapStateToProps = state => ({
     // data: state.MASTERList.data,
    //  header: state.MASTERList.header,
        Edit: state.MASTERList.Edit,
    //  addkey:state.MASTERList.addkey
   // Dropdownval:state.MASTERList.Dropdownval
    

    
} )

const mapDispatchToProps = dispatch => ({
    getMASTERLEdit: (data) => dispatch(getMASTERLEdit(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Text);