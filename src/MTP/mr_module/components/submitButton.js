import React, {Component} from "react";
import SuccessMsg from "./successMsg";
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
import Spinner from '../../../BasicComponet/sfaSpinner'
class SubmitButton extends Component {
    constructor(props){
        super(props)
        this.state={
            successMsg: false,msg:'',showStatusModal:false,success:false,smsg:'', loderon:false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onShowPopup = this.onShowPopup.bind(this)
        this.hideStatusModal=this.hideStatusModal.bind(this)
    }

      hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }
    onSubmit(){

        this.setState({loderon:true})
        var data = {
            "Data": {
                "Month": this.props.Month.toString(),
                "Year": this.props.Year.toString(),
               
            },
            "index": "MTP_Send_submit"
            
        }
        postToServer("MTP",data).then( (Result)=>{ 
         
          
            //console.log()

            this.setState({loderon:false})
            const j=Result.data[0]["Result"]
             const s=Result.data[0]["status"]
            

             if(s=="1"){
               
            this.setState({
                successMsg: !this.state.successMsg,msg:j
            })

            setTimeout(() => this.props.propsmethod(this.props.Month.toString(),this.props.Year.toString()), 700);
             }
             if(s=="0"){

 this.setState({
                smsg: j,showStatusModal:true
            })


             }
    
          
               
          //  }
        }).catch(  (Error)=> {  

            // console.log(Error,'okokokoko')
            this.setState({loderon:false})
            this.setState({ Error: true, smsg: "Error in  API " })
        })
        
    
   

       

       // this.props.submitPlan('A')
    }
    onShowPopup(){
        this.setState({
            successMsg: !this.state.successMsg
        })
    }
    render(){
        return(
            <div>
                {this.state.successMsg == true &&<SuccessMsg   tital={this.state.smsg}  msg={this.state.msg} Year={this.props.Year}
                               Month={ this.props.Month}
                                success={this.onShowPopup}/>}
                <div onClick={this.onSubmit}><div className="submitBtn">SUBMIT PLAN</div></div>
                 <StatusPopup
                  message={this.state.smsg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
                {this.state.loderon== true ?     <Spinner></Spinner> :null}
            </div>
        )
    }
}
export default SubmitButton;