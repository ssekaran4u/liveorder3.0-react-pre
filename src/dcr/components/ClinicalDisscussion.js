/* 
* This code is used to write note with max of 500 characters in clinical discussion

*/



import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Form} from 'react-bootstrap'
import StatusPopup from '../../lib/StatusPopup'
class ClinicalDiscussion extends Component{
    constructor(props){
        super(props);
        this.state={
            chars_left:500,
            max_char:500,
            maxlengthText:'500',
            showRemaing:true,
            Note:'',
            Errormsg:'',
            Error:false
        }
        this.handleWordCount = this.handleWordCount.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
    }


    Errorclose() {
        this.setState({ Error: false })
    }
    
    handleWordCount(event){

        if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }
                   if(sessionStorage.getItem("ActiveDCR")=="null"){
                    sessionStorage.setItem("ActiveDCR",this.props.dsccode)
                   }
        
        const charCount = event.target.value.length;
        const maxChar = this.state.max_char;
        const charLength = maxChar - charCount;
        const data=event.target.value
        this.setState({
            showRemaing:false,
            maxlengthText:charLength,
            Note:data
        })

        this.props.Notechange(event.target.value)
    }


    componentDidMount() {
       
        if(this.props.Editmodedata)
        {
            if( this.props.Editmodedata['Dwrdetails']){
                let m={}
                Object.keys(this.props.Editmodedata['Dwrdetails']).map( (next)=>{   

                  // console.log(  'note', this.props.Editmodedata['Dwrdetails'][next]["C_Note"], this.props.Editmodedata['Dwrdetails'][next]["C_DSC_Code"],this.props.dsccode)
                    if(this.props.Editmodedata['Dwrdetails'][next]["C_DSC_Code"]==this.props.dsccode){ 
                      
                      const k=this.props.Editmodedata['Dwrdetails'][next]["C_Note"]
                      
                        this.setState({showRemaing:false,maxlengthText: 500 - k.length,  Note:k})
                        this.props.Notechange(k)
                   
                }
                })
                
                
//this.props.id + '$' + item.c_name + '$' + item.c_doc_code+index ;
//
          
        }
           
        }
    }
    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
          this.setState({ Note:'',maxlengthText:500 })
       }
    }
    render(){ 
        return(
                <div>
                       <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            />
                    {this.props.compName == "DOCTOR" ?
                        <Form.Label className="customized-label">In Clinical Discussion</Form.Label>
                    :
                        <Form.Label className="customized-label">Note</Form.Label> 
                    }
                        {this.state.showRemaing ?  
                        <span className="maxLength">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span> 
                        :
                        <span className="maxLength"> <span className="maxlenColor">{this.state.maxlengthText}</span> Character Remaining</span> 
                        }
                      {this.props.Mandatory["NoteMan"] =="1" ?   <span className="colorRed">*</span>:''}
                    <Form.Control  value={this.state.Note} as="textarea" rows="5" placeholder="Enter text Here" maxLength="500" onChange={this.handleWordCount}/>
                </div>
                );
    }
}
export default ClinicalDiscussion
