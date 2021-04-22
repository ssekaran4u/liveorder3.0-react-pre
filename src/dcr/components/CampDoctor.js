/*
 * This code will display CampTopic component inside GroupActivity
 * Index=CampTopic
 * Request URL=url/GroupActivity
 * Request string={"Token":"","Index":"CampTopic"}
 * Response string={
   Code:C001
   NAME:CAMP TOPIC 1
 }
 * Response Error={}
*/

import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class CampDoctor extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            Errormsg: '',
            Error: false, 
            defaultValue:'-1'
        }
    }
    Errorclose() {
        this.setState({ Error: false })
    }

    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
        this.setState({defaultValue:'-1'})
       }

       if(this.props.c_CTopic_Code!= oldprops.c_CTopic_Code ){
        const c_CTopic_Code=this.props.c_CTopic_Code
        this.setState({ defaultValue:c_CTopic_Code })
      
    }
    }
    
    componentDidMount(){

        if(this.props.Editmodedata)
        {
       
            if( this.props.Editmodedata['DWR']){
               
                let m={}

                if(this.props.Editmodedata["Dwrdetails"]){
                    
                  this.props.Editmodedata['Dwrdetails'].map( (next)=>{ 

                   
                    const compDoc = next["C_DSC_Code"]
                    const compDoctext  = next["Dr_Name"]
                    this.setState({defaultValue:compDoc})
                   // this.props.getDocCode(compDoc)
                  } )
                }

            }
        }
        // var data={
        //     "Token": "",
        //     "Index":"CampTopic"
        // }
        // postToServer("GroupActivity",data).then( (Result)=>{
        // if(Result.data.Status == 'Success')
        //     this.setState({ data: Result.data.data })
        // }).catch(  (Error)=> {  
        //     this.setState({ Error: true, Errormsg: "Error in App At Group Activity API " })
        //  }  )

        //  if(this.props.c_CTopic_Code){
        //     if(this.props.c_CTopic_Code!=''){
        //         const c_CTopic_Code=this.props.c_CTopic_Code
        //         this.setState({ defaultValue:c_CTopic_Code })
                
        //     }
        // }
    }
    handleDoc(e,data){
        console.log(data)
        const compDoc = data.value
        const compDoctext  = data.value.text
        this.setState({defaultValue:compDoc})
        this.props.getDocCode(compDoc)
    }
    
    render(){ 
      //  const { palce } = this.props
        if(!this.props.docdata)
            return null
        let campDocdata=[] 
        campDocdata.push({
            "key"   :"-1",
            "text"  :'Please Select Doctor',
            "value" :"-1",
            
        })
        this.props.docdata.map(palce => {
            campDocdata.push({
                    "key"   :palce[Object.keys(palce)[0]],
                    "text"  :palce[Object.keys(palce)[1]],
                    "value" :palce[Object.keys(palce)[0]],
                    
                })
            })
       
        return(
            <div className="singledropdown dcrStay campdoc">
                <Dropdown value={this.state.defaultValue}    onChange={this.handleDoc.bind(this)} placeholder='Select' className={this.state.defaultValue == -1 ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "} search fluid selection options={campDocdata} />           
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.Error}
                    onClose={this.Errorclose}
                    success={false}
            />
            </div>
        )
    }
}
export default  CampDoctor

