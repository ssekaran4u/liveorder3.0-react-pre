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

class CampTopic extends Component{
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
        var data={
            "Token": "",
            "Index":"CampTopic"
        }
        postToServer("GroupActivity",data).then( (Result)=>{
        if(Result.data.Status == 'Success')
            this.setState({ data: Result.data.data })
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At Group Activity API " })
         }  )

         if(this.props.c_CTopic_Code){
            if(this.props.c_CTopic_Code!=''){
                const c_CTopic_Code=this.props.c_CTopic_Code
                this.setState({ defaultValue:c_CTopic_Code })
                
            }
        }
    }
    handleCampTopic(e,data){
        const compTopic = data.value
        const compTopictext  = data.value.text
        this.setState({defaultValue:compTopic})
        this.props.getCampTopic(compTopic)
    }
    
    render(){ 
        const { data } = this.state
        
        if(!data)
            return null
        let camptopicdata=[] 
        camptopicdata.push({
            "key"   :"-1",
            "text"  :'Please Select Comp Topic',
            "value" :"-1",
            
        })
        data.map(data => {
                camptopicdata.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
       
        return(
            <div className="singledropdown dcrStay">
                <Dropdown value={this.state.defaultValue}    onChange={this.handleCampTopic.bind(this)} placeholder='Select' className={this.state.defaultValue == -1 ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "} fluid selection options={camptopicdata} />           
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
export default  CampTopic

