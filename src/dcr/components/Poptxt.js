import React,{Component} from 'react'
 import {Breadcrumb,Row,Col,Form} from 'react-bootstrap'
 import StatusPopup from '../../lib/StatusPopup'
class Poptxt extends Component{
    constructor(props){
        super(props);
        this.state={
            chars_left:500,
            max_char:500,
            // maxlengthText:'500',
            
            value: '',    
            Errormsg:'',
            Error:false
        }
        this.handleWordCount = this.handleWordCount.bind(this)
        this.Errorclose=this.Errorclose.bind(this)


    }

     Errorclose() {
        this.setState({ Error: false })
    }
   
   handleWordCount(e){
       //console.log(event.target.value)

       if(this.props.notallowed==true){
        this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
        
        //message={this.state.Errormsg}
        //show={this.state.Error}
        // this.removeItem(name)
                return
               }
       const {value} = e.target
       if(sessionStorage.getItem("ActiveDCR")=="null"){
        sessionStorage.setItem("ActiveDCR",this.props.dsccode)
       }

    
    //   if(value.length < 10){
    //     alert(value.length)
    if(value.length==10){
    return
    }
    if(value.length==0){
        this.setState({value: ''})
        this.props.popEnter('')
    }
      if ( !isNaN(parseFloat(value)) && isFinite(value)  ) {
         this.setState({value: value})
         this.props.popEnter(value)
     // }
    }
   }

   componentDidUpdate(oldprops,oldsatate)
   {
      if(oldprops.clearAll!=this.props.clearAll)
      {
         this.setState({ value:'' })
      }
   }


   componentDidMount(){
    if(this.props.Editmodedata){
        if( this.props.Editmodedata['Dwrdetails']){
            let m={}
            Object.keys(this.props.Editmodedata['Dwrdetails']).map( (next)=>{
                
                if(this.props.dsccode.trim() == this.props.Editmodedata['Dwrdetails'][next]["C_DSC_Code"].trim() ){
                    
                    const val=this.props.Editmodedata['Dwrdetails'][next]["N_POB"].trim()
                    this.setState( {value:val})
                    this.props.popEnter(val)
                }
             
               
            })
            
          //  getData(id, name, checked,item){ 

            
        }
      
    }
}
    render(){
        return(
                <div className="pobTextbox">
                    <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            />
                    <Form.Label className="customized-label">POB</Form.Label>
                         {/* <span className="maxLength">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span>       */}
                    <Form.Control  rows="5" placeholder="Enter POB Amount" maxLength="500" onChange={this.handleWordCount} value={this.state.value}/>
                </div>
                );
    }
}
export default Poptxt;
